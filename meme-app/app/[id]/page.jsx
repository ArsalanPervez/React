"use client";

import React, { useState, useEffect } from "react";

const SingleMeme = ({ searchParams  }) => {
    const resolvedSearchParams = React.use(searchParams);
    const [singleMeme, setSingleMeme] = useState({
        id: resolvedSearchParams.id,
        url: resolvedSearchParams.url,
        topText: "",
        bottomText: "",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSingleMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const downloadMeme = async (event) => {
    event.preventDefault();
  
    const data = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${singleMeme?.id}&username=ArsalanPervez&password=tf@7i53FJb8qD!P&text0=${singleMeme?.topText}&text1=${singleMeme?.bottomText}`,
      {
        method: "POST",
      }
    );
    const response = await data.json();
    if (response.success) {
      const imageUrl = response.data.url;
      console.log("Image URL: ", imageUrl);
  
      // Fetch the image as a Blob
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
  
      // Create a download link from the Blob URL
      const link = document.createElement("a");
      link.href = URL.createObjectURL(imageBlob);
      link.download = `meme-${singleMeme.id}.jpg`; // Set the filename
  
      // Trigger the download by simulating a click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      singleMeme.topText = "";
      singleMeme.bottomText = "";
    } else {
      console.error("Failed to create meme: ", response.error_message);
    }
  };
  


  return (
    <div className="container w-full mx-auto mt-10 flex flex-wrap gap-10 justify-center items-start">
      {/* Meme Display Section */}
      <div className="meme-display w-1/2 flex justify-center">
        <div className="relative">
          <img
            src={singleMeme?.url}
            alt="meme"
            className="w-full h-auto border rounded shadow-md"
          />
          <h2 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold uppercase text-center"
            style={{
                color: '#fff',
                fontFamily: 'impact, sans-serif',
                fontSize: '3em',
                letterSpacing: '1px',
                textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000',
                textTransform: 'uppercase',
          }}
          >
            {singleMeme.topText}
          </h2>
          <h2 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold uppercase text-center"
          style={{
                color: '#fff',
                fontFamily: 'impact, sans-serif',
                fontSize: '3em',
                letterSpacing: '1px',
                textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000',
                textTransform: 'uppercase',
            }}
          >
            {singleMeme.bottomText}
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="meme-form w-1/3 p-5 bg-gray-100 border rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-5">Customize Your Meme</h2>
        <div className="mb-4">
          <label htmlFor="topText" className="block text-lg font-medium mb-2">
            Top Text
          </label>
          <input
            type="text"
            id="topText"
            name="topText"
            value={singleMeme.topText}
            onChange={handleChange}
            placeholder="Enter top text"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bottomText" className="block text-lg font-medium mb-2">
            Bottom Text
          </label>
          <input
            type="text"
            id="bottomText"
            name="bottomText"
            value={singleMeme.bottomText}
            onChange={handleChange}
            placeholder="Enter bottom text"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={downloadMeme}
          className="w-full p-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-200"
        >
          Download Meme
        </button>
      </div>
    </div>
  );
};

export default SingleMeme;