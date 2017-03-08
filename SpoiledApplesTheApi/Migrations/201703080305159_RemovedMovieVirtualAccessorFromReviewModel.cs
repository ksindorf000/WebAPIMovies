namespace SpoiledApplesTheApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedMovieVirtualAccessorFromReviewModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Reviews", "MovieId", "dbo.Movies");
            DropIndex("dbo.Reviews", new[] { "MovieId" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Reviews", "MovieId");
            AddForeignKey("dbo.Reviews", "MovieId", "dbo.Movies", "Id", cascadeDelete: true);
        }
    }
}
