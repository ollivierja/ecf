
function searchMovies() {
    const title = document.getElementById('searchTitle').value;
    const year = document.getElementById('searchYear').value;
    const type = document.getElementById('type').value;

    // Effectuer la requête à l'API OMDB en utilisant Axios
    axios.get(`http://www.omdbapi.com/?apikey=f64ead7e&s=${title}&y=${year}&type=${type}`)
        .then(response => {
            // Afficher les résultats
            displayResults(response.data.Search);
        })
        .catch(error => {
            console.error('Error fetching data from OMDB:', error);
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = 'Aucun résultat trouvé.';
        return;
    }

    results.forEach(movie => {
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder_image.jpg'; // Utilisation d'une image de remplacement si le poster n'est pas disponible
        const title = movie.Title;
        const year = movie.Year;

        // Créer une carte pour chaque résultat
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Ajouter le poster, le titre et l'année à la carte
        movieCard.innerHTML = `
            <img src="${poster}" alt="${title} Poster">
            <h2>${title}</h2>
            <p>Année: ${year}</p>
        `;

        // Ajouter la carte au conteneur des résultats
        resultsContainer.appendChild(movieCard);
    });
}
