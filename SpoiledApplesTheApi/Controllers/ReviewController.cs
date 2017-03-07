using SpoiledApplesTheApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace SpoiledApplesTheApi.Controllers
{
    public class ReviewController : ApiController
    {

        ApplicationContext db = new ApplicationContext();

        /*********************************
         * POST
         ********************************/
        public IHttpActionResult Post(Review review)
        {
            db.Reviews.Add(review);
            db.SaveChanges();
            return Created("Get", review);
        }

        /*********************************
         * GET List
         ********************************/
        [ResponseType(typeof(Review))]
        public IHttpActionResult Get()
        {
            DbSet<Review> results = db.Reviews;
            return Ok(results);
        }
        
        /*********************************
         * GET Single (from MovieId)
         ********************************/
        [ResponseType(typeof(Review))]
        public IHttpActionResult Get(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Review result = db.Reviews.Where(d => d.MovieId == id).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        /*********************************
         * UPDATE
         ********************************/
        public IHttpActionResult Put(int? id, Review review)
        {
            if (id == null)
            {
                return NotFound();
            }

            review.Id = (int)id;
            db.Entry(review).State = EntityState.Modified;
            db.SaveChanges();

            return Ok();
        }

        /*********************************
         * DELETE
         ********************************/
        public IHttpActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Review result = db.Reviews.Find(id);

            if (result == null)
            {
                return NotFound();
            }

            db.Reviews.Remove(result);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}

