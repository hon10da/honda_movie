const btnAR = document.querySelector("#WatchAR");
const btnEN = document.querySelector("#WatchEN");
const movieAR = document.querySelector(".MovieAR");
const movieEN = document.querySelector(".MovieEN");
const poster = document.querySelector("#poster");
const movieList = document.querySelector(".movies");
const About = document.querySelector("#MovieInfo");
const releseDate = document.querySelector("#Date");
const Genreinfo = document.querySelector("#Genre");
const MovieTitle = document.querySelector("#title");
const MovieDuration = document.querySelector("#duration");
const MovieLANG = document.querySelector("#language");
const countries = document.querySelector("#countries");
const season = document.querySelector(".Season");
const eplist = document.querySelector(".epLIST");
const WatchingNow = document.querySelector(".info");
const movieDB = [];
const apiPoster = "https://image.tmdb.org/t/p/w500/";
let clicks = 0;
let Data;
let SeasonData;
let s9DB = [
  "0",
  "https://vadbam.com/embed-8ax4hjc4450z.html",
  "https://vadbam.com/embed-3lunv4pd3w6q.html",
  "https://vadbam.com/embed-78tagwz6kon2.html",
  "https://vadbam.com/embed-n5b2bmuziahq.html",
  "https://vadbam.com/embed-1b5h9vtaoj70.html",
  "https://vadbam.com/embed-vybsdlo4lc47.html",
  "https://vadbam.com/embed-th56kv3s0d0f.html",
  "https://vadbam.com/embed-w6x9xlqkz8mt.html",
  "https://vadbam.com/embed-rzisoesjkrai.html",
  "https://vadbam.com/embed-3y8viv7loskr.html",
  "https://vadbam.com/embed-3bhro3tpdnrc.html",
  "https://vadbam.com/embed-qdrw5bn2s1kk.html",
  "https://vadbam.com/embed-jk0010qz8yh2.html",
  "https://vadbam.com/embed-uq4afexnhvd6.html",
  "https://vadbam.com/embed-f097xq90ll63.html",
  "https://vadbam.com/embed-2lmuyi4jksn3.html",
  "https://vadbam.com/embed-p54fa89i7wlm.html",
  "https://vadbam.com/embed-uj8tn22q99zv.html",
  "https://vadbam.com/embed-ve0hhpg0bugg.html",
  "https://vadbam.com/embed-ld6pzpn2ret7.html",
  "https://vadbam.com/embed-j4peaypq1tre.html",
  "https://vadbam.com/embed-watxy0don4an.html",
  "https://vadbam.com/embed-4966oo0xd980.html",
  "https://vadbam.com/embed-sv490r8ar01b.html",
  "",
  "",
  "",
  "",
];
let s8DB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let s1DB = [];
let s2DB = [];
let s3DB = [];
let s4DB = [];
let s5DB = [];
let s6DB = [];
let s7DB = [];
let DataBase;
btnAR.addEventListener("click", () => {
  season.classList.add("animations");
});
// btnEN.addEventListener("click", () => {
//   movieEN.classList.toggle("active");
//   movieAR.classList.remove("active");
//   window.scrollTo(0, 1000);
// });
const addMovieinfo = async (ID, img) => {
  const Data = await GetRate(ID);
  DefineMovie(Data, img);
};
const GetRate = async (ID) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${ID}?api_key=2b2380189650d658fa1a06524ae8062a`
  );
  const data = await res.json();
  Data = data;
  return Data;
};
const printCount = () => {
  Data.origin_country.forEach((element) => {
    countries.innerHTML += `${element}, `;
  });
};
const printSeasons = () => {
  Data.seasons.shift();
  Data.seasons.forEach((element) => {
    season.innerHTML += `<li><button onclick="GetSeasonData(${Data.seasons.indexOf(
      element
    )})">${element.name}</button></li> `;
  });
};
const printEP = () => {
  Data.seasons.shift();
  Data.seasons.forEach((element) => {
    eplist.innerHTML += `<li><button onclick="showSeason(${Data.seasons.indexOf(
      element
    )})">${element.name}</button></li> `;
  });
};
const DefineMovie = (Data) => {
  const printgenre = () => {
    Data.genres.forEach((element) => {
      switch (element.name) {
        case "Thriller":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/thriller/thriller.html">${element.name} </a> `;
          break;
        case "Horror":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/horror/horror.html">${element.name} </a> `;
          break;
        case "Action":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/action/action.html">${element.name} </a> `;
          break;
        case "Animation":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/Animation/Animation.html">${element.name} </a> `;
          break;
        case "Drama":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/Drama/Drama.html">${element.name} </a> `;
          break;
        case "Comedy":
          Genreinfo.innerHTML += `<a href="../../movelistByGenre/Comedy/Comedy.html">${element.name} </a> `;
          break;
        default:
          Genreinfo.innerHTML += `${element.name} `;
          break;
      }
    });
  };
  poster.src = apiPoster + Data.poster_path;
  MovieLANG.innerHTML = `<span>Languages:</span>  ${Data.original_language}`;
  MovieDuration.innerHTML = `<span>Duration:</span> ${Data.episode_run_time} min`;
  About.innerHTML = `<span>Overview:</span> ${Data.overview}`;
  countries.innerHTML = `<span>countries:</span> `;
  printCount();
  Genreinfo.innerHTML = `<span>Genres:</span>  `;
  printgenre();
  releseDate.innerHTML = `<span>release date:</span> ${Data.first_air_date}`;
  MovieTitle.innerHTML = `<h1>${Data.name}</h1>`;
  printSeasons();
  printEP();
};

const GetSeasonData = async (number) => {
  let season = number + 1;
  await FetchSeasonData(season);
  eplist.classList.remove("animations");
  eplist.classList.add("animations");
  await PrintSeason();
};
const FetchSeasonData = async (season) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${Data.id}/season/${season}?api_key=2b2380189650d658fa1a06524ae8062a`
  );
  const data = await res.json();
  SeasonData = data;
  switch (SeasonData.season_number) {
    case 1:
      DataBase = s1DB;
      break;
    case 2:
      DataBase = s2DB;
      break;
    case 3:
      DataBase = s3DB;
      break;
    case 4:
      DataBase = s4DB;
      break;
    case 5:
      DataBase = s5DB;
      break;
    case 6:
      DataBase = s6DB;
      break;
    case 7:
      DataBase = s7DB;
      break;
    case 8:
      DataBase = s8DB;
      break;
    case 9:
      DataBase = s9DB;
      break;
    default:
      break;
  }
  return SeasonData;
};
const PrintSeason = async () => {
  eplist.innerHTML = ``;
  SeasonData.episodes.pop();
  SeasonData.episodes.pop();

  SeasonData.episodes.forEach((element) => {
    eplist.innerHTML += `<li><button onclick="ShowEpisode(${element.episode_number})">${element.episode_number}</button></li>`;
  });
};
const ShowEpisode = (num) => {
  console.log(SeasonData.season_number);
  console.log(DataBase[num]);
  movieAR.src = DataBase[num];
  movieAR.classList.add("active");
  WatchingNow.style.display = "flex";
  WatchingNow.innerHTML = `you are now watching episode:<span>${num}</span>`;
};
addMovieinfo(59186);
