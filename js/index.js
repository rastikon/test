// key: 8c8e1a50-6322-4135-8875-5d40a5420d86

const API_KEY = "8798f258-db75-4491-9ee3-a0d68d10701c";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "8798f258-db75-4491-9ee3-a0d68d10701c",
      "Content-Type": "application/json",
    },
  });
  // .then((res) => res.json())
  // .then((json) => console.log(json))
  //     .catch((err) => console.log(err));

  const respData = await resp.json();
  showMovies(respData);
}

// Функція міняє колір кола відповідно до рейтингу фільму
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5 && vote < 7) {
    return "orange";
  }
  return "red";
}

// Відображення фільмів
function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
     <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}"
                class="movie__cover"
                alt="${movie.nameRu}"
                width="240px" />
            <div class="movie__cover--darkened"></div>
          </div>
          <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map(
              (genre) => ` ${genre.genre}`
            )}
            </div>
            </div>
            <div class="movie__average movie__average--${getClassByRate(
              movie.rating
            )}">${movie.rating}</div>
          </div>
          `;
    movieEl.addEventListener("click", () => openModal(movie.filmId));
    moviesEl.appendChild(movieEl);
  });
}

//  Функція пошуку фільмів
const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearch = `${API_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearch);

    search.value = "";
  }
});

// Модалка
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    method: "GET",
    headers: {
      "X-API-KEY": "8798f258-db75-4491-9ee3-a0d68d10701c",
      "Content-Type": "application/json",
    },
  });
  // .then((res) => res.json())
  // .then((json) => console.log(json))
  //     .catch((err) => console.log(err));

  const respData = await resp.json();

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
  <div class="modal__card">
  <button type="button" class="modal__button-close modal-close-btn">Close</button>
  <div class="modal__movie-backdrop"> 
  <img src="${respData.posterUrlPreview}" alt="" class="movie__image">
  <div class="movie__card-overlay">
  <button type="button" class="button__open-trailer">play</button>
  </div>
  </div>
  
  <div class="movie__description">
  <h1>
            <span class="modal__movie-title">${respData.nameRu}</span>
          </h1>
            
          
          <ul class="modal__movie--info">

            <li class="modal__movie-overview">Votes - ${
              respData.ratingKinopoisk
            } / ${respData.ratingKinopoiskVoteCount}</li>
            <li class="modal__movie-overview">Genre - ${respData.genres.map(
              (el) => ` <span>${el.genre}</span>`
            )}</li>
            ${
              respData.filmLength
                ? `<li class="modal__movie-overview">Time - ${respData.filmLength}</li>`
                : " "
            }
            <li class="modal__movie-overview">Popularity - ${
              respData.ratingGoodReview
            }</li>

            <li class="modal__movie-overview">Original Title - ${
              respData.nameOriginal
            }</li>
            
            
            <li class="modal__movie-overview">ABOUT<br> ${
              respData.description
            }</li>
          </ul>
          <button type="button">Add to Watched</button>
          <button type="button">Add to queue</button>

          </div>
         
        </div>
`;
  const btnClose = document.querySelector(".modal__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

// Закриття мобалки

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

// Закритя по кліку на бекдропі

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});

//<span class="modal__movie-relisyear">Votes - ${respData.ratingKinopoisk} / ${respData.ratingKinopoiskVoteCount}</span>

// <div class="modal" data-year="{{release_date}}" data-action="{{id}}">
//       <button class="modal__close" data-modal-close></button>
//       <div class="modal__content">
//         <img
//           class="modal__img"
//           src="https://image.tmdb.org/t/p/w500{{poster_path}}"
//           alt="{{title}}"
//           loading="lazy"
//         />
//       </div>
//       <div class="card-container">
//         <h2 class="card__title">{{title}}</h2>
//         <ul class="card__list">
//           <li class="card__item">
//             Vote / Votes
//             <p class="card__item-vote">
//               <span class="card__item-average">{{vote_average}}</span>/
//               <span class="card__item-count">{{vote_count}}</span>
//             </p>
//           </li>
//           <li class="card__item">
//             Popularity
//             <span class="card__item-popularity">{{popularity}}</span>
//           </li>
//           <li class="card__item">
//             Original Title
//             <span class="card__item-original-title"
//               >{{original_title}}</span
//             >
//           </li>
//           <li class="card__item">
//             Genre
//             <p class="card__item-genres">
//               {{#each genres}}
//               <span class="card__item-genre">{{this.name}}</span>
//               {{/each}}
//             </p>
//           </li>
//         </ul>
//         <p class="card__description">About</p>
//         <p class="card__text">{{overview}}</p>
//         <div class="card__list-btn">
//           <button type="button" class="card__btn-watched">
//             add to <br />
//             Watched
//           </button>
//           <button type="button" class="card__btn-que">add to queue</button>
//           {{!
//           <a class="js-youtube-key" href="" target="_blank" no-referrer>
//             }}
//             <button type="button" class="card__btn-trailer">
//               <img
//                 class="card__svg-youtube"
//                 src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIC03NyA1MTIuMDAyMTMgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUwMS40NTMxMjUgNTYuMDkzNzVjLTUuOTAyMzQ0LTIxLjkzMzU5NC0yMy4xOTUzMTMtMzkuMjIyNjU2LTQ1LjEyNS00NS4xMjg5MDYtNDAuMDY2NDA2LTEwLjk2NDg0NC0yMDAuMzMyMDMxLTEwLjk2NDg0NC0yMDAuMzMyMDMxLTEwLjk2NDg0NHMtMTYwLjI2MTcxOSAwLTIwMC4zMjgxMjUgMTAuNTQ2ODc1Yy0yMS41MDc4MTMgNS45MDIzNDQtMzkuMjIyNjU3IDIzLjYxNzE4Ny00NS4xMjUgNDUuNTQ2ODc1LTEwLjU0Mjk2OSA0MC4wNjI1LTEwLjU0Mjk2OSAxMjMuMTQ4NDM4LTEwLjU0Mjk2OSAxMjMuMTQ4NDM4czAgODMuNTAzOTA2IDEwLjU0Mjk2OSAxMjMuMTQ4NDM3YzUuOTA2MjUgMjEuOTI5Njg3IDIzLjE5NTMxMiAzOS4yMjI2NTYgNDUuMTI4OTA2IDQ1LjEyODkwNiA0MC40ODQzNzUgMTAuOTY0ODQ0IDIwMC4zMjgxMjUgMTAuOTY0ODQ0IDIwMC4zMjgxMjUgMTAuOTY0ODQ0czE2MC4yNjE3MTkgMCAyMDAuMzI4MTI1LTEwLjU0Njg3NWMyMS45MzM1OTQtNS45MDIzNDQgMzkuMjIyNjU2LTIzLjE5NTMxMiA0NS4xMjg5MDYtNDUuMTI1IDEwLjU0Mjk2OS00MC4wNjY0MDYgMTAuNTQyOTY5LTEyMy4xNDg0MzggMTAuNTQyOTY5LTEyMy4xNDg0MzhzLjQyMTg3NS04My41MDc4MTItMTAuNTQ2ODc1LTEyMy41NzAzMTJ6bTAgMCIgZmlsbD0iI2YwMCIvPjxwYXRoIGQ9Im0yMDQuOTY4NzUgMjU2IDEzMy4yNjk1MzEtNzYuNzU3ODEyLTEzMy4yNjk1MzEtNzYuNzU3ODEzem0wIDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
//               />
//               trailer
//             </button>
//             {{!
//           </a>
//           }}
//         </div>
//         <button type="button" class="modal-close-btn close">
//           {{!
//           <svg class="card__btn-close">
//             <use href="../images/svg/sprite.svg#close"></use>
//           </svg>
//           }}
//         </button>
