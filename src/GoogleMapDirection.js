/* global google */
const googleMapDirection = async (eventGeo) => {
    try {

        if (!eventGeo) {
            console.error("Missing event Geometry")
            return
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude
                const response = await fetch(`http://localhost:3000/events/direction/${userLat},${userLng}/${eventGeo}`);
                const data = await response.json();

                const bounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(
                        data.routes[0].bounds.southwest.lat,
                        data.routes[0].bounds.southwest.lng
                    ),
                    new google.maps.LatLng(
                        data.routes[0].bounds.northeast.lat,
                        data.routes[0].bounds.northeast.lng
                    )
                );

                const map = new google.maps.Map(document.getElementById('map'), {
                    center: bounds.getCenter(),
                    zoom: 14,
                });

                const polylinePoints = google.maps.geometry.encoding.decodePath(data.routes[0].overview_polyline.points);

                // Create a Polyline object to display the route on the map
                const routePolyline = new google.maps.Polyline({
                    path: polylinePoints,
                    geodesic: true,
                    strokeColor: '#FF0000', // Color of the route line
                    strokeOpacity: 2.0,
                    strokeWeight: 3,
                });

                // Set the Polyline on the map
                routePolyline.setMap(map);

                // Fit the map to the bounds
                map.fitBounds(bounds);
            })
        }

    }
    catch (error) {
        console.error('Error opening Google Maps:', error);
    }
}

export default googleMapDirection;