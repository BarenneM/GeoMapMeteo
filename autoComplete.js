function autoComplete() {
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
}