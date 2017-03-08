namespace SpoiledApplesTheApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedMovieVirtualAccessorBackToReviewModel : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Reviews", "MovieId");
            AddForeignKey("dbo.Reviews", "MovieId", "dbo.Movies", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reviews", "MovieId", "dbo.Movies");
            DropIndex("dbo.Reviews", new[] { "MovieId" });
        }
    }
}
