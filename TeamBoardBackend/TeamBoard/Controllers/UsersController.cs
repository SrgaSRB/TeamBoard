using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamBoard.Data;
using TeamBoard.DTOs.Admin.UsersDTO;
using TeamBoard.Models;

namespace TeamBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {

        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUsers()
        {

            var users = await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    FullName = u.FullName,
                    Email = u.Email,
                    Password = u.Password,
                    Teams = u.UserTeams.Select(ut => ut.Team.Name).ToList(),
                    Projects = u.UserProjects.Select(up => up.Project.Name).ToList(),
                    Tasks = u.AssignedTasks.Select(at => at.Name).ToList()
                }).ToListAsync();


            return Ok(users);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> ChangeUser([FromBody] UserSaveChangeDto dto, Guid userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if(user == null)
            {
                return NotFound("User not found");
            }

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Password = dto.Password;
            user.Username = dto.Username;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpPost("")]
        public async Task<IActionResult> CreateUser([FromBody] UserSaveChangeDto dto)
        {

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                FullName = dto.FullName,
                Email = dto.Email,
                Password = dto.Password,
                Username = dto.Username,
                CreatedAt = DateTime.UtcNow,
                IsGlobalAdmin = false,
            };

            _context.Users.Add(newUser);

            await _context.SaveChangesAsync();

            await _context.Entry(newUser).Collection(u => u.UserProjects).Query().Include(up => up.Project).LoadAsync();
            await _context.Entry(newUser).Collection(u => u.AssignedTasks).LoadAsync();
            await _context.Entry(newUser).Collection(u => u.UserTeams).Query().Include(ut => ut.Team).LoadAsync();

            return Ok(new
            {
                id = newUser.Id,
                fullName = newUser.FullName,
                username = newUser.Username,
                email = newUser.Email,
                password = newUser.Password,
                teams = newUser.UserTeams.Select(ut => ut.Team.Name).ToList(),
                projects = newUser.UserProjects.Select(up => up.Project.Name).ToList(),
                tasks = newUser.AssignedTasks.Select(t => t.Name).ToList()
            });
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {

            var user = await _context.Users.
                FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userProjects = await _context.UserProjects
                .Where(up => up.UserId == userId).ToListAsync();

            var tasks = await _context.Tasks
                .Where(t => t.AssignedToUserId == userId).ToListAsync();

            var userTeams = await _context.UserTeams
                .Where(ut => ut.UserId == userId).ToListAsync();

            _context.UserProjects.RemoveRange(userProjects);
            _context.UserTeams.RemoveRange(userTeams);
            _context.Tasks.RemoveRange(tasks);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}
