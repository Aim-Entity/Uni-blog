using Domain.Entities.BlogEntities;
using Domain.Entities.UserEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DatabaseContext
{
    public class BlogDbContext : IdentityDbContext<User>
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Blog>()
                .HasKey(a => new { a.Id });

            builder.Entity<Category>()
                .HasKey(a => new { a.Id });

            builder.Entity<Comment>()
                .HasKey(a => new { a.Id });

            builder.Entity<Tag>()
                .HasKey(a => new { a.Id });

            builder.Entity<User>()
                .Property(e => e.FirstName).HasMaxLength(256);

            builder.Entity<User>()
                .Property(e => e.LastName).HasMaxLength(256);
        }
    }
}
