using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace imageboard.Models
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<SecretKey> Keys { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        //public ApplicationContext() : base()
        //{
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=imageboardDb;Username=postgres;Password=123");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Board>()
                .HasOne(p => p.Category)
                .WithMany(t => t.Boards);


            modelBuilder.Entity<Thread>()
               .HasOne(p => p.Board)
               .WithMany(t => t.Threads);

            modelBuilder.Entity<Post>()
               .HasOne(p => p.Thread)
               .WithMany(t => t.Posts);

            modelBuilder.Entity<Post>()
               .HasOne(p => p.User)
               .WithMany(t => t.Posts);


            modelBuilder.Entity<News>()
            .HasOne(p => p.User)
            .WithMany(t => t.News);
            

    }
    }
}
