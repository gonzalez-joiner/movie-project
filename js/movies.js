// https://fishy-exciting-fight.glitch.me/movies


function movies() {
	
	$(".loader").toggleClass("hidden")
	
	// setTimeout(() => {
	
	fetch("https://fishy-exciting-fight.glitch.me/movies")
		.then(response => response.json())
		.then(data => {
			console.log("All Data: ");
			console.log(data);
			let html = "";
			for (let movie of data) {
				html += `<div class=" col-12 col-sm-6 col-md-3">`
				html += `<div class="container card" id="${movie.id}">`;
				
				html += `<span class="close" id="exit-${movie.id}" value="${movie.id}"><i class="fa-solid fa-xmark"></i></span>`
				html += `<img class="card-img-top" src="../assets/imgs/movie-poster.svg">`
				
				html += `<div class="card-body">`
				html += `<h3 class="card-text fs-5">${movie.title}</h3>`
				
				
				let totalReviews = movie.reviews.length;
				let totalStars = 0;
				for (let j = 0; j < movie.reviews.length; j++) {
					totalStars += parseInt(movie.reviews[j].stars);
				}
				let averageStars = parseInt(Math.floor(totalStars / totalReviews));
				console.log(averageStars);
				
				
				// empty star <i class="fa-regular fa-star"></i>
				// filled star <i class="fa-solid fa-star"></i>
				if (averageStars === 1){
					html += `<p class="card-text">Rating: <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
				} else if (averageStars === 2) {
					html += `<p class="card-text">Rating: <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
				} else if (averageStars === 3) {
					html += `<p class="card-text">Rating: <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i>`
				} else if (averageStars === 4) {
					html += `<p class="card-text">Rating: <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i>`
				} else if (averageStars === 5) {
					html += `<p class="card-text">Rating: <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i>`
				}
				
				
				// html += `<p class="card-text">Rating: ${averageStars}</p>`
				
				
				html += `<div class="d-flex justify-content-between"><p>${movie.genre}</p>  <a href="#"  id="edit-${movie.id}" class="btn btn-outline-light edit-btn"><i class="fa-regular fa-pen-to-square"></i></a> </div>`
				
				// html += `<p class="card-text">Director: ${movie.director}</p>`
				html += `</div>`;
				html += `</div>`;
				html += `</div>`;

				let editHTML = '';
				editHTML += `<div>`;
				editHTML += `<p>${movie.description}</p>`;
				editHTML += `</div>`

				$('#edit-div').html(editHTML);

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

			$('.edit-btn').click(function(e) {
				e.preventDefault();
				const id = $(this).attr('id').split('-')[1];
				console.log(`this is the id: ${id}`);
				$("#editModal").css("display", "block");
			});
			// $(`#edit-${data.id}`).click(function(e) {
			// 	e.preventDefault();
			// 	console.log("clicked");
			// 	// const id = $(this).attr('id').split('-')[1];
			// 	console.log(`Edit movie with id`);
			// 	$("#editModal").css("display", "block");
			// });
			
			
		}).then(() => $(".loader").toggleClass("hidden"));
	// },5000)


///////////////////////
///////////////////////
///////////////////////adding stars to modal
	var starOne = document.getElementById('star1');
	var starTwo = document.getElementById('star2');
	var starThree = document.getElementById('star3');
	var starFour = document.getElementById('star4');
	var starFive = document.getElementById('star5');
	
	starOne.onclick = function () {
		starOne.style.color = "yellow";
		starTwo.style.color = "white";
		starThree.style.color = "white";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "1")
	}
	starTwo.onclick = function () {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "white";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "2")
	}
	starThree.onclick = function () {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "yellow";
		starFour.style.color = "white";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "3")
	}
	starFour.onclick = function () {
		starOne.style.color = "yellow";
		starTwo.style.color = "yellow";
		starThree.style.color = "yellow";
		starFour.style.color = "yellow";
		starFive.style.color = "white";
		$(".star-wrap").attr("value", "4")
	}
	starFive.onclick = function () {
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
	
	btn.onclick = function (e) {
		e.preventDefault();
		modal.style.display = "block";
	}
	
	var modalSpan = document.getElementsByClassName("pop")[0];
	
	
	modalSpan.onclick = function () {
		modal.style.display = "none";
		
	}
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
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
		genre: $("#genreSelect").val(),
		avgStars: "0",
		reviews: [{
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

var modal = document.getElementById("myModal");
$("#myBtn").click(function (e) {
	e.preventDefault();
	// modal.style.display = "hidden";
	addMovie();
	modal.style.display = "none";
})

movies();





