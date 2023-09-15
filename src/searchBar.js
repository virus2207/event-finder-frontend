import { useState } from "react"
import './App.css'


export default function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("")


    return (

        <div className="container">

            <input
                aria-labelledby="search-button"
                //id="input"
                type="search"
                className="inputSearch"

                placeholder="Input City"
                value={innerSearch}
                onChange={e => {
                    setInnerSearch(e.target.value)

                }}

            />

            <button
                className="Button"
                id="Search-button"
                type="button"
                placeholder="Search"
                onClick={() => props.onSubmit(innerSearch)}
            > Search

            </button>

        </div>
    );
}
