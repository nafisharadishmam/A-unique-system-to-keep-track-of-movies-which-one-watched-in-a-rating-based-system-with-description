
//Removing the empty message display
/**
 * @action clear all 
 * @Return empty message
 */
const emptyMessage = document.querySelector('.movie-list__empty-item');

//Add movie into the list
/**
 * @param const
 * @param className
 * @param {string} movie-list__movie-item
 * @return @const addMovie
 */
const addMovie = () => {
    //Create a new item
    const newMovieItem = document.createElement('div');
    newMovieItem.className = 'movie-list__movie-item';

    //Place of movie description container
    /**
     * @param const
     * @param className
     * @const newMovieDescriptionContainer
     * @constant New movie description
     * @returns class name
     */
    const newMovieDescriptionContainer = document.createElement('div');
    newMovieDescriptionContainer.className = 'movie-description';

    //Place of trash bin for delete
    /**
     * @param const
     * @param className
     * @param innerHTML
     * @add trash-icon
     * @param addEventListener
     * @param {String} trashBin
     * @new add const{string} transhBin
     * @action delete
     */
    const trashBin = document.createElement('div');
    trashBin.className = 'trash-icon';
    trashBin.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
    trashBin.addEventListener('click', () => {
       movieList.removeChild(newMovieItem);
       
       //Display empty message
       /**
        * @param {string} displayEmptyMessage
        * @private messages
        * @requires access
        * @type text
        * @action delete
        */

       displayEmptyMessage();
    }); 

    //Place of logo
    /**
     * @param const /It is fixed file
     * @param {string} newMovieLogo
     * @requires access
     * @add untitled 1
     * @returns null
     * @param className
     * @param innerHTML
     */
    const newMovieLogo = document.createElement('div');
    newMovieLogo.className = 'movie-logo';
    newMovieLogo.innerHTML = changeMovieLogo();
    
    //Movie title
    /**
     * @param const
     * @param {String} newMovieTitle
     */
    const newMovieTitle = document.createElement('h2');
    newMovieTitle.textContent = document.querySelector('#movie-name').value;

    //Movie genre
    /**
     * @param const
     * @param {String} genre
     * @constructs G
     * @g = genre
         
     }
     */
    const newMovieGenre = document.createElement('div');
    newMovieGenre.classList = 'movie-genre';
    newMovieGenre.textContent = document.querySelector('#movie-genre').value;

    //Movie rating
    /**
     * @param const
     * @param {String} movie-rating
     * @param {String} changemovierating
     * 
     */
    const newMovieRating = document.createElement('div');
    newMovieRating.className = 'movie-rating';
    newMovieRating.innerHTML = changeMovieRating();

    //Movie description
    /**
     * @param const
     * @param {String} Movie-description
     */
    const newMovieDescription = document.createElement('p');
    newMovieDescription.textContent = document.querySelector('#movie-description').value;

    //Validation in the add movie form
    /**
     * @new validation
     * @property document.querySelector
     * @param {String} movie-name
     * @param {String} movie-genre
     * @param {String} movie-rating
     * @param {String} movie-description
     * @param {String} block
     * @new movieModal.style.display
     * @returns
     */
    if(validation(
        document.querySelector('#movie-name'), 
        document.querySelector('#movie-genre'), 
        document.querySelector('#movie-rating'), 
        document.querySelector('#movie-description')
    )) {
        movieModal.style.display = 'block';
        return;
    }

    //Append the description information inside the container
    /**
     * @const newMovieDescriptionContainer.appendChild
     * @param {String} newMovieTitle
     * @param {String} newMovieGenre
     * @param {String} newMovieRating
     * @param {String} newMovieDescription
     */
    newMovieDescriptionContainer.appendChild(newMovieTitle);
    newMovieDescriptionContainer.appendChild(newMovieGenre);
    newMovieDescriptionContainer.appendChild(newMovieRating);
    newMovieDescriptionContainer.appendChild(newMovieDescription);

    //Append the container
   /**
    * @const newMovieItem.appendChild
    * @execute trashbin
    * @execute newMovieLogo
    * @execute newMovieDescriptionContainer
    */
    newMovieItem.appendChild(trashBin);
    newMovieItem.appendChild(newMovieLogo);
    newMovieItem.appendChild(newMovieDescriptionContainer)

    //Add the movie list into the container
    /**
     * @execute  movieList.appendChild(newMovieItem)
     */
    movieList.appendChild(newMovieItem);

    //Close modal as the item is listed
    /**
     * @const movieModal.style.display
     * @param document.querySelector
     * @param movie-name
     * @param movie-genre
     * @param movie-rating
     * @param movie-description
     * @execute clearFormat
     */
    movieModal.style.display = 'none';
    clearFormat(document.querySelector('#movie-name'), 
        document.querySelector('#movie-genre'), 
        document.querySelector('#movie-rating'), 
        document.querySelector('#movie-description')
    );

    //Remove empty message
    /**
     * @const displayEmptyMessage
     */
    displayEmptyMessage();
}

//Change the logo of movie according to genre
/**
 * @fixed const
 * @param {String} movie-genre
 * @param {String} action
 * @param {String} Comedy
 * @param {String} Drama
 * @param {String} Horror
 * @param {String} Romance
 * @new default
 * @execute changemovielogo
 * @returns ' ' 
 */

const changeMovieLogo = () => {
    const genreLogo = document.querySelector('#movie-genre').value;
    switch(genreLogo) {
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
/**
 * @param rating
 * @param starRatings
 *
 * @returns starRatings
 */
const changeMovieRating = () => {
    const rating = document.querySelector('#movie-rating').value;
    const remainingStar = 5 - rating;
    let starRatings = '';
    for(let i = 0; i < rating; i++) {
        starRatings += '<i class="fas fa-star" style="margin-right: 4px"></i>';
    }
    for(let i = 0; i < remainingStar; i++) {
        starRatings += '<i class="far fa-star" style="margin-right: 4px"></i>';
    }
    return starRatings;
}

//Validation of forms
/**
 * 
 * @param {*} title 
 * @param {*} genre 
 * @param {*} rating 
 * @param {*} description 
 * @returns 
 */
const validation = (title, genre, rating, description) => {
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
    /**
     * @param genre
     */
    if(genre.options[genre.selectedIndex].value === 'None') {
        genre.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        genre.style.borderColor = 'white';
    }

    //Rating validation
    /**
     * @param rating.selectedIndex
     * @colour {string} red
     */
    if(rating.options[rating.selectedIndex].value === 'None') {
        rating.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        rating.style.borderColor = 'white';
    }

    //Description validation
    /**
     * @param description.style.borderColor
     * @returns null
     */
    if(description.value === undefined || description.value === '') {
        description.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        description.style.borderColor = 'white';
    }

    //Return if it has errors
    /**
     * @returns {String} hasErrors
     */
    return hasErrors;
}

//Clear error formatting as the movie item is sent
/**
 * 
 * @param {*} title 
 * @param {*} genre 
 * @param {*} rating 
 * @param {*} description
 * @param {String} 
 */
const clearFormat = (title, genre, rating, description) => {
   
    //Remove image 
    /**
     * @param genreLogo.innerHTML
     * @returns ' '
     */
    genreLogo.innerHTML ='';

    //Default border colors
    /**
     * @param {String} title.style.borderColor
     * @param {String} genre.style.borderColor
     * @param {String} rating.style.borderColor
     * @param {String} description.style.borderColor
     */
    title.style.borderColor = 'white';
    genre.style.borderColor = 'white';
    rating.style.borderColor = 'white';
    description.style.borderColor = 'white';

    //Clear all values
    /**
     * @param title.value; genre.value; rating.value; description.value;
     */
    title.value = '';
    genre.value = 'None';
    rating.value = 'None';
    description.value = '';
}

//Whether to display the empty message or not depending on the number of movies
/**
 * 
 * @returns emptyMessage.style.display
 */
const displayEmptyMessage = () => movieList.childElementCount <= 2 ? emptyMessage.style.display = 'block' : emptyMessage.style.display = 'none';


//Filter out all movies by genre
/**
 * 
 * @param {string} chosenGenre 
 * @param {string} Action
 * @param {string} Comedy
 * @param {string} Drama
 * @param {string} Horror
 * @param {string} Romance
 *  
*/
const filterMovies = chosenGenre => {
    const movieItem = Array.from(document.querySelectorAll('.movie-list__movie-item'));
    let selectedGenre = [];

    movieItem.forEach(movie => movie.style.display = 'flex');
    switch(chosenGenre) {
        case 'Action':
            selectedGenre = movieItem.filter(movie => movie.children[2].children[1].textContent !== 'Action');
            break;
        case 'Comedy':
            selectedGenre = movieItem.filter(movie => movie.children[2].children[1].textContent !== 'Comedy');
            break;
        case 'Drama':
            selectedGenre = movieItem.filter(movie => movie.children[2].children[1].textContent !== 'Drama');
            break;
        case 'Horror':
            selectedGenre = movieItem.filter(movie => movie.children[2].children[1].textContent !== 'Horror');
            break;
        case 'Romance':
            selectedGenre = movieItem.filter(movie => movie.children[2].children[1].textContent !== 'Romance');
            break;
        default:
            break;
    }
    selectedGenre.forEach(movie => movie.style.display = 'none');
}

//Navigation bar setting to active whenever clicked
/**
 * @param {string} navigationBar.forEach(navigation)
 * @param {string} navigation.textContent
 * @param {string} Active
 */
navigationBar.forEach(navigation => {
    navigation.addEventListener('click', e => {
        filterMovies(navigation.textContent);
        const active = document.querySelector('.active');
        active.classList.remove('active');
        navigation.classList.add('active');
    });
});

//For opening of modal box
/**
 * @param {String} addMovieButton.addEventListener
 * @param {String}  movieModal.style.display
 */

addMovieButton.addEventListener('click', () => {
    movieModal.style.display = 'block';
});

//When closing of modal box through x icon
closeMovieModal.addEventListener('click', () => {
    movieModal.style.display = 'none';
});

//Add movie modal submit button
/**
 * @requires addMovie
 * @param addMovieToList.addEventListener
 */
addMovieToList.addEventListener('click', e => {
    addMovie(); //Add movies
});

//Selecting genre and changing its logo in modal 
/**
 * @param {String} selectGenre.addEventListener
 * @requires genreLogo
 * @param genreLogo.innerHTML
 */
selectGenre.addEventListener('change', e => {
    genreLogo.innerHTML = changeMovieLogo();
});

//Whenever the user clicks outside the modal
/**
 * @param {string} click
 * @const movieModal.style.display
 */
window.addEventListener('click', e => {
    if(e.target === movieModal) { //If the user clicks outside the modal content
        movieModal.style.display = 'none';
    }
});