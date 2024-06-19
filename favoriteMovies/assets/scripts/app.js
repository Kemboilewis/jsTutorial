const addMovieModal = document.getElementById("add-modal");

const startAddingButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelButton = addMovieModal.querySelector(".btn--passive");
const confirmButton = cancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const cancelMovieDeletion = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove("visible");
};
const deleteMovie = (movieID) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieID) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUI();
};
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackDrop();

  const canceDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  canceDeletionBtn.removeEventListener("click", cancelMovieDeletion);

  canceDeletionBtn.addEventListener("click", cancelMovieDeletion);
  confirmDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
  // deleteMovie(movieID);
};
const renderNewMovieElement = (id, title, imageUrl, ratingValue) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${ratingValue}/5 stars</p>
        </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackDrop = () => {
  backdrop.classList.toggle("visible");
};
const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
};
const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};
const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackDrop();
  clearMovieInputs();
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const urlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    urlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Invalid value!!!");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: urlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  clearMovieInputs();
  closeMovieModal();
  toggleBackDrop();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

startAddingButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelButton.addEventListener("click", cancelAddMovieHandler);
confirmButton.addEventListener("click", addMovieHandler);
