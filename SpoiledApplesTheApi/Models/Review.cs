using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpoiledApplesTheApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ReviewerId { get; set; }
        public int MovieId { get; set; }
        public double Rating { get; set; }

        public virtual Movie Movie { get; set; }
        public virtual Reviewer Reviewer { get; set; }
    }
}