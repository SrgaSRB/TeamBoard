namespace TeamBoard.DTOs.Admin.TeamsDTO
{
    public class TeamDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MemberCount {  get; set; }
        public int ProjectCount { get; set; }

        public List<TeamUserDto> Users { get; set; }
        public List<TeamUserDto> OutsideUsers { get; set; }


    }
}
