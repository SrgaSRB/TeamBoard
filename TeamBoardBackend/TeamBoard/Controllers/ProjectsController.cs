using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.Admin.UsersDTO;
using TeamBoard.DTOs.Admin.ProjectsDTO;
using TeamBoard.DTOs.User.MyProjectsDTO;
using TeamBoard.Models;

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

        [HttpGet("")]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _context.Projects
                .Include(p => p.Tasks)
                .Include(p => p.Team)
                    .ThenInclude(t => t.UserTeams)
                        .ThenInclude(ut => ut.User)
                .Include(p => p.UserProjects) 
                    .ThenInclude(up => up.User)
                .ToListAsync();

            var result = projects.Select(p =>
            {
                var assignedUsers = p.UserProjects
                    .Select(up => up.User)
                    .DistinctBy(u => u.Id)
                    .Select(u => new ProjectUserDto
                    {
                        Id = u.Id,
                        Name = u.FullName,
                        Email = u.Email,
                        Username = u.Username
                    }).ToList();

                var outsideUsers = p.Team.UserTeams
                    .Where(ut => assignedUsers.All(au => au.Id != ut.UserId))
                    .Select(ut => ut.User)
                    .Select(u => new ProjectUserDto
                    {
                        Id = u.Id,
                        Name = u.FullName,
                        Email = u.Email,
                        Username = u.Username
                    }).ToList();

                return new ProjectsDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    CreatedAt = p.CreatedAt,
                    ToDoCount = p.Tasks.Count(t => t.Status == "ToDo"),
                    InProgressCount = p.Tasks.Count(t => t.Status == "InProgress"),
                    DoneCount = p.Tasks.Count(t => t.Status == "Done"),
                    Users = assignedUsers,
                    OutsideUsers = outsideUsers
                };
            }).ToList();

            return Ok(result);
        }

        [HttpDelete("{projectId}/remove-user/{userId}")]
        public async Task<IActionResult> RemoveUserFromProject(Guid projectId, Guid userId)
        {

            var userExist = await _context.Users.FindAsync(userId);

            if (userExist == null)
            {
                return NotFound("User not found");
            }

            var projectExist = await _context.Projects.FindAsync(projectId);

            if (projectExist == null)
            {
                return NotFound("Project not found");
            }

            var userProject = await _context.UserProjects
                .FirstOrDefaultAsync(up => up.ProjectId == projectId && up.UserId == userId);

            if (userProject == null)
            {
                return NotFound("Relation between User and Project not found");
            }

            _context.UserProjects.Remove(userProject);

            var userTasks = await _context.Tasks
                .Where(t => t.AssignedToUserId == userId && t.ProjectId == projectId)
                .ToListAsync();

            _context.Tasks.RemoveRange(userTasks);

            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpPost("{projectId}/add-user/{userId}")]
        public async Task<IActionResult> AddUserToProject(Guid projectId, Guid userId)
        {
            var userExist = await _context.Users.FindAsync(userId);

            if (userExist == null)
            {
                return NotFound("User not found");
            }

            var projectExist = await _context.Projects.FindAsync(projectId);

            if (projectExist == null)
            {
                return NotFound("Project not found");
            }

            var alreadyExists = await _context.UserProjects
                .AnyAsync(up => up.UserId == userId && up.ProjectId == projectId);

            if (alreadyExists)
            {
                return Conflict("User is already part of the project.");
            }

            var newUserProject = new UserProject
            {
                UserId = userId,
                ProjectId = projectId,
            };

            _context.UserProjects.Add(newUserProject);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateNewProject([FromBody] CreateProjectDto dto)
        {
            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (user == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(user);


            var newProject = new Project
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                CreatedByUserId = parsedUserId,
                TeamId = dto.TeamId,
                CreatedAt = DateTime.UtcNow,
            };

            _context.Projects.Add(newProject);

            await _context.SaveChangesAsync();


            return Ok(new
            {
                id = newProject.Id,
                name = newProject.Name,
                description = newProject.Description,
                createdAt = newProject.CreatedAt,
                toDoCount = 0,
                inProgressCount = 0,
                doneCount = 0,
                users = new List<object>(),        
                outsideUsers = new List<object>(), 
            });
        }

        [HttpDelete("{projectId}")]
        public async Task<IActionResult> RemoveProject(Guid projectId)
        {
            var projectExist = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId);

            if (projectExist == null)
                return NotFound();

            var tasks = await _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();
            _context.Tasks.RemoveRange(tasks);

            var userProjects = await _context.UserProjects
                .Where(up => up.ProjectId == projectId)
                .ToListAsync();
            _context.UserProjects.RemoveRange(userProjects);

            _context.Projects.Remove(projectExist);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{projectId}")]
        public async Task<IActionResult> ChangeProject(Guid projectId, [FromBody] ChangeProjectDto dto)
        {

            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id ==  projectId);

            Console.WriteLine(projectId);

            if(project == null) return NotFound();

            project.Name = dto.Name;
            project.Description = dto.Description;

            _context.Projects.Update(project);

            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("list")]
        public async Task<IActionResult> ProjectsListForCreateTask()
        {
            var projects = await _context.Projects
                .Select(p => new ProjectsList
                {
                    Id = p.Id,
                    Name = p.Name,
                    Users = p.UserProjects.Select(up => new UsersList
                    {
                        Name = up.User.FullName,
                        Id = up.User.Id,
                        Username = up.User.Username
                    }).ToList()
                }).ToListAsync();

            return Ok(projects);

        }



        #endregion


    }
}
