namespace TaskSphere.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
        public List<TaskItem> Tasks { get; set; } = new();
    }
}