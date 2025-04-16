namespace TeamBoard.DTOs.Admin.UsersDTO
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public List<string> Teams { get; set; }
        public List<string> Projects { get; set; }
        public List<string> Tasks { get; set; }

    }
}
