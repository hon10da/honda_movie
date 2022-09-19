const btnAR = document.querySelector("#WatchAR");
const btnEN = document.querySelector("#WatchEN");
const movieAR = document.querySelector(".MovieAR");
const movieEN = document.querySelector(".MovieEN");
const poster = document.querySelector("#poster");
const temp = document.querySelector("#sample").content;
const movieList = document.querySelector(".movies");
const About = document.querySelector("#MovieInfo");
const releseDate = document.querySelector("#Date");
const Genreinfo = document.querySelector("#Genre");
const MovieTitle = document.querySelector("#title");
const MovieDuration = document.querySelector("#duration");
const MovieLANG = document.querySelector("#language");
const countries = document.querySelector("#countries");
const movieDB = [];
let clicks = 0;
let data;
btnAR.addEventListener("click", () => {
  movieAR.classList.toggle("active");
  movieEN.classList.remove("active");
  window.scrollTo(0, 1000);
});
btnEN.addEventListener("click", () => {
  movieEN.classList.toggle("active");
  movieAR.classList.remove("active");
  window.scrollTo(0, 1000);
});
const addMovieinfo = async (ID, img) => {
  const Data = await GetRate(ID);
  DefineMovie(Data, img);
};
const GetRate = async (ID) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${ID}?api_key=2b2380189650d658fa1a06524ae8062a`
  );
  const data = await res.json();
  const Data = data;
  return Data;
};
const DefineMovie = (Data, img) => {
  console.log(Data);
  const printgenre = () => {
    Data.genres.forEach((element) => {
      if (element.name === "Thriller") {
        Genreinfo.innerHTML += `<a href="../../movelistByGenre/thriller/thriller.html">${element.name} </a> `;
      }
      if (element.name === "Horror") {
        Genreinfo.innerHTML += `<a href="../../movelistByGenre/horror/horror.html">${element.name} </a> `;
      }
      if (element.name === "Action") {
        Genreinfo.innerHTML += `<a href="../../movelistByGenre/action/action.html">${element.name} </a> `;
      }
      if (
        element.name !== "Thriller" &&
        element.name !== "Action" &&
        element.name !== "Horror"
      ) {
        Genreinfo.innerHTML += `${element.name}  `;
      }
    });
  };
  const printCount = () => {
    Data.production_countries.forEach((element) => {
      countries.innerHTML += `${element.name}, `;
    });
  };
  poster.src = img;
  MovieLANG.innerHTML = `<span>Languages:</span>  ${Data.original_language}`;
  MovieDuration.innerHTML = `<span>Duration:</span> ${Data.runtime} min`;
  About.innerHTML =
    "A recently widowed man and his two teenage daughters travel to a game reserve in South Africa. However, their journey of healing soon turns into a fight for survival when a bloodthirsty lion starts to stalk";
  countries.innerHTML = `<span>countries:</span> `;
  printCount();
  Genreinfo.innerHTML = `<span>Genres:</span>  `;
  printgenre();
  releseDate.innerHTML = `<span>release date:</span> ${Data.release_date}`;
  MovieTitle.innerHTML = `<h1>${Data.title}</h1>`;
};
addMovieinfo(
  760741,
  "https://m.media-amazon.com/images/M/MV5BMDUxZTljNzEtNGQ5MS00YzgyLWIzNTItNGNhM2FlZDQxZDQyXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg"
);
