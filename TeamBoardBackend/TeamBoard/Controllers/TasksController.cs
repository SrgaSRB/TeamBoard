using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Globalization;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.Admin.TasksDto;
using TeamBoard.DTOs.User.MyTasks;
using TeamBoard.Models;

namespace TeamBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("my")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId == null)
            {
                return Unauthorized();
            }

            var parsedUserId = Guid.Parse(userId);

            var myTasks = _context.Tasks
                .Where(t => t.AssignedToUserId == parsedUserId)
                .Select(t => new MyTasksDto
                {
                    Name = t.Name,
                    Description = t.Description,
                    Deadline = t.Deadline.ToString("yyyy-MM-dd"),
                    Id = t.Id,
                    Priority = t.Priority,
                    ProjectName = t.Project.Name,
                    Status = t.Status
                });

            return Ok(myTasks);
        }

        [HttpPut("{taskId}/status")]
        public async Task<IActionResult> TaskStatusHandler(Guid taskId, [FromBody] string status)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            var updateTask = await _context.Tasks.FindAsync(taskId);

            if(updateTask == null)
            {
                return NotFound($"Task with TaskId:{taskId} Not Found");
            }

            updateTask.Status = status;

            _context.Tasks.Update(updateTask);
            await _context.SaveChangesAsync();

            return Ok();
        }

        #region Admin 

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {

            var tasks = await _context.Tasks
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    Deadline = t.Deadline,
                    Status = t.Status,
                    Priority = t.Priority,
                    ProjectName= t.Project.Name,
                    User = t.AssignedToUser.FullName,
                    Username = t.AssignedToUser.Username

                }).ToListAsync();

            return Ok(tasks);
        }

        [HttpPost("create-task")]
        public async Task<IActionResult> CrateNewTask([FromBody] CreateTaskDto dto)
        {

            var project = await _context.Projects.SingleOrDefaultAsync(p => p.Id == dto.ProjectId);

            if(project == null)
            {
                return NotFound();
            }

            var parsedUserId = Guid.Parse(dto.UserId);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == parsedUserId);

            if(user == null)
            {
                return NotFound();
            }

            var newTask = new TaskEntity
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                AssignedToUserId = parsedUserId,
                CreatedAt = DateTime.UtcNow,
                Deadline = DateTime.ParseExact(dto.Deadline, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal),
                Priority = dto.Priority,
                ProjectId = dto.ProjectId,
                Status = "ToDo"
            };

            _context.Tasks.Add(newTask);

            await _context.SaveChangesAsync();

            // Ručno učitavanje referenci jer nisu automatski dostupne
            await _context.Entry(newTask).Reference(t => t.Project).LoadAsync();
            await _context.Entry(newTask).Reference(t => t.AssignedToUser).LoadAsync();

            return Ok(
                new
                {
                    Id = newTask.Id,
                    Name = newTask.Name,
                    Description = newTask.Description,
                    Deadline = newTask.Deadline,
                    Status = newTask.Status,
                    Priority = newTask.Priority,
                    ProjectName = newTask.Project.Name,
                    User = newTask.AssignedToUser.FullName,
                    Username = newTask.AssignedToUser.Username
                });
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            var task = await _context.Tasks.SingleOrDefaultAsync(t => t.Id == taskId);

            if(task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();

            return Ok();

        }

        #endregion

    }
}
