using TeamBoard.DTOs.Admin.UsersDTO;

namespace TeamBoard.DTOs.Admin.ProjectsDTO
{
    public class ProjectsList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public List<UsersList> Users { get; set; }
    }
}
