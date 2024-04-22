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

        public DbSet<refLinkApi.Models.Employer> Employer { get; set; } = default!;
    }
