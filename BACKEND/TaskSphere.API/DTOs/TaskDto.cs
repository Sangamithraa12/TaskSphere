namespace TaskSphere.API.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }           
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string Priority { get; set; } = null!;
        public DateTime? DueDate { get; set; }
    }
}