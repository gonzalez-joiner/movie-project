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
				let averageStars = parseInt(Math.floor(totalStars / totalReviews));
				console.log(averageStars);


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


///////////////////////
///////////////////////
///////////////////////adding stars to modal
	var starOne = document.getElementById('star1');
	var starTwo = document.getElementById('star2');
	var starThree = document.getElementById('star3');
	var starFour = document.getElementById('star4');
	var starFive = document.getElementById('star5');

	starOne.onclick = function() {
		starOne.style.color = "yellow";
		starTwo.style.color = "white";
		starThree.style.color = "white";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "1")
	}
	starTwo.onclick = function() {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "white";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "2")
	}
	starThree.onclick = function() {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "yellow";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "3")
	}
	starFour.onclick = function() {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "yellow";
		starFour.style.color = "yellow";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "4")
	}
	starFive.onclick = function() {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "yellow";
		starFour.style.color = "yellow";
		starFive.style.color = "yellow";
		$(".star-wrap").attr("value", "5")
	}


	// added modal pop up for adding a movie
	var modal = document.getElementById("myModal");
	var btn = document.getElementById("myBtn1");

	btn.onclick = function(e) {
		e.preventDefault();
		modal.style.display = "block";
	}
	////////////////////////////////////////////
	////////////////////////////////////////////
	////////////////////////////////////////////
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
		avgStars: "0",
		reviews : [{
			stars: $(".star-wrap").attr("value")

		}]


	}
	console.log($("#movieTitle").val());
	console.log($(".star-wrap").attr("value"));

	console.log(newMovie);
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

$("#myBtn").click(function (e) {
	e.preventDefault();
	// modal.style.display = "hidden";
	addMovie();
})

movies();
		
		






