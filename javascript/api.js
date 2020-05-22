let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
    // console.log(e);
    let searchText = e.target.value;
    searchMovie(searchText);
    //when key pressed hide text from DOM
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
});

//speech recognition
let speechRecognition = document.getElementById("speechIcon");
speechRecognition.addEventListener("click", () => {
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    let p = document.createElement("p");
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
        let transcript = e.results[0][0].transcript;
        console.log(transcript);
        search.value = transcript;
        if (e.results[0].isFinal) {
            p = document.createElement("p");
            p.innerHTML = transcript;
            let searchText = transcript;
            searchMovie(searchText);
        }
    });
    recognition.start();
});

function searchMovie(searchText) {
    // console.log(searchText);
    console.log(searchText);
    let imdbAPI = `http://www.omdbapi.com/?s=${searchText}&apikey=6695a3cc`;
    window
        .fetch(imdbAPI)
        .then((data) => {
            data
                .json()
                .then((movies) => {
                    let movie = movies.Search;
                    let output = [];
                    for (let m of movie) {
                        // console.log(m);
                        let defaultImage =
                            m.Poster === "N/A" ?
                            "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg" :
                            m.Poster;
                        output += `
                        <div>
                        <img src="${defaultImage}">
                        <h1>${m.Title}</h1>
                        <p>${m.Year}</p>
                        <a href="http://www.imdb.com/title/${m.imdbID}/" target="_blank">Movie Detail</a>
                        
                        </div>`;
                    }
                    let allImages = document.images;
                    [...allImages].forEach((img) => {
                        console.log(img);
                        if (img.src === "N/A") {
                            console.log("NOT AVAILABLE");
                        }
                    });
                    document.getElementById("template").innerHTML = output;
                })
                .catch((e) => console.log(e));
        })
        .catch((err) => console.log(err));
}