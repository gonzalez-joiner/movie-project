// https://fishy-exciting-fight.glitch.me/movies


function movies() {
	fetch("https://fishy-exciting-fight.glitch.me/movies")
		.then(response => response.json())
		.then(data => {
			console.log("All Data: ");
			console.log(data);
			let html = "";
			for (let movie of data) {
				html += `<div class="container card col-3 m-1 border border-danger">`;
				html += `<div class="card-body">`
				html += `<h3 class="card-text">${movie.title}</h3>`
				html += `<p class="card-text">Rating: ${movie.rating}</p>`
				// html += `<p class="card-text">Director: ${movie.director}</p>`
				html += `</div>`;
				html += `</div>`;
			}
			$('#movieList').html(html);
			
			
		})
}

function addMovie(title, rating) {
	// 	on sumbit grab value of text/selecor
	let newMovie = {
		title: $("#movieTitle").val(),
		rating: $("#rating").val()
	}
	
	fetch("https:fishy-exciting-fight.glitch.me/movies", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newMovie)
	})
		.then(() => fetch("https:fishy-exciting-fight.glitch.me/movies")
			.then(response => response.json())
			.then(() => movies()))
}

$("#myBtn").click(function() {
	addMovie();
})

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


//     THIS WORKS BTW
// function addMovieList () {
//     var html = '';
//
//     for (let i = 0; i < data.length; i++) {
//         console.log("lopp?");
//         html += `<div class="container col-sm-3">`;
//         html += `<h3>${data[i].title}</h3>`
//         html += `</div>`;
//
//     }
//     $('#movieList').html(html);
// }
//
// addMovieList();
		
		






