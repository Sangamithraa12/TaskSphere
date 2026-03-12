using Microsoft.EntityFrameworkCore;
using TaskSphere.API.DTOs;
using TaskSphere.API.Data;
using TaskSphere.API.Models;

namespace TaskSphere.API.Services
{
    public class TaskService
    {
        private readonly ApplicationDbContext _db;

        public TaskService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<TaskDto>> GetTasks(int userId)
        {
            return await _db.Tasks
                .Where(t => t.UserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate
                })
                .ToListAsync();
        }

        public async Task<TaskDto?> GetTask(int id, int userId)
        {
            return await _db.Tasks
                .Where(t => t.Id == id && t.UserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TaskDto> CreateTask(TaskDto dto, int userId)
        {
            var entity = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Status = dto.Status,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                UserId = userId
            };
            _db.Tasks.Add(entity);
            await _db.SaveChangesAsync();
            dto.Id = entity.Id;
            return dto;
        }

        public async Task<bool> UpdateTask(int id, TaskDto dto, int userId)
        {
            var entity = await _db.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (entity == null) return false;

            entity.Title = dto.Title;
            entity.Description = dto.Description;
            entity.Status = dto.Status;
            entity.Priority = dto.Priority;
            entity.DueDate = dto.DueDate;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTask(int id, int userId)
        {
            var entity = await _db.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (entity == null) return false;

            _db.Tasks.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}