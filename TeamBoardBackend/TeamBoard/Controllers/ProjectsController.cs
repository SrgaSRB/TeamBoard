using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.User.MyProjectsDTO;

namespace TeamBoard.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }


        //returns projects of the logged user
        [HttpGet("my")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(userId);

            var myProjects = await _context.Projects
                .Include(p => p.Team)
                    .ThenInclude(t => t.UserTeams)
                        .ThenInclude(ut => ut.User)
                .Where(p => p.Tasks.Any(t => t.AssignedToUserId == parsedUserId))
                .Select(p => new MyProjectsDto
                {
                    ProjectName = p.Name,
                    ProjectDescription = p.Description,
                    CreatedAt = p.CreatedAt.ToString("yyyy-MM-dd"),
                    AllTasks = p.Tasks.Count(),
                    TeamName = p.Team.Name,
                    Members = p.Team.UserTeams
                        .Select(ut => ut.User.FullName)
                        .ToList(),
                    ToDoTasks = p.Tasks.Where(t => t.Status == "ToDo").Select(t => t.Description).ToList(),
                    InProgressTasks = p.Tasks.Where(t => t.Status == "InProgress").Select(t => t.Description).ToList(),
                    DoneTasks = p.Tasks.Where(t => t.Status == "Done").Select(t => t.Description).ToList(),
                })
                .ToListAsync();


            return Ok(myProjects);
        }

        #region AdminSettings



        #endregion


    }
}
