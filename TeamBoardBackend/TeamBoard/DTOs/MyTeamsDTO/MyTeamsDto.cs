namespace TeamBoard.DTOs.MyTeamsDTO
{
    public class MyTeamsDto
    {
        public string TeamName { get; set; }
        public string TeamDescription { get; set; }

        public int TotalProjectsInTeam { get; set; }
        public int MemberCount { get; set; }
        public int UserProjectCount { get; set; }
        public List<string> ProjectsUserWorksOn {  get; set; }

    }
}
