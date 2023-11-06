var films = [
    {
        title: "Deadpool",
        year: 2016,
        author: "Tim Miller"
    },
    {
        title: "Spiderman",
        year: 2002,
        author: "Sam Raimi"
    },
    {
        title: "Scream",
        year: 1996,
        author: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        year: 2019,
        author: "Andy Muschietti"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("addButton");
    var addFormContainer = document.getElementById("addFormContainer");
    var filmTable = document.getElementById("filmTable");
    var addFilmForm = document.getElementById("addFilmForm");
    var filterBySelect = document.getElementById("filterBy");

    addButton.addEventListener("click", function () {
        addFormContainer.style.display = "block";
    });

    addFilmForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var title = document.getElementById("title").value;
        var year = document.getElementById("year").value;
        var author = document.getElementById("author").value;

        // Validation des données du formulaire
        if (validateForm(title, year, author)) {
            // Ajout du film dans le tableau
            films.push({
                title: title,
                year: parseInt(year),
                author: capitalizeFirstLetter(author)
            });

            // Affichage du message de succès
            alert("Film ajouté avec succès");

            // Actualisation du tableau
            displayFilms();
        } else {
            // Affichage du message d'erreur
            alert("Erreur dans le formulaire. Vérifiez les données saisies.");
        }
    });

    // Écouteur d'événement pour le changement d'option de filtrage
    filterBySelect.addEventListener("change", function () {
        var selectedOption = filterBySelect.value;

        // Trier les films en fonction de l'option sélectionnée
        if (selectedOption === "title") {
            films.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
        } else if (selectedOption === "year") {
            films.sort(function (a, b) {
                return b.year - a.year;
            });
        }

        // Actualiser le tableau
        displayFilms();
    });

    // Initialisation de l'affichage des films
    displayFilms();

    // Fonction pour afficher les films dans le tableau
    function displayFilms() {
        // Effacer les lignes existantes du tableau
        var tbody = filmTable.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

        // Afficher les films dans le tableau
        films.forEach(function (film) {
            var row = tbody.insertRow(-1);
            var titleCell = row.insertCell(0);
            var yearCell = row.insertCell(1);
            var authorCell = row.insertCell(2);
            var actionCell = row.insertCell(3);

            titleCell.innerHTML = film.title;
            yearCell.innerHTML = film.year;
            authorCell.innerHTML = film.author;

            // Bouton Supprimer
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Supprimer";
            deleteButton.className = "delete-button"; // Ajout de la classe delete-button
            deleteButton.addEventListener("click", function () {
                confirmDelete(film);
            });
            actionCell.appendChild(deleteButton);
        });
    }

    // Fonction pour valider le formulaire
    function validateForm(title, year, author) {
        // Validation du titre (minimum 2 caractères)
        if (title.length < 2) {
            return false;
        }

        // Validation de l'année (format de l'année à 4 chiffres compris entre 1900 et l'année en cours)
        var currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1900 || year > currentYear) {
            return false;
        }

        // Validation de l'auteur (minimum de 5 caractères)
        if (author.length < 5) {
            return false;
        }

        return true;
    }

    // Fonction pour afficher une alerte de confirmation avant de supprimer un film
    function confirmDelete(film) {
        var confirmMessage = "Confirmez-vous la suppression de \"" + film.title + "\"?";
        if (confirm(confirmMessage)) {
            // Supprimer le film de la liste
            films = films.filter(function (f) {
                return f !== film;
            });

            // Actualiser le tableau
            displayFilms();
        }
    }

    // Fonction pour mettre la première lettre d'une chaîne en majuscule
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
