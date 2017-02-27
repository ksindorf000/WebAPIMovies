using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SpoiledApplesTheApi.Models
{
    public class ApplicationContext : DbContext
    {
        DbSet<Movie> Movies { get; set; }
    }
}