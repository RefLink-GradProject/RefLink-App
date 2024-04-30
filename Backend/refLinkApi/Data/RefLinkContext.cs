using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;
using Response = refLinkApi.Models.Response;

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
            
            modelBuilder.Entity<Response>()
                .HasOne(p => p.Referencer)
                .WithMany(e => e.Responses)
                .HasForeignKey(p => p.ReferencerGuid);
            
            modelBuilder.Entity<Response>()
                .HasOne(p => p.Question)
                .WithMany(e => e.Responses)
                .HasForeignKey(p => p.QuestionGuid);
            
            modelBuilder.Entity<Question>()
                .HasKey(e => e.GuidId);
            
            modelBuilder.Entity<Referencer>()
                .HasKey(c => c.GuidId);
            
            modelBuilder.Entity<Employer>()
                .HasKey(e => e.GuidId);
            
            modelBuilder.Entity<Referencer>()
                .HasOne(r => r.Candidate)
                .WithMany(c => c.Referencers)
                .HasForeignKey(r => r.CandidateGuid);
            
            modelBuilder.Entity<Candidate>()
                .HasKey(c => c.GuidId);
            
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
