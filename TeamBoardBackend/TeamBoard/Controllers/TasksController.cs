using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TeamBoard.Data;
using TeamBoard.DTOs.MyTasks;

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
        public async Task<IActionResult> get()
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


    }
}
