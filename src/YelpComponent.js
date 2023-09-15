import React, { useEffect, useState } from "react";

function YelpComponent({ eventLat, eventLang }) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/restaurant/${eventLat}/${eventLang}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data)
            })
            .catch((error) => {
                console.error("error fetching data", error)
            })
    }, [])

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
