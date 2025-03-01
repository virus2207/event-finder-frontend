/* global google */
import React, { useState, useEffect } from 'react';
import './App.css';
import googleMapDirection from './GoogleMapDirection';
import YelpComponent from './YelpComponent';
import { fetchConfig } from './utils/fetchConfig';


function EventList({ city }) {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRestaurants, setShowRestaurants] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [pageCount, setPageCount] = useState(0); // Initialize the page count

    // useEffect(() => {
    //     // Fetch the page count from your server

    const fetchPageCount = async () => {
        try {
            const backendURL = await fetchConfig();
            const response = await fetch(`${backendURL}/getPageCount`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPageCount(data.count);

        } catch (error) {
            console.error('Error fetching page count:', error);
        }
    };

    // Call the function to fetch the page count




    useEffect(() => {

        const fetchData = async () => {
            try {
                const backendURL = await fetchConfig();
                console.log(backendURL)
                // Now we have the backendURL, we can make fetch requests to it
                const response = await fetch(`${backendURL}/events/${city}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        // Call the asynchronous function to fetch data
        fetchData();

    }, [city]);

    useEffect(() => {
        fetchPageCount();
    }, []);

    const openGoogleMap = (event) => {
        // setSelectedEvent(event);
        // googleMapDirection(event.geometry);

        if (selectedEvent && selectedEvent.id === event.id) {
            // If the same event's button is clicked again, toggle the map visibility
            setShowMap(!showMap);
        } else {
            setSelectedEvent(event);
            setShowMap(true);
            googleMapDirection(event.geometry);
        }
    }

    const toggleShowRestaurants = (event) => {

        if (selectedEvent && selectedEvent.id === event.id) {
            setShowRestaurants(!showRestaurants); // Toggle the state for showing/hiding restaurants
        } else {

            setSelectedEvent(event);
            setShowRestaurants(true)
        }
    }

    return (

        <div className='event-container'>

            {/* Display the page count */}
            <p>Page Count: {pageCount}</p>

            {events.map((event) => (
                <div className='event-details' key={event.id}> {/* a unique "key" prop to the enclosing element */}
                    <h2>{event.name}</h2>
                    <img src={event.image} alt={event.name} width="200" />
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p> <strong> Date:</strong> {event.date}</p>
                    <p> <strong> Time:</strong> {event.time}</p>
                    <p><strong>Address:</strong> {event.formatted_address}</p>
                    <p><strong>Event Ticketmaster Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">Buy Tickets</a></p>

                    <button onClick={() => toggleShowRestaurants(event)}>
                        {selectedEvent && selectedEvent.id === event.id && showRestaurants
                            ? 'Hide Restaurants'
                            : 'show Restaurants'}
                    </button>
                    <button onClick={() => openGoogleMap(event)}>Open in Google Maps</button>

                    {selectedEvent && selectedEvent.id === event.id && showMap && (
                        <div id="map" style={{ width: '100%', height: '400px' }}>
                            {/* Render the map here for the selected event */}
                        </div>
                    )}

                    {/* Render the YelpComponent conditionally based on the button click */}

                    {selectedEvent && selectedEvent.id === event.id && showRestaurants && (
                        <YelpComponent eventLat={event.latitude} eventLang={event.longitude} />
                    )}


                </div >
            ))}

        </div>
    )
}
export default EventList;