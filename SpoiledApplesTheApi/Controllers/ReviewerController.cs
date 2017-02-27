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
    public class ReviewerController : ApiController
    {

        ApplicationContext db = new ApplicationContext();

        /*********************************
         * POST
         ********************************/
        public IHttpActionResult Post(Reviewer reviewer)
        {
            db.Reviewers.Add(reviewer);
            db.SaveChanges();
            return Created("Get", reviewer);
        }

        /*********************************
         * GET List
         ********************************/
        [ResponseType(typeof(Reviewer))]
        public IHttpActionResult Get()
        {
            DbSet<Reviewer> results = db.Reviewers;
            return Ok(results);
        }

        /*********************************
         * GET Single
         ********************************/
        [ResponseType(typeof(Reviewer))]
        public IHttpActionResult Get(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Reviewer result = db.Reviewers.Where(d => d.Id == id).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        /*********************************
         * UPDATE
         ********************************/
        public IHttpActionResult Put(int? id, Reviewer reviewer)
        {
            if (id == null)
            {
                return NotFound();
            }

            reviewer.Id = (int)id;
            db.Entry(reviewer).State = EntityState.Modified;
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

            Reviewer result = db.Reviewers.Find(id);

            if (result == null)
            {
                return NotFound();
            }

            db.Reviewers.Remove(result);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
