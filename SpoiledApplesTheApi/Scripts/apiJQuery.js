$().ready(function () {

    /**************ALL MOVIES*****************/
    //Button
    $("#allmovies").click(function () {

        $.get("http://localhost:59180/api/Movie",
			function (resp) {
			    console.log(resp);
			    allmovies(resp);
			}
		);

    });
    //Function
    function allmovies(resp) {
        var tbody = $("#movies");
        tbody.empty();
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

        $("#title").append("All Movies");
        $("#mtitle").append("Title");
        $("#mgenre").append("Genre");
        $("#mavg").append("Average"+"<br/>"+"Rating");
        $("#mIMDB").append("IMDB");
        $("#mrdate").append("Release" + "<br/>" + "Date");

    };
});

    /**************REVIEWS BY MOVIE*****************/
    //Button
    function movieBtnClick(id) {

        $.get("http://localhost:59180/api/Review/" + id,
            function (resp) {
			    console.log(resp);
			   // reviews(resp);
			}
		);

    };
    //Function
    function reviews(resp) {
        var tbody = $("#reviews");
        tbody.empty();
        for (m in resp) {

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
                + "</td></tr>");
        }

        $("#title").append("All Movies");
        $("#mtitle").append("Title");
        $("#mgenre").append("Genre");
        $("#mavg").append("Average" + "<br/>" + "Rating");
        $("#mIMDB").append("IMDB");
        $("#mrdate").append("Release" + "<br/>" + "Date");

    };

