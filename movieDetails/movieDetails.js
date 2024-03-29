// Get movie ID from local storage
let movieID = localStorage.getItem("movieID");
const addToFavBtn = document.querySelector("#addToFav"); // Add to fav Button

let favMovies = JSON.parse(localStorage.getItem("favMovies")) || []; // Get details of list of movies stored in local storage
const resultGrid = document.querySelector("#result-grid"); // Movie container

// This command will run only if there is a valid movieID
if (movieID) {
  getData(movieID);
}

// Load only clicked movie detail
async function getData(movieID) {
  const result = await fetch(
    `https://www.omdbapi.com/?i=${movieID}&apikey=3c81721f`
  );
  const movieDetails = await result.json(); // Converting Movie Details from server to JSON format
  displayMovieDetails(movieDetails); // Display the movie
}

// Showing movie in the moviePage
const displayMovieDetails = (details) => {
  // Add movie to Page
  resultGrid.innerHTML = `<div class="movie-poster">
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
</div>`;
};

// Set addToFav button text to "already added" if it is already there in fav-list
if (movieID) {
  if (favMovies.includes(movieID)) {
    addToFavBtn.textContent = "Already Added To Favourites!!";
  }
}

// Favourite Button
const addToFav = () => {
  addToFavBtn.textContent = "Added To Favourites";

  // Check if movie is already added to the list
  if (favMovies.includes(movieID)) {
    addToFavBtn.textContent = "Already Added To Favourites!!";
  } else {
    favMovies.push(movieID); // Add movie to favourite list

    // Add new favMovies data to local storage
    localStorage.setItem("favMovies", JSON.stringify(favMovies)); // Set data to localstorage
  }
};

// Event listeners
addToFavBtn.addEventListener("click", addToFav);
