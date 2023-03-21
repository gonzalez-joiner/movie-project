// https://fishy-exciting-fight.glitch.me/movies



    fetch("https://fishy-exciting-fight.glitch.me/movies")
        .then(response => response.json())
        .then(data => {
                console.log("All Data: ");
                console.log(data);





            // console.log("Movie Title: " + data[0].title);
            // console.log("Director: " + data[0].director);
            // console.log("Movie ID: " + data[0].id);
            // console.log("Movie Rating: " + data[0].rating);
            // console.log("all reviews: ");
            // console.log(data[0].reviews);
            // console.log("review All Info: " + data[0].reviews[1]);
            // console.log("reviewer comment: " + data[0].reviews[1].comment);
            // console.log("Reviewer rating: " + data[0].reviews[1].rating);
            // console.log("reviewer name: " + data[0].reviews[1].user);

        function addMovieList () {
            var html = '';

            for (let i = 0; i < data.length; i++) {
                console.log("lopp?");
                html += `<div class="container col-sm-3">`;
                html += `<h3>${data[i].title}</h3>`
                html += `</div>`;

            }
            $('#movieList').html(html);
        }

        addMovieList();














        })





