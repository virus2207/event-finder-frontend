import React, { useState, useEffect } from 'react';
import './App.css';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch event data from your Express API
        fetch('http://localhost:3000/events')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error('Error fetching event data:', error);
            });
    }, []);

    const initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 }, // Set the initial center of the map
            zoom: 8, // Set the initial zoom level
        });
    };

    const googleMapDirection = async (startingpoint, geometry) => {
        try {
            if (!geometry || !startingpoint) {
                console.error('Missing geometry or startingpoint.');
                return;
            }

            // Make a request to the /direction endpoint on your server
            const response = await fetch(`http://localhost:3000/events/direction/${startingpoint}/${geometry}`);
            const data = await response.json();

            // Extract the northeast and southwest coordinates from the response
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

            // Create a map centered within the bounds
            const map = new google.maps.Map(document.getElementById('map'), {
                center: bounds.getCenter(),
                zoom: 14,
            });

            // Parse the polyline points from the response
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

        } catch (error) {
            console.error('Error opening Google Maps:', error);
        }
    };

    return (

        events.map((event) => (
            <div key={event.id}> {/* Add a unique "key" prop to the enclosing element */}
                <h2>{event.name}</h2>
                <img src={event.image} alt={event.name} width="200" />
                <p><strong>Venue:</strong> {event.venue}</p>
                <p> <strong> Date:</strong> {event.date}</p>
                <p> <strong> Time:</strong> {event.time}</p>
                <p><strong>Address:</strong> {event.formatted_address}</p>
                <p><strong>Event Ticketmaster Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">Buy Tickets</a></p>


                <button onClick={() => googleMapDirection("Brisbane", event.geometry)}>Open in Google Maps</button>


            </div >
        )))
}
export default EventList;