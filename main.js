const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8c08aeef16mshed4c8eb11add55cp168f96jsn1f164d2955a1',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
};

function getMovies(movies) {
    return fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${movies}`, options)
        .then(response => response.json())
        .then(data => {
            const arrayMovie = data.d;
            arrayMovie.map((element) => {
                const id = element.id;
                const title = element.l;
                const cast = element.s;
                const rank = element.rank;
                const year = element.y;
                const image = element.i.imageUrl;
                const type = element.qid;
                const cards =
                    `
                <div id="card">
                    <img src="${image}" alt="${title}"/>
                    <h3 class="title">${title}</h3>
                    <small class="id">ID: ${id} </small>
                    <div class="article">
                        <small class="small"> Rank: <span class="span">${rank}</span></small>
                        <small class="small"> Year: <span class="span">${year}</span></small>
                    </div>
                    <div class="article">
                        <p class="p"> Distribution: <span class="span">${cast}</span></p>
                    </div>
                    <div class="article">
                        <small class="small"> Type: <span class="span">${type}</span></small>
                    </div>
                    <div class="btn">
                        <a class="btnEdit" href="#"> <span class="material-symbols-outlined"> edit </a>
                        <a class="btnDelete" href="#"> <span class="material-symbols-outlined"> delete </a>
                    </div>
                 </div>
                `
                document.getElementById('cards').innerHTML += cards;

                //elimar pelicula
                const btnDelete = document.querySelectorAll('.btnDelete');
                btnDelete.forEach(element => {
                    element.addEventListener('click', function (event) {
                        event.preventDefault();
                        this.parentElement.parentElement.remove();
                    });
                });

                //editar pelicula

                function updateMovie(newTitle, newRank, newYear, newCast, newType, card) {
                    card.querySelector('.title').textContent = newTitle;
                    card.querySelector('.small span.span').textContent = newRank;
                    card.querySelectorAll('.small span.span')[1].textContent = newYear;
                    card.querySelector('p span.span').textContent = newCast;
                    card.querySelectorAll('.small span.span')[2].textContent = newType;
                }
                document.querySelectorAll('.btnEdit').forEach(function (element) {
                    element.addEventListener('click', function (event) {
                        event.preventDefault();

                        const card = element.closest('#card');
                        const newTitle = prompt('Enter new title');
                        const newRank = prompt('Enter new rank');
                        const newYear = prompt('Enter new year');
                        const newCast = prompt('Enter new Distribution');
                        const newType = prompt('Enter new type');

                        updateMovie(newTitle, newRank, newYear, newCast, newType, card);
                    });
                });
            });
        });
}
getMovies("avengers").then(() => {
    getMovies("hombre%20ara%C3%B1a");
    getMovies("joker");
});
