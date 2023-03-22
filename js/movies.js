// https://fishy-exciting-fight.glitch.me/movies


function movies() {
	fetch("https://fishy-exciting-fight.glitch.me/movies")
		.then(response => response.json())
		.then(data => {
			console.log("All Data: ");
			console.log(data);
			let html = "";
			for (let movie of data) {
				html += `<div class="col-3">`
				html += `<div class="container card" id="${movie.id}">`;
				html += `<div class="card-body">`
				html += `<span class="close" id="exit-${movie.id}" value="${movie.id}">&times;</span>`
				html += `<h3 class="card-text fs-5">${movie.title}</h3>`
				
				
				let totalReviews = movie.reviews.length;
				let totalStars = 0;
				for (let j = 0; j < movie.reviews.length; j++) {
					totalStars += parseInt(movie.reviews[j].stars);
				}
				let averageStars = totalStars / totalReviews;
				// console.log(averageStars);
				
				
				html += `<p class="card-text">Rating: ${averageStars}</p>`
				// html += `<p class="card-text">Director: ${movie.director}</p>`
				html += `</div>`;
				html += `</div>`;
				html += `</div>`;
				
				totalReviews = 0
				totalStars = 0
				averageStars = 0
			}
			$('#movieList').html(html);
			
			$('span').click(function (e) {
				e.preventDefault();
				let id = $(e.target).attr('value');
				console.log(id);
				deleteMovie(id);
			});
		});
}

function deleteMovie(id) {
	fetch("https:fishy-exciting-fight.glitch.me/movies/" + id, {
		method: "DELETE"
	})
		.then(() => fetch("https:fishy-exciting-fight.glitch.me/movies")
			.then(response => response.json())
			.then(() => movies()))
}

function addMovie(title, rating) {
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
			.then(() => movies()));
}

$("#myBtn").click(function () {
	addMovie();
})

movies();
		
		






