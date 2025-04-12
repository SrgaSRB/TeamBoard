using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.MyTeamsDTO;

namespace TeamBoard.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TeamsController : ControllerBase
    {

        public readonly AppDbContext _context;

        public TeamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("my")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(userId);

            var myTeams = await _context.UserTeams
                .Where(ut => ut.UserId == parsedUserId)
                .Select(ut => new MyTeamsDto
                {
                    TeamName = ut.Team.Name,
                    TeamDescription = ut.Team.Description,
                    MemberCount = ut.Team.UserTeams.Count(),
                    TotalProjectsInTeam = ut.Team.Projects.Count(p => p.Tasks.Any(t => t.AssignedToUserId == parsedUserId)),
                    ProjectsUserWorksOn = ut.Team.Projects
                        .Where(p => p.Tasks.Any(t => t.AssignedToUserId == parsedUserId))
                        .Select(p => p.Name)
                        .ToList(),
                    UserProjectCount = ut.Team.Projects.Count(),
                })
                .Where(t => t.ProjectsUserWorksOn.Any())
                .ToArrayAsync();

            return Ok(myTeams);
        }


    }
}
