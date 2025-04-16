using Microsoft.AspNetCore.Mvc;

namespace TeamBoard.DTOs.Admin.ProjectsDTO
{
    public class ProjectsDto
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ToDoCount { get; set; }
        public int InProgressCount { get; set; }
        public int DoneCount { get; set; }

        public List<ProjectUserDto> Users { get; set; }
        public List<ProjectUserDto> OutsideUsers { get; set; }

    }
}
