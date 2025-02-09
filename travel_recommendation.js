document.addEventListener('DOMContentLoaded', function () {
    let jsonData = null;

    // Fetch JSON data
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
            console.log("JSON Data Loaded:", jsonData);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    function searchPlace() {
        // Ensure JSON data is loaded
        if (!jsonData) {
            console.error("JSON data not loaded yet!");
            return;
        }

        const searchInput = document.getElementById('search');
        const resultDiv = document.getElementById('result');
        if (!searchInput) {
            console.error("Search input field not found!");
            return;
        }
        resultDiv.style.display = "block"; 
        resultDiv.innerHTML = "";
        const input = searchInput.value.toLowerCase();
        let foundItems = [];

        // Handle direct "beach" or "beaches" search
        if (input === 'beach' || input === 'beaches') {
            let beachesHTML = jsonData.beaches.map(beach => `
                <div class="HTML-result">
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                    <h2>${beach.name}</h2>
                    <p>${beach.description}</p>
                </div>
            `).join('');
            resultDiv.innerHTML = beachesHTML;
            return;
        }
        if (input === 'beach' || input === 'beaches') {
            let beachesHTML = jsonData.beaches.map(beach => `
                <div class="HTML-result">
                    <img src="${beach.imageUrl}" alt="${beach.name}" width="200">
                    <h2>${beach.name}</h2>
                    <p>${beach.description}</p>
                </div>
            `).join('');
            resultDiv.innerHTML = beachesHTML;
            return;
        }
        if (input === 'country' || input === 'countries') {
            let countriesHTML = jsonData.countries.map(country =>
                country.cities.map(city => `
                    <div class="HTML-result">
                        <img src="${city.imageUrl}" alt="${city.name}" width="200">
                        <h2>${city.name}</h2>
                        <p>${city.description}</p>
                    </div>
                `).join('')
            ).join(''); 
        
            resultDiv.innerHTML = countriesHTML;
            return;
        }
        if (input === 'temple' || input === 'temples') {
            let templesHTML = jsonData.temples.map(temple => `
                <div class="HTML-result">
                    <img src="${temple.imageUrl}" alt="${temple.name}" width="200">
                    <h2>${temple.name}</h2>
                    <p>${temple.description}</p>
                </div>
            `).join('');
            resultDiv.innerHTML = templesHTML;
            return;
        }

        jsonData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(input)) {
                    foundItems.push(city);
                }
            });
        });

        jsonData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(input)) {
                foundItems.push(temple);
            }
        });

        jsonData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(input)) {
                foundItems.push(beach);
            }
        });

        if (foundItems.length > 0) {
            resultDiv.innerHTML = foundItems.map(place => `
                <div class="HTML-result">
                    <img src="${place.imageUrl}" alt="${place.name}" width="200">
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                </div>
            `).join('');
        } else {
            resultDiv.innerHTML = "<p>No results found.</p>";
        }
    }

    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            searchPlace();
        });
    } else {
        console.error("Search form not found!");
    }

    document.querySelector(".bttn1").addEventListener("click", () => { 
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ""; 
        resultDiv.style.display = "none";
    });
});
