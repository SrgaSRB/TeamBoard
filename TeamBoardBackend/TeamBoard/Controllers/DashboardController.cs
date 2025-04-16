using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.User.DashboardDTO;

namespace TeamBoard.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<DashboardDto>> GetDashboard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Frontend salje token 

            if(userId == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(userId); //u bazi mi je id tip Guid a userId je tip string 

            var myTeams = await _context.UserTeams
                .Where(t => t.UserId == parsedUserId)
                .Select(ut => new MyTeamDto
                {
                    TeamName = ut.Team.Name,
                    TeamDescription = ut.Team.Description,
                    Projects = ut.Team.Projects.Select(p => p.Name).ToList()
                }).ToListAsync();

            var myProjects = await _context.Projects
                .Where(p => p.Team.UserTeams.Any(ut => ut.UserId == parsedUserId))
                .Select(p => new MyProjectDto
                {
                    ProjectName = p.Name,
                    ProjectDescription = p.Description,
                    Tasks = p.Tasks.Select(t => t.Name).ToList()
                }).ToListAsync();

            var highPriorityTasks = await _context.Tasks
                .Where(t => t.Priority == "High" && t.AssignedToUserId == parsedUserId)
                .Select(t => new HighPriorityTaskDto
                {
                    TaskName = t.Name,
                    TaskDescription = t.Description,
                    Status = t.Status,
                }).ToListAsync();

            var taskStatus = await _context.Tasks
                .Where(t => t.AssignedToUserId == parsedUserId)
                .GroupBy(t => t.Status)
                .Select(g => new TaskStatusDto
                {
                    Status = g.Key,
                    Count = g.Count()
                }).ToListAsync();

            var dashboard = new DashboardDto
            {
                Teams = myTeams,
                Projects = myProjects,
                HighPriorityTasks = highPriorityTasks,
                TaskStatus = taskStatus
            };

            return Ok(dashboard);

        }

    }
}
