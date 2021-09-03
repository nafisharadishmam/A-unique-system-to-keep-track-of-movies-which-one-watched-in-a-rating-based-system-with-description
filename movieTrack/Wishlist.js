const NAVIGATION_BAR = document.querySelectorAll('[data-nav-list]');
const ADD_MOVIE_BUTTON = document.querySelector('.movie-list__add-movie');
const MOVIE_MODAL = document.querySelector('.movie__modal-box');
const CLOSE_MOVIE_MODAL = document.querySelector('.close');
//Adding movie into the list
const ADD_MOVIE_TO_LIST = document.querySelector('#add-movie');
const MOVIE_LIST = document.querySelector('.movie-system__movie-list');
const SELECT_GENRE = document.querySelector('#movie-genre');
const GENRE_LOGO = document.querySelector('.add-movie__genre-image');
//Removing the empty message display
const EMPTY_MESSEGE = document.querySelector('.movie-list__empty-item');

//Add movie into the list
const ADD_MOVIE = () => {
    //Create a new item
  const NEW_MOVIE_ITEM = document.createElement('div');
  NEW_MOVIE_ITEM.className = 'movie-list__movie-item';

    //Place of movie description container
  const NEW_MOVIE_DESCRIPTION_CONTAINER = document.createElement('div');
  NEW_MOVIE_DESCRIPTION_CONTAINER.className = 'movie-description';

    //Place of trash bin for delete
  const TRASH_BIN = document.createElement('div');
  TRASH_BIN.className = 'trash-icon';
  TRASH_BIN.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
  TRASH_BIN.addEventListener('click', () => {
    MOVIE_LIST.removeChild(NEW_MOVIE_ITEM);
       //Display empty message
  DISPLAY_EMPTY_MESSAGE();
    }); 

    //Place of logo
  const NEW_MOVIE_LOGO = document.createElement('div');
  NEW_MOVIE_LOGO.className = 'movie-logo';
  NEW_MOVIE_LOGO.innerHTML = CHANGE_MOVIE_LOGO();
    
    //Movie title
  const NEW_MOVIE_TITLE = document.createElement('h2');
  NEW_MOVIE_TITLE.textContent = document.querySelector('#movie-name').value;

    //Movie genre
  const NEW_MOVIE_GENRE = document.createElement('div');
  NEW_MOVIE_GENRE.classList = 'movie-genre';
  NEW_MOVIE_GENRE.textContent = document.querySelector('#movie-genre').value;

    //Movie rating
  const NEW_MOVIE_RATING = document.createElement('div');
  NEW_MOVIE_RATING.className = 'movie-rating';
  NEW_MOVIE_RATING.innerHTML = CHANGE_MOVIE_RATING();

    //Movie description
  const NEW_MOVIE_DESCRIPTION = document.createElement('p');
  NEW_MOVIE_DESCRIPTION.textContent = document.querySelector('#movie-description').value;

    //Validation in the add movie form
  if(VALIDATION(
    document.querySelector('#movie-name'), 
    document.querySelector('#movie-genre'), 
    document.querySelector('#movie-rating'), 
    document.querySelector('#movie-description')
    )) {
  MOVIE_MODAL.style.display = 'block';
    return;
    }

    //Append the description information inside the container
    NEW_MOVIE_DESCRIPTION_CONTAINER.appendChild(NEW_MOVIE_TITLE);
    NEW_MOVIE_DESCRIPTION_CONTAINER.appendChild(NEW_MOVIE_GENRE);
    NEW_MOVIE_DESCRIPTION_CONTAINER.appendChild(NEW_MOVIE_RATING);
    NEW_MOVIE_DESCRIPTION_CONTAINER.appendChild(NEW_MOVIE_DESCRIPTION);

    //Append the container
    NEW_MOVIE_ITEM.appendChild(TRASH_BIN);
    NEW_MOVIE_ITEM.appendChild(NEW_MOVIE_LOGO);
    NEW_MOVIE_ITEM.appendChild(NEW_MOVIE_DESCRIPTION_CONTAINER)

    //Add the movie list into the container
    MOVIE_LIST.appendChild(NEW_MOVIE_ITEM);

    //Close modal as the item is listed
    MOVIE_MODAL.style.display = 'none';
    CLEAR_FORMAT(document.querySelector('#movie-name'), 
      document.querySelector('#movie-genre'), 
      document.querySelector('#movie-rating'), 
      document.querySelector('#movie-description')
    );

    //Remove empty message
    DISPLAY_EMPTY_MESSAGE();
}

//Change the logo of movie according to genre
const CHANGE_MOVIE_LOGO = () => {
  const GENRE_LOGO = document.querySelector('#movie-genre').value;
    switch(GENRE_LOGO) {
      case 'Action':
        return '<i class="fas fa-fighter-jet fa-7x"></i>';
      case 'Comedy':
        return '<i class="far fa-laugh fa-7x"></i>';
      case 'Drama':
        return '<i class="fas fa-theater-masks fa-7x"></i>';
      case 'Horror':
        return '<i class="fas fa-ghost fa-7x"></i>';
      case 'Romance':
        return '<i class="fas fa-heart fa-7x"></i>';
      default:
        return '';
    }
}

//Change the movie ratings
const CHANGE_MOVIE_RATING = () => {
  const rating = document.querySelector('#movie-rating').value;
  const REMAINING_STAR = 5 - rating;
  let starRatings = '';
  for(let i = 0; i < rating; i++) {
    starRatings += '<i class="fas fa-star" style="margin-right: 4px"></i>';
  }
  for(let i = 0; i < REMAINING_STAR; i++) {
    starRatings += '<i class="far fa-star" style="margin-right: 4px"></i>';
  }
  return starRatings;
}

//Validation of forms
const VALIDATION = (title, genre, rating, description) => {
  let hasErrors = false; 
    //Naming validation
  if(title.value === undefined || title.value === '') {
    title.style.borderColor = 'red';
    hasErrors = true;
    }
  else {
    title.style.borderColor = 'white';
    }

    //Genre validation
  if(genre.options[genre.selectedIndex].value === 'None') {
    genre.style.borderColor = 'red';
    hasErrors = true;
    }
  else {
    genre.style.borderColor = 'white';
    }

    //Rating validation
  if(rating.options[rating.selectedIndex].value === 'None') {
    rating.style.borderColor = 'red';
    hasErrors = true;
    }
  else {
    rating.style.borderColor = 'white';
    }

    //Description validation
  if(description.value === undefined || description.value === '') {
    description.style.borderColor = 'red';
    hasErrors = true;
    }
  else {
    description.style.borderColor = 'white';
    }

    //Return if it has errors
  return hasErrors;
}

//Clear error formatting as the movie item is sent
const CLEAR_FORMAT = (title, genre, rating, description) => {
    //Remove image 
  GENRE_LOGO.innerHTML ='';

    //Default border colors
  title.style.borderColor = 'white';
  genre.style.borderColor = 'white';
  rating.style.borderColor = 'white';
  description.style.borderColor = 'white';

    //Clear all values
  title.value = '';
  genre.value = 'None';
  rating.value = 'None';
  description.value = '';
}

//Whether to display the empty message or not depending on the number of movies
const DISPLAY_EMPTY_MESSAGE = () => MOVIE_LIST.childElementCount <= 2 ? EMPTY_MESSEGE.style.display = 'block' : EMPTY_MESSEGE.style.display = 'none';




//Navigation bar setting to active whenever clicked
NAVIGATION_BAR.forEach(navigation => {
  navigation.addEventListener('click', e => {
    filterMovies(navigation.textContent);
    const active = document.querySelector('.active');
    active.classList.remove('active');
    navigation.classList.add('active');
    });
});

//For opening of modal box
ADD_MOVIE_BUTTON.addEventListener('click', () => {
  MOVIE_MODAL.style.display = 'block';
});

//When closing of modal box through x icon
CLOSE_MOVIE_MODAL.addEventListener('click', () => {
  MOVIE_MODAL.style.display = 'none';
});

//Add movie modal submit button
ADD_MOVIE_TO_LIST.addEventListener('click', e => {
  ADD_MOVIE(); //Add movies
});

//Selecting genre and changing its logo in modal 
SELECT_GENRE.addEventListener('change', e => {
  GENRE_LOGO.innerHTML = CHANGE_MOVIE_LOGO();
});

//Whenever the user clicks outside the modal
window.addEventListener('click', e => {
  if(e.target === MOVIE_MODAL) { //If the user clicks outside the modal content
    MOVIE_MODAL.style.display = 'none';
    }
});