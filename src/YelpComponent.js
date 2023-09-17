import React, { useEffect, useState } from "react";
import { fetchConfig } from "./utils/fetchConfig";

function YelpComponent({ eventLat, eventLang }) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendURL = await fetchConfig();
                console.log(backendURL);

                const response = await fetch(`${backendURL}/restaurant/${eventLat}/${eventLang}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        // Call the asynchronous function to fetch data
        fetchData();
    }, []);

    return (
        <div>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className=" restaurant-card">
                        <h2>{restaurant.name}</h2>
                        <img src={restaurant.image_url} alt={restaurant.name} width="200" />
                        <p>Rating: {restaurant.rating}</p>
                        <p>Distance: {restaurant.distance} meter</p>
                        <p> Price : {restaurant.price}</p>
                        <p>Address: {restaurant.address}</p>
                        <p>Visit Store Website: <a href={restaurant.url} target="_blank" rel="noopener noreferrer"> Click Here</a></p>

                    </div>

                ))}
            </div>
        </div>
    );
}

export default YelpComponent;
