import React, { useEffect, useState } from "react";

import "./Meme.css";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = useState();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data));
  }, []);

  function getMemeImage() {
    const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prev) => ({ ...prev, randomImage: url }));
  }

  function handleChange(event) {
    setMeme((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  console.log(meme.randomImage);

  return (
    <main className="meme">
      <div className="meme--form">
        {meme.randomImage && (
          <input
            type="text"
            placeholder="Top text"
            className="meme--input"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        )}

        {meme.randomImage && (
          <input
            type="text"
            placeholder="Bottom text"
            className="meme--input"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        )}

        <button className="meme--btn" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>

      <div className="meme--container">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
