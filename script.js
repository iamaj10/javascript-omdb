// Get HTML elements by id
const searchBox = document.querySelector("#search-box");
const searchList = document.querySelector("#search-list");
const resultGrid = document.querySelector("#result-grid");

// Set local storage if not available
if (!localStorage.getItem("favMovies")) {
  let favMovies = [];
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}

// Get search text and call API function
const initiateSearch = () => {
  let searchText = searchBox.value.trim();

  if (searchText.length > 0) {
    searchList.classList.remove("hide-search-list");
    fetchMoviesData(searchText);
  } else {
    searchList.classList.add("hide-search-list");
  }
};

async function fetchMoviesData(searchText) {
  const URL = `https://www.omdbapi.com/?s=${searchText}&page=1&apikey=3c81721f`;

  try {
    const res = await fetch(`${URL}`);
    const data = await res.json();

    if (data.Response == "True") {
      displayMoviesList(data.Search);
    }
  } catch (error) {
    console.log(error);
  }
}

// Show list of movies in suggestions
const displayMoviesList = (movies) => {
  searchList.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("search-list-item");

    // Set poster image
    const moviePoster =
      movies[i].Poster !== "N/A" ? movies[i].Poster : "no_image.jpg";

    movieListItem.innerHTML = `
      <div class="search-item-thumbnail"> 
        <img src="${moviePoster}" alt="movie">
      </div>
      <div class="search-item-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
      </div>
    `;

    searchList.appendChild(movieListItem);
  }

  loadMovieDetails(); // Load movie details
};

// Load movie details on selection
const loadMovieDetails = () => {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");

  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      searchBox.value = "";

      localStorage.setItem("movieID", movie.dataset.id);

      window.location.href = "./movieDetails/movieDetails.html";
    });
  });
};

// Add Event Listeners to different elements
window.addEventListener("click", function (e) {
  if (e.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});

searchBox.addEventListener("keyup", initiateSearch);
searchBox.addEventListener("click", initiateSearch);
