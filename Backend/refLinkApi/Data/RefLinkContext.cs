using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;

    public class RefLinkContext : DbContext
    {
        public RefLinkContext (DbContextOptions<RefLinkContext> options)
            : base(options)
        {
        }

        public DbSet<Employer> Employers { get; set; } = default!;
        public DbSet<Candidate> Candidates { get; set; } = default!;
        public DbSet<Posting> Postings { get; set; } = default!;
        public DbSet<Question> Questions { get; set; } = default!;
        public DbSet<Referencer> Referencers  { get; set; } = default!;
        public DbSet<Response> Responses  { get; set; } = default!;
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Posting>()
                .HasOne(p => p.Employer)
                .WithMany(e => e.Postings)
                .HasForeignKey(p => p.EmployerGuid);
            
            modelBuilder.Entity<Employer>()
                .HasKey(e => e.GuidId);
            
            modelBuilder.Entity<Candidate>()
                .HasOne(c => c.Posting)
                .WithMany(p => p.Candidates)
                .HasForeignKey(c => c.PostingGuid);
            
            modelBuilder.Entity<Posting>()
                .HasKey(e => e.GuidId);
            
            modelBuilder.Entity<Question>()
                .HasOne(q => q.Posting)
                .WithMany(p => p.Questions)
                .HasForeignKey(q => q.PostingGuid);
        }
    }
