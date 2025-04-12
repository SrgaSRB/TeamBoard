using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace TeamBoard.DTOs.MyProjectsDTO
{
    public class MyProjectsDto
    {
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public string CreatedAt { get; set; }
        public int AllTasks { get; set; }
        public string TeamName { get; set; }
        public List<string> Members { get; set; }
        public List<string> ToDoTasks { get; set; }
        public List<string> InProgressTasks { get; set; }
        public List<string> DoneTasks { get; set; }

    }
}
