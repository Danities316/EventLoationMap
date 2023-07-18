mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaXRpZXMiLCJhIjoiY2xrOGpkdDNuMDMwdTNjbDkzYXc3Mjc4OSJ9.oI9gyV1OiWsZhPUXMyO9mg';

const defaultLongitude = 3.3792; // Longitude for Lagos
const defaultLatitude = 6.5244; // Latitude for Lagos

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 10,
            });

            // Fetch event locations from the backend (AJAX request or any other method)
            const eventLocations = [{
                    name: 'Event 1',
                    coordinates: [longitude1, latitude1]
                },
                {
                    name: 'Event 2',
                    coordinates: [longitude2, latitude2]
                },
                // Add more event locations as needed
            ];

            eventLocations.forEach((event) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat(event.coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${event.name}</h3>`))
                    .addTo(map);
            });
        },
        (error) => {
            console.error('Error getting current position:', error);
            // Fallback option if user's location cannot be retrieved
            const defaultCoordinates = [defaultLongitude, defaultLatitude];
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: defaultCoordinates,
                zoom: 10,
            });

            // Fetch event locations from the backend (AJAX request or any other method)
            const eventLocations = [{
                    name: 'Event 1',
                    coordinates: [longitude1, latitude1]
                },
                {
                    name: 'Event 2',
                    coordinates: [longitude2, latitude2]
                },
                // Add more event locations as needed
            ];

            eventLocations.forEach((event) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat(event.coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${event.name}</h3>`))
                    .addTo(map);
            });
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
    // Fallback option if geolocation is not supported
    const defaultCoordinates = [defaultLongitude, defaultLatitude];
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: defaultCoordinates,
        zoom: 10,
    });

    // Fetch event locations from the backend (AJAX request or any other method)
    const eventLocations = [{
            name: 'Event 1',
            coordinates: [longitude1, latitude1]
        },
        {
            name: 'Event 2',
            coordinates: [longitude2, latitude2]
        },
        // Add more event locations as needed
    ];

    eventLocations.forEach((event) => {
        const marker = new mapboxgl.Marker()
            .setLngLat(event.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${event.name}</h3>`))
            .addTo(map);
    });
}