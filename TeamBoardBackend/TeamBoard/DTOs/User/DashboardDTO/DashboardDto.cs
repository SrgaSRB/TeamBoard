namespace TeamBoard.DTOs.User.DashboardDTO
{
    public class DashboardDto
    {
        public List<MyTeamDto> Teams { get; set; }
        public List<MyProjectDto> Projects { get; set; }
        public List<HighPriorityTaskDto> HighPriorityTasks { get; set; }
        public List<TaskStatusDto> TaskStatus { get; set; }

    }
}
