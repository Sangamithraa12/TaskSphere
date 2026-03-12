using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskSphere.API.DTOs;
using TaskSphere.API.Services;

namespace TaskSphere.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;
        public TasksController(TaskService taskService) => _taskService = taskService;

        private int UserId
        {
            get
            {
                var idClaim = User.FindFirst("id");
                if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
                {
                    return -1;
                }
                return userId;
            }
        }

        [HttpGet(Name = "GetTasks")]
        public async Task<ActionResult<List<TaskDto>>> Get()
        {
            if (UserId == -1) return Unauthorized();
            return Ok(await _taskService.GetTasks(UserId));
        }

        [HttpGet("{id}", Name = "GetTask")]
        public async Task<ActionResult<TaskDto>> Get(int id)
        {
            if (UserId == -1) return Unauthorized();
            var t = await _taskService.GetTask(id, UserId);
            if (t == null) return NotFound();
            return Ok(t);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> Post([FromBody] TaskDto dto)
        {
            if (UserId == -1) return Unauthorized();
            var created = await _taskService.CreateTask(dto, UserId);
            return CreatedAtRoute("GetTask", new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TaskDto dto)
        {
            if (UserId == -1) return Unauthorized();
            var updated = await _taskService.UpdateTask(id, dto, UserId);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (UserId == -1) return Unauthorized();
            var deleted = await _taskService.DeleteTask(id, UserId);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}