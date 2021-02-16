
const boutton = document.querySelector("#bouton");
const temp = document.querySelector("#temp");
const tableauTemperatures = [];
const tableauDates = [];
const keyword = document.querySelector('#keyword');
const villes  = document.querySelector('#villes');


async function fetchMeteo(ville) {
    //console.log(ville);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const response = await fetch(url);
    const weather = await response.json();
    //console.log(weather.main.temp - 273.15);
    getMap(weather.coord.lat, weather.coord.lon);
    // console.log(weather.coord.lat);
    // console.log(weather.coord.lon);
    temp.innerHTML = ""
    temp.innerHTML = Math.round(weather.main.temp - 273.15);

    const url5Jours = `http://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=1ce64129da731d692308f766613a1037`;
    const response2 = await fetch(url5Jours);
    const temp5Jours = await response2.json();
    // console.log(temp5Jours);
    temp5Jours.list.forEach((index) => {
        let heure = index.dt_txt.split(" ");
        if (heure[1] === "12:00:00") {
            tableauTemperatures.push(Math.round(index.main.temp - 273.15));
            tableauDates.push(index.dt_txt);
        }
    });
    getGraph(tableauDates, tableauTemperatures);
}

keyword.addEventListener('keyup', (event) => {
    //console.log(event.currentTarget.value);
    villes.innerHTML='';
    const url = 'https://places-dsn.algolia.net/1/places/query';
    

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({query: event.currentTarget.value })
    })
    .then(response => response.json())
    .then((data) => {
        const cityList = data.hits;
        const displayedCity = [];
        var displedName = "";
        let firstWord;

        cityList.forEach(ville => {
            const cityName = ville.locale_names.default[0];

            const splittedName = cityName.split(" ", 2);
            firstWord = splittedName[0];

            displedName = firstWord + " (" + ville.country_code + ")";
            
            if (!(displayedCity.includes(displedName))) {
                displayedCity.push(displedName);
                villes.insertAdjacentHTML('beforeend', `<option value="${displedName}">`);
            };
        });
        
        const options = document.querySelectorAll('#villes option');
        options.forEach(option => {
            
            keyword.addEventListener('change', (event) => {                
                cityList.forEach(city => {                    
                    var res = keyword.value.split(" ",2);
                    firstWord = res[0];            
                });
            });
        });

        keyword.addEventListener('change', (event) => {
            var villeCode = keyword.value.split(" ",2);
                const premierMot = villeCode[0];
                console.log(premierMot);
                fetchMeteo(premierMot);
        } )
    })
    .catch((e) => {
        console.log(e);
    })
});
