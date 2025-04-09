using System.Globalization;

namespace TeamBoard.Models
{
    public class TaskEntity // Task je zauzeta - System.Threading.Tasks.Task
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public Guid AssignedToUserId { get; set; }
        public string Status { get; set; } // ToDo, InProgress, Done
        public string Priority { get; set; } // Low, Medium, High
        public DateTime Deadline { get; set; }
        public DateTime CreatedAt { get; set; }

        public Project Project { get; set; }
        public User AssignedToUser { get; set; }

    }
}
