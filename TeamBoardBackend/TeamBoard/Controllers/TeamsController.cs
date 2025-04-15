using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.Admin.TeamsDTO;
using TeamBoard.DTOs.User.MyTeamsDTO;
using TeamBoard.Models;

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


        //return teams of logged user
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

        #region Admin

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var allUsers = await _context.Users.ToListAsync();

            //Ovo sam morao uraditi jer inace LINQ ne moze da poredi liste van sql-a sa podacima iz SQL-a 
            //tako da sam poredjenje/upite radio u obicnom C# kodu
            var teamsData = await _context.Teams
                .Include(t => t.UserTeams).ThenInclude(ut => ut.User)
                .Include(t => t.Projects)
                .ToListAsync();

            var teams = teamsData.Select(t => new TeamDto
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                MemberCount = t.UserTeams.Count,
                ProjectCount = t.Projects.Count,
                Users = t.UserTeams.Select(ut => new TeamUserDto
                {
                    Id = ut.User.Id,
                    Name = ut.User.FullName,
                    Email = ut.User.Email,
                    Username = ut.User.Username
                }).ToList(),
                OutsideUsers = allUsers
                    .Where(u => !t.UserTeams.Any(ut => ut.UserId == u.Id))
                    .Select(u => new TeamUserDto
                    {
                        Id = u.Id,
                        Name = u.FullName,
                        Email = u.Email,
                        Username = u.Username
                    }).ToList()
            }).ToList();

            return Ok(teams);
        }

        [HttpDelete("{teamId}/remove-user/{userId}")]
        public async Task<IActionResult> RemoveUserFromTeam(Guid teamId, Guid userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            var teamExists = await _context.Teams.AnyAsync(t => t.Id == teamId);
            if (!teamExists)
            {
                return NotFound("Team not found");
            }

            var userTeam = await _context.UserTeams
                .FirstOrDefaultAsync(ut => ut.UserId == userId && ut.TeamId == teamId);

            if (userTeam == null)
            {
                return NotFound("User is not a member of the team");
            }

            _context.UserTeams.Remove(userTeam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{teamId}/add-user/{userId}")]
        public async Task<IActionResult> AddUserInTeam(Guid teamId, Guid userId)
        {


            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return NotFound("User not found");
            }

            var teamExists = await _context.Teams.AnyAsync(t => t.Id == teamId);
            if (!teamExists)
            {
                return NotFound("Team not found");
            }

            var alreadyInTeam = await _context.UserTeams
                .AnyAsync(ut => ut.UserId == userId && ut.TeamId == teamId);

            if (alreadyInTeam)
            {
                return Conflict("User is already in the team.");
            }

            _context.UserTeams.Add(new UserTeam
            {
                Role = "Member",
                UserId = userId,
                TeamId = teamId
            });

            await _context.SaveChangesAsync();

            return Ok("User added to the team.");

        }

        [HttpPost("create-team")]
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDto dto)
        {

            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (user == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(user);

            var newTeam = new Team
            {
                Name = dto.Name,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = parsedUserId,
                Id = Guid.NewGuid()
            };

            _context.Teams.Add(newTeam);

            await _context.SaveChangesAsync();

            var outsideUsers = await _context.Users
                .Select(u => new TeamUserDto
                {
                    Id = u.Id,
                    Name = u.FullName,
                    Username = u.Username,
                    Email = u.Email
                }).ToListAsync();

            return Ok(new
            {
                id = newTeam.Id,
                name = newTeam.Name,
                description = newTeam.Description,
                memberCount = 0,
                projectCount = 0,
                users = new List<object>(),
                outsideUsers = outsideUsers
            });
        }

        [HttpDelete("{teamId}/delete-team")]
        public async Task<IActionResult> DeleteTeam(Guid teamId)
        {

            var team = await _context.Teams.
                FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                return NotFound("Team not found");
            }

            var userTeams = await _context.UserTeams
                .Where(ut => ut.TeamId == teamId)
                .ToListAsync();

            _context.UserTeams.RemoveRange(userTeams);


            _context.Teams.Remove(team);

            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpPut("{teamId}")]
        public async Task<IActionResult> SaveChanges([FromBody] CreateTeamDto dto, Guid teamId)
        {

            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == teamId);

            if(team == null)
            {
                return NotFound("Team not found");
            }

            team.Name = dto.Name;
            team.Description = dto.Description;

            _context.Teams.Update(team);

            await _context.SaveChangesAsync();

            return Ok();

        }

        #endregion

    }
}
