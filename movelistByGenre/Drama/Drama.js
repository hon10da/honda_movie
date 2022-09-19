const temp = document.querySelector("#sample").content; //the movie template
const movieList = document.querySelector(".movies"); //the container of movies
const input = document.querySelector("#SearchBar"); //search bar
const GenreShow = document.querySelector("#GenreShow");
const GenreList = document.querySelector(".GenreList");
const yearList = document.querySelector(".yearList");
const List = document.querySelector(".List");
const HighRate = document.querySelector("#HighRate"); //order by high rating
const New = document.querySelector("#New"); //movies that came this year
const Year = document.querySelector("#Year"); //order by year
const series = document.querySelector("#series"); //show series only
const movies = document.querySelector("#movies"); //show movies only
const movieDB = []; //the whole database of the movie
const apiPoster = "https://image.tmdb.org/t/p/w500/"; //the api for poster add the id after it
const years = [
  2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
]; //years that show in yearlist
let movieInfo = {}; //stores each movie individually as an object
let flitered = []; //useful later
function hidelist() {
  yearList.classList.toggle("active");
}
//flitering methoeds
//by year
//shows the year list
Year.addEventListener("click", () => {
  List.innerHTML = ``;
  yearList.classList.toggle("active");
  years.forEach((element) => {
    List.innerHTML += `<li><button onclick="releaseYear(
      ${element}
      );hidelist()">${element}</button></li>`;
  });
});
//fliters the movie
const releaseYear = (Year) => {
  ClearingList(); //clearing the list
  movieDB.forEach((element) => {
    //looping over the movie database
    if (element.Date.includes(Year)) {
      NewList(
        //calls the new list function
        element.ID, //useful for the api only
        element.path, //useful for the card
        element.Genre, //useful for the card
        element.type //movie or tv useful for the api only
      );
    }
  });
};
//shows the 2022 movies/shows only
New.addEventListener("click", () => {
  releaseYear(2022);
});
//shows movies only. not tv shows
movies.addEventListener("click", () => {
  ClearingList(); //clearing the list
  movieDB.forEach((element) => {
    //looping over the movie database
    if (element.type === "movie") {
      NewList(
        //calls the new list function
        element.ID, //useful for the api only
        element.path, //useful for the card
        element.Genre, //useful for the card
        element.type //MOVIES only
      );
    }
  });
});
//shows tv shows only not movies
series.addEventListener("click", () => {
  ClearingList(); //clearing the list
  movieDB.forEach((element) => {
    //looping over the movie database
    if (element.type === "tv") {
      NewList(
        //calls the new list function
        element.ID, //useful for the api only
        element.path, //useful for the card
        element.Genre, //useful for the card
        element.type //tv  only
      );
    }
  });
});
//by rate. above 7 will show
HighRate.addEventListener("click", () => {
  Sort();
});
//sorting function ONLY USED IN HIGHRATE
const Sort = async () => {
  ClearingList(); //clearing the list
  movieDB.forEach((element) => {
    //looping over the movie database
    if (element.Rating > 7) {
      NewList(
        //calls the new list function
        element.ID, //useful for the api only
        element.path, //useful for the card
        element.Genre, //useful for the card
        element.type //MOVIES or shows only
      );
    }
  });
};
//search function
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    // if the user presses enter
    const searchString = e.target.value;
    if (e.target.value === "") {
      document.location.reload(); //if the search bar is empty and user pressed enter the page will relod
    } else {
      flitered = []; //empties the flitred list which will be the new database
      for (let item of movieDB) {
        //loops over the database
        if (item.Name.toUpperCase().includes(searchString.toUpperCase())) {
          flitered.push(item); //pushes the whole movie object that matches
        }
      }
      if (flitered.lengh <= 0) {
        //if the new database is empty
        alert("no movie found");
      } else {
        //if not clear the list and print the new elements
        ClearingList();
        flitered.forEach((element) => {
          addMovie(
            //main function for printing out the movies
            element.ID, //api
            `movieList/${element.Name}/${element.Name}.html`, //card
            element.Genre, //card
            element.type
          );
        });
      }
    }
  }
});
const ClearingList = () => {
  //empties the whole list of movies
  while (movieList.firstChild) {
    movieList.removeChild(movieList.lastChild);
  }
};

const NewList = async (ID, Path, genre, type) => {
  const Data = await GetRate(ID, type); //gets the api
  if (type === "tv") {
    UpdateUI(
      apiPoster + Data.poster_path,
      Data.vote_average,
      Data.original_name,
      Path,
      genre,
      ID,
      Data.first_air_date,
      type
    );
  } else {
    UpdateUI(
      apiPoster + Data.poster_path,
      Data.vote_average,
      Data.title,
      Path,
      genre,
      ID,
      Data.release_date
    );
  }
};
const addMovie = async (ID, Path, genre, type) => {
  const Data = await GetRate(ID, type);
  console.log(Data);
  UpdateUI(
    apiPoster + Data.poster_path,
    Data.vote_average,
    Data.title,
    Path,
    genre,
    ID,
    Data.release_date,
    type
  );
  movieDB.push(movieInfo);
};
const addShow = async (ID, Path, genre, type) => {
  const Data = await GetRate(ID, type);
  console.log(Data);
  UpdateUI(
    apiPoster + Data.poster_path,
    Data.vote_average,
    Data.original_name,
    Path,
    genre,
    ID,
    Data.first_air_date,
    type
  );
  movieDB.push(movieInfo);
};
const GetRate = async (ID, type) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${ID}?api_key=2b2380189650d658fa1a06524ae8062a`
  );
  const Data = await res.json();
  return Data;
};
const UpdateUI = (
  Poster,
  Rating,
  Name,
  Path,
  genre,
  ID,
  release_date,
  type
) => {
  const copyTemp = document.importNode(temp, true);
  copyTemp.querySelector(".Poster").innerHTML = `<img
src = ${Poster}>`;
  copyTemp.querySelector("#rating").innerHTML = `${Rating.toFixed(1)}`;
  copyTemp.querySelector("#link").innerHTML = `
<a href="../../movielist/${Path}/${Path}.html">${Name}</a>`;
  copyTemp.querySelector(".genre").innerHTML = `
  ${genre}`;
  copyTemp.querySelector("#releaseDate").innerHTML = release_date;
  copyTemp.querySelector("#Watch").innerHTML = `
  <a href="../../movielist/${Path}/${Path}.html">Watch Now</a>`;
  movieList.appendChild(copyTemp);
  movieInfo = {};
  movieInfo.Name = Name;
  movieInfo.type = type;
  movieInfo.Poster = Poster;
  movieInfo.Rating = Rating;
  movieInfo.Genre = genre;
  movieInfo.ID = ID;
  movieInfo.path = Path;
  movieInfo.Date = release_date;
  return movieInfo;
};
GenreShow.addEventListener("click", () => {
  //shows the genre list
  GenreList.classList.toggle("active");
});
addMovie(807196, "Boiling Point", "Drama", "movie");
addMovie(776305, "Belle", "animation", "movie");
