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
    public class MovieController : ApiController
    {
        ApplicationContext db = new ApplicationContext();

        /*********************************
         * POST
         ********************************/
        public IHttpActionResult Post(Movie movie)
        {
            db.Movies.Add(movie);
            db.SaveChanges();
            return Created("Get", movie);
        }

        /*********************************
         * GET List
         ********************************/
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Get()
        {
            DbSet<Movie> results = db.Movies;
            return Ok(results);
        }

        /*********************************
         * GET Single
         ********************************/
        [ResponseType(typeof(Movie))]
        public IHttpActionResult Get(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Movie result = db.Movies.Where(d => d.Id == id).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        /*********************************
         * UPDATE
         ********************************/
        public IHttpActionResult Put(int? id, Movie movie)
        {
            if (id == null)
            {
                return NotFound();
            }

            movie.Id = (int)id;
            db.Entry(movie).State = EntityState.Modified;
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

            Movie result = db.Movies.Find(id);

            if (result == null)
            {
                return NotFound();
            }

            db.Movies.Remove(result);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}

