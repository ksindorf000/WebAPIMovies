namespace SpoiledApplesTheApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedReviews : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Reviews",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Reviewer = c.String(),
                        MovieId = c.Int(nullable: false),
                        Rating = c.Int(nullable: false),
                        Age = c.Int(nullable: false),
                        Gender = c.String(),
                        Occupation = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Movies", t => t.MovieId, cascadeDelete: true)
                .Index(t => t.MovieId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reviews", "MovieId", "dbo.Movies");
            DropIndex("dbo.Reviews", new[] { "MovieId" });
            DropTable("dbo.Reviews");
        }
    }
}
