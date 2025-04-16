namespace TeamBoard.DTOs.Admin.TasksDto
{
    public class CreateTaskDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }
        public string UserId { get; set; }
        public string Priority { get; set; }
        public string Deadline { get; set; }
    }
}
