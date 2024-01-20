// Selecting the result container div, so that we can append favMovies inside it
const resultContainer = document.querySelector(".result-container");

// Get data from local storage
let favoriteMovies = JSON.parse(localStorage.getItem("favMovies"));

// Get all favorite movies
favoriteMovies.forEach((id) => {
  fetchData(id); // Get Movie from API with ID
});

// Get movies from the server
async function fetchData(movieID) {
  console.log(movieID);
  const result = await fetch(
    `http://www.omdbapi.com/?i=${movieID}&apikey=755f786c`
  );
  const movieDetails = await result.json(); // Make data readable

  addMovieToDOM(movieDetails); // Add to DOM
}

// Add movie to DOM
const addMovieToDOM = (details) => {
  const movieElement = document.createElement("div"); // Create movie box

  movieElement.setAttribute("id", details.imdbID); // Set unique id to delete exact movie
  movieElement.setAttribute("class", "result-grid"); // Add CSS

  movieElement.innerHTML = `
    <div class="movie-poster">
      <img src="${
        details.Poster != "N/A" ? details.Poster : "../no_image.jpg"
      }" alt="movie-poster">
    </div>

    <div class="movie-info">
      <h3 class="movie-title">${details.Title}</h3>
      <ul class="movie-misc-info">
        <li class="year">Year: ${details.Year}</li>
        <li class="rated">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
      </ul>

      <p class="genre"><b>Genre: </b>${details.Genre}</p>
      <p class="writer"><b>Writer: </b> ${details.Writer}</p>
      <p class="actors"><b>Actors: </b> ${details.Actors}</p>
      <p class="plot"><b>Plot: </b> ${details.Plot}</p>
      <p class="language"><b>Language: </b> ${details.Language}</p>
      <p class="awards"><b>Awards: <i class="fa-solid fa-award"></i></b> ${
        details.Awards
      }</p>
    </div> 
  `;

  // Create button for each favorite movie
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-btn"); // Add CSS
  deleteButton.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`; // Set unique id to delete exact movie

  deleteButton.addEventListener("click", removeMovie); // Add event listener to each button
  movieElement.appendChild(deleteButton); // Add button to Movie

  resultContainer.appendChild(movieElement); // Add movie to DOM
};

// Delete movie from DOM
const removeMovie = (e) => {
  // Get the id of the movie
  const deleteID = e.target.dataset.id;

  // Get the specific movie
  const movieToRemove = document.getElementById(`${deleteID}`);

  // Delete movie from view
  movieToRemove.remove();

  // Delete the movie from list
  favoriteMovies = favoriteMovies.filter((id) => id != deleteID);

  // Update local storage with new data of favoriteMovies
  localStorage.setItem("favMovies", JSON.stringify(favoriteMovies));
};
