$().ready(function () {

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
    //Button to get all People
    $("#allpeople").click(function () {
        $.get("http://localhost:59180/api/Reviewer",
			function (resp) {
			    console.log(resp);
			    people(resp);
			}
		);

    });

    //Function to Sort by Age
    $("#sortage").click(function () {

        $.get("http://localhost:59180/api/Reviewer",
                people(function (resp) {
                    resp.sort(function (a, b) {
                        return a.Age - b.Age;
                    });
                }));

    } );

    //Function to Sort by Occupation
    /* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
    $("#sortocc").click(function () {

        $.get("http://localhost:59180/api/Reviewer",
               people( function (resp) {
                    resp.sort(function (a, b) {
                        var occA = a.Occupation.toUpperCase(); // ignore upper and lowercase
                        var occB = b.Occupation.toUpperCase(); // ignore upper and lowercase
                        if (occA < occB) {
                            return -1;
                        }
                        if (occA > occB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;
                    });
                }) );

    });

    //Function to display all people
    function people(resp) {

        $("#moviedetails").hide();

        var tbody = $("reviews");
        tbody.empty();

        //Display People
        var rtable = $("#reviews");

        $("#rtitle").empty().append("Reviewers");
        $("#rname").empty().append("Name");
        $("#age").empty().append("<a href=\"#\" id=\"sortage\">Age</a>");
        $("#gender").empty().append("Gender");
        $("#occ").empty().append("<a href=\"#\" id=\"sortocc\">Occupation</a>");

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
        function (reviewbymovie) {
            console.log(reviewbymovie[0].Reviewer.Name);
            console.log(reviewbymovie[0].Movie.Title);
            displayReviews(reviewbymovie);
        }
    );
};

//Function
function displayReviews(reviewbymovie) {

    var mtable = $("#movies");

    var movie = reviewbymovie[0].Movie;

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

    for (r in reviewbymovie) {

        var name = reviewbymovie[r].Reviewer.Name;
        var age = reviewbymovie[r].Reviewer.Age;
        var gender = reviewbymovie[r].Reviewer.Gender;
        var occupation = reviewbymovie[r].Reviewer.Occupation;
        var rating = reviewbymovie[r].Rating;

        rtable.append(
             "<tr><td>" + name
            + "</td><td>" + age
            + "</td><td>" + gender
            + "</td><td>" + occupation
            + "</td><td>" + rating
            + "</td></tr>");
    }

};









