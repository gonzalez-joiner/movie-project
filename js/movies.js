// (function () {

"use strict";
$(document).ready(function () {


// https://fishy-exciting-fight.glitch.me/movies
	
	let globalData;
	
	function movies() {
		
		$(".loader").toggleClass("hidden")
		
		// setTimeout(() => {
		
		fetch("https://fishy-exciting-fight.glitch.me/movies")
			.then(response => response.json())
			.then(data => {
				globalData = data;
				console.log("All Data: ");
				console.log(data);
				let html = "";
				for (let movie of data) {
					html += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">`
					html += `<div class="container card" id="${movie.id}">`;
					
					html += `<span class=" deleteSpan close" id="exit-${movie.id}" value="${movie.id}"><i class="fa-solid fa-xmark"></i></span>`
					
					
					html += `<img class="card-img-top posters" src="${movie.image}">`
					
					html += `<div class="card-body">`
					html += `<h3 class="card-text fs-6">${movie.title}</h3>`
					
					
					let totalReviews = movie.reviews.length;
					let totalStars = 0;
					for (let j = 0; j < movie.reviews.length; j++) {
						totalStars += parseInt(movie.reviews[j].stars);
					}
					let averageStars = parseInt(Math.floor(totalStars / totalReviews));
					
					
					// empty star <i class="fa-regular fa-star"></i>
					// filled star <i class="fa-solid fa-star"></i>
					if (averageStars === 1) {
						html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
					} else if (averageStars === 2) {
						html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
					} else if (averageStars === 3) {
						html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i>`
					} else if (averageStars === 4) {
						html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i>`
					} else if (averageStars === 5) {
						html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i>`
					}
					
					
					// html += `<p class="card-text">Rating: ${averageStars}</p>`
					
					
					html += `<div class="d-flex justify-content-between"><p>${movie.genre}</p>  <a href="#"  id="edit-${movie.id}" class="btn btn-outline-light edit-btn"><i class="fa-regular fa-pen-to-square"></i></a> </div>`
					
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
					let idDelete = $(this).attr('id').split('-')[1];
					// console.log(idDelete);
					deleteMovie(idDelete);
				});
				
				$('.edit-btn').click(function (e) {
					e.preventDefault();
					const id = $(this).attr('id').split('-')[1]; // [edit [0], 1 [1]] id = [1]
					
					
					let editHTML = '';
					editHTML += `<div id="modalWrap">`;
					editHTML += `<div class="pop1" id="editBtn"><i class="fa-solid fa-xmark modal-x"></i></div>`;
					// editHTML += `<p>${data[id - 1].description}</p>`;
					editHTML += `<div class="mb-3">
					<label  class="form-label">Movie Title</label>
					<input class="form-control" type="text" id="editMovie" value="${data[id - 1].title}" disabled>
				</div>`;
					editHTML +=
						`<div class="mb-3">
					<label class="form-label">director</label>
					<input class="form-control" type="text"  id="editDirector" value="${data[id - 1].director}" disabled>
				</div>`;
					editHTML +=
						`<div class="mb-3">
					<label class="form-label">Rating: ${data[id - 1].rating} </label>
					<select id="editRating" class="form-select">
					<option selected value="${data[id - 1].rating}"></option>
					<option value="G">G</option>
					<option value="PG">PG</option>
					<option value="PG-13">PG-13</option>
					<option value="R">R</option>
					</select>
				</div>`;
					editHTML +=
						`<div class="mb-3">
					<label class="form-label">Genre: ${data[id - 1].genre}</label>
					<select id="editGenre" class="form-select">
					<option selected value="${data[id - 1].genre}"></option>
					<option value="action">Action</option>
					<option value="comedy">Comedy</option>
					<option value="horror">Horror</option>
					<option value="thriller">Thriller</option>
					<option value="romance">Romance</option>
					</select>
				</div>`;
					
					editHTML += `<div>
					<label class="form-label">Description</label>
					<textarea class="form-control form-control-lg " id="editDescription" type="text">${data[id - 1].description}</textarea>
				</div>`;
					editHTML += `<input type="hidden" id="hiddenId" value="${data[id - 1].id}">
					<button class="btn btn-primary" type="submit" id="saveBtn">Save</button>`;
					editHTML += `</div>`;
					$('#edit-div').html(editHTML);
					$("#editModal").css("display", "block");
					
					
					$("#saveBtn").click(function (e) {
						e.preventDefault();
						let id = $("#hiddenId").val();
						editMovie(id);
						modalEdit.style.display = "none";
					});
					
					
					// edit close button
					$("#editBtn").click(function (e) {
						e.preventDefault();
						modalEdit.style.display = "none";
					})
				});
				window.onclick = function (event) {
					if (event.target == modalEdit) {
						modalEdit.style.display = "none";
					}
				}
				
				
			}).then(() => $(".loader").toggleClass("hidden"));
		// },3000)
		
		
		// Adding stars to modal
		let starOne = document.getElementById('star1');
		let starTwo = document.getElementById('star2');
		let starThree = document.getElementById('star3');
		let starFour = document.getElementById('star4');
		let starFive = document.getElementById('star5');
		
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
		let modal = document.getElementById("myModal");
		let btn = document.getElementById("myBtn1");
		
		btn.onclick = function (e) {
			e.preventDefault();
			modal.style.display = "block";
		}
		
		let modalSpan = document.getElementsByClassName("pop")[0];
		
		
		// content
		let modalEdit = document.getElementById("editModal");
		
		
		modalSpan.onclick = function () {
			modal.style.display = "none";
			
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}
	
	
	function deleteMovie(idDelete) {
		fetch("https:fishy-exciting-fight.glitch.me/movies/" + idDelete, {
			method: "DELETE"
		})
			.then(() => fetch("https:fishy-exciting-fight.glitch.me/movies")
				.then(response => response.json())
				.then(() => movies()))
	}
	
	function addMovie(title, rating) {
		let newMovie = {
			title: $("#movieTitle").val(),
			director: $("#directorName").val(),
			genre: $("#genreSelect").val(),
			rating: $("#ratingSelect").val(),
			avgStars: "0",
			reviews: [{
				stars: $(".star-wrap").attr("value")
			}],
			image: "https://cdn.glitch.global/97ab1453-f424-4aa9-bc6d-b2449a7c5714/08a24d3b-f4eb-43c2-9d33-934626b4e166.image.png?v=1679579337013",
		}
		
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
	
	let modal = document.getElementById("myModal");
	$("#myBtn").click(function (e) {
		e.preventDefault();
		addMovie();
		modal.style.display = "none";
	})
	
	movies();
	
	
	function editMovie(id) {
		let editedMovie = {
			title: $("#editMovie").val(),
			director: $("#editDirector").val(),
			genre: $("#editGenre").val(),
			rating: $("#editRating").val(),
			description: $("#editDescription").val()
		}
		
		fetch("https://fishy-exciting-fight.glitch.me/movies/" + id, {
			method: "PATCH",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(editedMovie)
		}).then(response => {
			return response.json();
		}).then(() => movies());
	}
	
	function filterMovieTitle(e) {
		// console.log("This is from the function: " + $("#search").val())
		let userInput = $("#search").val();
		let lowerCaseInput = userInput.toLowerCase();
		let filteredMovies = [];
		
		let movies = globalData;
		
		for (let movie of movies) {
			let title = movie.title;
			
			if (title.toLowerCase().indexOf(lowerCaseInput) > -1) {
				filteredMovies.push(movie);
			}
		}
		// console.log(filteredMovies);
		
		let html = "";
		
		for (let movie of filteredMovies) {
			html += `<div class=" col-12 col-sm-6 col-md-3">`
			html += `<div class="container card" id="${movie.id}">`;
			html += `<span class=" deleteSpan close" id="exit-${movie.id}" value="${movie.id}"><i class="fa-solid fa-xmark"></i></span>`
			
			html += `<img class="card-img-top posters" src="${movie.image}">`
			
			html += `<div class="card-body">`
			html += `<h3 class="card-text fs-6">${movie.title}</h3>`
			
			let totalReviews = movie.reviews.length;
			let totalStars = 0;
			for (let j = 0; j < movie.reviews.length; j++) {
				totalStars += parseInt(movie.reviews[j].stars);
			}
			let averageStars = parseInt(Math.floor(totalStars / totalReviews));
			
			// empty star <i class="fa-regular fa-star"></i>
			// filled star <i class="fa-solid fa-star"></i>
			if (averageStars === 1) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
			} else if (averageStars === 2) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
			} else if (averageStars === 3) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i>`
			} else if (averageStars === 4) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i>`
			} else if (averageStars === 5) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i>`
			}
			
			html += `<div class="d-flex justify-content-between"><p>${movie.genre}</p>  <a href="#"  id="edit-${movie.id}" class="btn btn-outline-light edit-btn"><i class="fa-regular fa-pen-to-square"></i></a> </div>`
			
			html += `</div>`;
			html += `</div>`;
			html += `</div>`;
			
			totalReviews = 0
			totalStars = 0
			averageStars = 0
		}
		$("#movieList").html(html)
	}
	
	$("#search").keyup(function (e) {
		e.preventDefault();
		filterMovieTitle();
	});
	
	
	function filterMovieGenre(e) {
		// console.log("This is from the function: " + $("#genreFilter").val())
		let genreSelect = $("#genreFilter").val();
		let filteredMovies = [];
		
		let movies = globalData;
		
		for (let movie of movies) {
			if (movie.genre === genreSelect || genreSelect === "all") {
				filteredMovies.push(movie);
			}
			// console.log(filteredMovies)
		}
		
		let html = "";
		
		for (let movie of filteredMovies) {
			html += `<div class=" col-12 col-sm-6 col-md-3">`
			html += `<div class="container card" id="${movie.id}">`;
			html += `<span class=" deleteSpan close" id="exit-${movie.id}" value="${movie.id}"><i class="fa-solid fa-xmark"></i></span>`
			
			html += `<img class="card-img-top posters" src="${movie.image}">`
			
			html += `<div class="card-body">`
			html += `<h3 class="card-text fs-6">${movie.title}</h3>`
			
			let totalReviews = movie.reviews.length;
			let totalStars = 0;
			for (let j = 0; j < movie.reviews.length; j++) {
				totalStars += parseInt(movie.reviews[j].stars);
			}
			let averageStars = parseInt(Math.floor(totalStars / totalReviews));
			
			// empty star <i class="fa-regular fa-star"></i>
			// filled star <i class="fa-solid fa-star"></i>
			if (averageStars === 1) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
			} else if (averageStars === 2) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i></p>`
			} else if (averageStars === 3) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i> <i class="fa-regular fa-star"></i>`
			} else if (averageStars === 4) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-regular fa-star"></i>`
			} else if (averageStars === 5) {
				html += `<p class="card-text"><i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i> <i class="fa-solid fa-star fa-beat-fade" style="color: #fbff00;"></i>`
			}
			
			html += `<div class="d-flex justify-content-between"><p>${movie.genre}</p>  <a href="#"  id="edit-${movie.id}" class="btn btn-outline-light edit-btn"><i class="fa-regular fa-pen-to-square"></i></a> </div>`
			
			html += `</div>`;
			html += `</div>`;
			html += `</div>`;
			
			totalReviews = 0
			totalStars = 0
			averageStars = 0
		}
		$("#movieList").html(html)
	}
	
	$("#genreFilter").change(function (e) {
		e.preventDefault();
		filterMovieGenre();
	})
	
})
// })();