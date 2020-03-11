window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpane = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/848c83e0a81aa317d935e64ae6e2310a/${latitude},${longitude}`;
        
        fetch(api)
            .then(response => {
                return response.json();
        })
        .then(data => {
            const {temperature, summary, icon} = data.currently;
            //Set DOM Elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //Formula for temperature changing
            let celsius = (temperature - 32)*(5/9);

            //Set icons
            setIcons(icon, document.querySelector(".icon"));

            //Change temperature co C/F
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpane.textContent === "F"){
                    temperatureSpane.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpane.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })

        });
    });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        //looks for every line and replace with underline 
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});