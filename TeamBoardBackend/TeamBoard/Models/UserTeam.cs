namespace TeamBoard.Models
{
    public class UserTeam
    {
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
        public string Role {  get; set; } // Admin or Member

        public User User { get; set; }
        public Team Team { get; set; }

    }
}
