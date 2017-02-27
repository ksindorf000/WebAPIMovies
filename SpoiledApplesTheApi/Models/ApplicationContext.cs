using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SpoiledApplesTheApi.Models
{
    public class ApplicationContext : DbContext
    {
       public DbSet<Movie> Movies { get; set; }
    }
}