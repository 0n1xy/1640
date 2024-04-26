'use client'
import { styled } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './page.css';

function App() {

  const [urlsToDisplay, setUrlsToDisplay] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // Link to Unsplash Search API Documentation: https://unsplash.com/documentation#search-photos
  async function getUnsplashPhotos() {
    try {
      //IMPORTANT! Update the below variable with your own api key!!
      const apiKey = 'TQ4LmzPzREvcfacfbOJGjAu8sZ5QB4kfQNAsuXW84XY';

      //making unsplash api call to search for photos based on search query
      let resp = await axios.get(`https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${searchQuery}&per_page=15`);
      console.log(21, resp.data.results);
      //store the array of results into urlsToDisplay variable
      setUrlsToDisplay(resp.data.results);
    } catch (e) {
      console.log(e);
    }

  }



  return (
    <>
      <div className="fullscreen">
        <div className="center">
          {/* Input box where user types in search query */}
          <input placeholder='Enter Search Query' onChange={(e) => {
            // Upate searchQuery variable with what user types into input box
            setSearchQuery(e.target.value);
          }} />
          <button onClick={getUnsplashPhotos}>
            Submit
          </button>
        </div>
        <div className="row">
          {/* Looping through the urlsToDisplay array to get each image url to display */}
          {urlsToDisplay.map((image) => {
            return <div key={image}>
              {/* Display image based on results we get back from unsplash api */}
              <img src={image.urls.small} />
            </div>
          })}
        </div>
      </div>
    </>

  );
}

export default App;