﻿$().ready(function () {

    /**************ALL MOVIES*****************/
    //Button
    $("#allmovies").click(function () {
        $.get("http://localhost:59180/api/Movie",
			function (resp) {
			    allmovies(resp);
			}
		);

    });

    //Function to display all movies
    function allmovies(resp) {
        var tbody = $("#movies");
        tbody.empty();

        $("#title").empty().append("All Movies");
        $("#mtitle").empty().append("Title");
        $("#mgenre").empty().append("Genre");
        $("#mavg").empty().append("Average" + "<br/>" + "Rating");
        $("#mIMDB").empty().append("IMDB");
        $("#mrdate").empty().append("Release" + "<br/>" + "Date");

        for (m in resp) {

            var id = resp[m].Id;
            var title = resp[m].Title;
            var genre = resp[m].Genre;
            var avg = resp[m].AverageRating;
            var imdb = resp[m].IMDB;
            var rdate = resp[m].ReleaseDate;
            var img = resp[m].imgURL;

            tbody.append(
                "<tr><td>" + title + "<br/>"
                + "<img src=\"" + img + "\" />"
                + "</td><td>" + genre
                + "</td><td>" + avg
                + "</td><td><a href=\"" + imdb + "\">IMDB Link</a>"
                + "</td><td>" + rdate
                + "</td><td><button onclick=\"movieBtnClick(" + id + ")\">Get Reviews</button>"
                + "</td></tr>");
        }
    };

    /**************ALL PEOPLE (reviewers)*****************/
    //Button
    $("#allpeople").click(function () {
        $.get("http://localhost:59180/api/Reviewer",
			function (resp) {
			    console.log(resp);
			    people(resp);
			}
		);

    });

    //Function to display all people
    function people(resp) {

        var tbody = $("reviews");
        tbody.empty();

        //Display People
        var rtable = $("#reviews");

        $("#rtitle").empty().append("Reviewers");
        $("#rname").empty().append("Reviewer Name");
        $("#age").empty().append("Age");
        $("#gender").empty().append("Gender");
        $("#occ").empty().append("Occupation");

        for (r in resp) {

            var name = resp[r].Name;
            var age = resp[r].Age;
            var gender = resp[r].Gender;
            var occ = resp[r].Occupation;

            rtable.append(
                 "<tr><td>" + name
                + "</td><td>" + age
                + "</td><td>" + gender
                + "</td><td>" + occ
                + "</td><td>"
                + "</td></tr>");
        }

    };


});

/**************REVIEWS BY MOVIE*****************/
//Button
function movieBtnClick(id) {

    $.get("http://localhost:59180/api/Review/" + id,
        function (resp) {
            console.log(resp[0].Reviewer.Name);
            console.log(resp[0].Movie.Title);
            displayReviews(resp);
        }
    );
};

//Function
function displayReviews(resp) {

    var mtable = $("#movies");
    $("#jumbo").hide();
   
    var movie = resp[0].Movie;

    //Display Movie
    $("#title").empty().append("Movie Details");
    $("#mtitle").empty().append("Title");
    $("#mgenre").empty().append("Genre");
    $("#mavg").empty().append("Average" + "<br/>" + "Rating");
    $("#mIMDB").empty().append("IMDB");
    $("#mrdate").empty().append("Release" + "<br/>" + "Date");
    
    var id = movie.Id;
    var title = movie.Title;
    var genre = movie.Genre;
    var avg = movie.AverageRating;
    var imdb = movie.IMDB;
    var rdate = movie.ReleaseDate;
    var img = movie.imgURL;

    mtable.empty().append(
        "<tr><td>" + title + "<br/>"
        + "<img src=\"" + img + "\" />"
        + "</td><td>" + genre
        + "</td><td>" + avg
        + "</td><td><a href=\"" + imdb + "\">IMDB Link</a>"
        + "</td><td>" + rdate
        + "</td><td>"
        + "</td></tr>");


    //Display Reviews
    var rtable = $("#reviews");

    $("#rtitle").empty().append("Reviews");
    $("#rname").empty().append("Reviewer Name");
    $("#age").empty().append("Age");
    $("#gender").empty().append("Gender");
    $("#occ").empty().append("Occupation");
    $("#rate").empty().append("Rating");

    for (r in resp) {

        var name = resp[r].Reviewer.Name;
        var age = resp[r].Reviewer.Age;
        var gender = resp[r].Reviewer.Gender;
        var occupation = resp[r].Reviewer.Occupation;
        var rating = resp[r].Rating;

        rtable.append(
             "<tr><td>" + name
            + "</td><td>" + age
            + "</td><td>" + gender
            + "</td><td>" + occupation
            + "</td><td>" + rating
            + "</td></tr>");
    }

};






