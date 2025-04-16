namespace TeamBoard.Models
{
    public class UserProject
    {
        public Guid UserId { get; set; }
        public Guid ProjectId { get; set; }
        public string Role { get; set; } = "Member"; // Member or Admin

        public User User { get; set; }
        public Project Project { get; set; }
    }
}
