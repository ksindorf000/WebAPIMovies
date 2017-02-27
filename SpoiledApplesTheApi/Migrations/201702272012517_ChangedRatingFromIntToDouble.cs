namespace SpoiledApplesTheApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedRatingFromIntToDouble : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Reviews", "Rating", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Reviews", "Rating", c => c.Int(nullable: false));
        }
    }
}
