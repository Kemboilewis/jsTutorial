const addMovieModal = document.getElementById("add-modal");

const startAddingButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelButton = addMovieModal.querySelector(".btn--passive");
const confirmButton = cancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const renderNewMovieElement = (title, imageUrl, ratingValue) => {
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
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackDrop = () => {
  backdrop.classList.toggle("visible");
};
const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackDrop();
};
const backdropClickHandler = () => {
  toggleMovieModal();
};
const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};
const cancelAddMovieHandler = () => {
  toggleMovieModal();
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
    title: titleValue,
    image: urlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  clearMovieInputs();
  toggleMovieModal();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddingButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelButton.addEventListener("click", cancelAddMovieHandler);
confirmButton.addEventListener("click", addMovieHandler);
