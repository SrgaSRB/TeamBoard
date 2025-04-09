namespace TeamBoard.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CreatedByUserId { get; set; }
        public DateTime CreatedAt { get; set; }

        public User CreatedByUser { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
}
