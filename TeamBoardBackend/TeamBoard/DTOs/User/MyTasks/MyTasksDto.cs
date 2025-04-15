namespace TeamBoard.DTOs.User.MyTasks
{
    public class MyTasksDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProjectName { get; set; }
        public string Priority { get; set; }
        public string Deadline { get; set; }
        public string Status { get; set; }

    }
}
