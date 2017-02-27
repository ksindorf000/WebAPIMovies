namespace SpoiledApplesTheApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedReviewerMovedFieldsFromReview : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Reviewers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Age = c.Int(nullable: false),
                        Gender = c.String(),
                        Occupation = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Reviews", "ReviewerId", c => c.Int(nullable: false));
            CreateIndex("dbo.Reviews", "ReviewerId");
            AddForeignKey("dbo.Reviews", "ReviewerId", "dbo.Reviewers", "Id", cascadeDelete: true);
            DropColumn("dbo.Reviews", "Reviewer");
            DropColumn("dbo.Reviews", "Age");
            DropColumn("dbo.Reviews", "Gender");
            DropColumn("dbo.Reviews", "Occupation");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Reviews", "Occupation", c => c.String());
            AddColumn("dbo.Reviews", "Gender", c => c.String());
            AddColumn("dbo.Reviews", "Age", c => c.Int(nullable: false));
            AddColumn("dbo.Reviews", "Reviewer", c => c.String());
            DropForeignKey("dbo.Reviews", "ReviewerId", "dbo.Reviewers");
            DropIndex("dbo.Reviews", new[] { "ReviewerId" });
            DropColumn("dbo.Reviews", "ReviewerId");
            DropTable("dbo.Reviewers");
        }
    }
}
