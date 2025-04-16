namespace TeamBoard.DTOs.Admin.TasksDto
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProjectName { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime Deadline { get; set; }
        public string User {  get; set; }
        public string Username { get; set; }
    }
}
