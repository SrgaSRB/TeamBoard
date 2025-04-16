namespace TeamBoard.DTOs.Admin.ProjectsDTO
{
    public class CreateProjectDto
    {
        public Guid TeamId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
