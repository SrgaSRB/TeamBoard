namespace TeamBoard.Models
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid  TeamId { get; set; }
        public Guid CreatedByUserId { get; set; }
        public DateTime CreatedAt { get; set; }

        public Team Team { get; set; }
        public User CreatedByUser { get; set; }
        public ICollection<TaskEntity> Tasks { get; set; }
        public ICollection<UserProject> UserProjects { get; set; }

    }
}
