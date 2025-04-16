using Microsoft.EntityFrameworkCore;
using TeamBoard.Models;
namespace TeamBoard.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<UserTeam> UserTeams { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTeam>()
                .HasKey(ut => new { ut.UserId, ut.TeamId });

            modelBuilder.Entity<Project>()
                .HasOne(p => p.CreatedByUser)
                .WithMany(p => p.CreatedProjects)
                .HasForeignKey(p => p.CreatedByUserId);

            modelBuilder.Entity<UserProject>()
                .HasKey(up => new { up.UserId, up.ProjectId });
        }
    }
}
