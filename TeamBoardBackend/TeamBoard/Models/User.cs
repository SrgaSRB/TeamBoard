using Microsoft.AspNetCore.Http.HttpResults;

namespace TeamBoard.Models
{
    public class User
    {

        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public bool IsGlobalAdmin { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<UserTeam> UserTeams { get; set; }
        public ICollection<TaskEntity> AssignedTasks { get; set; }
        public ICollection<Project> CreatedProjects { get; set; }
        public ICollection<Team> CreatedTeams { get; set; }
        public ICollection<Project> UserProjects { get; set; }

    }
}
