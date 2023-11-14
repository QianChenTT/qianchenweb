import React from 'react'
import '../stylesheets/Meme.css'
import Memes from '../resources/memeData.tsx'


const Meme = () => {
  const[stateData, setStateData] = React.useState({
    selectedMeme: "",
    upperText: "",
    bottomText: "",
  })
  const memesArray = Memes.data.memes;

  const getMemeImg = () => {
    setStateData(prevStateData => {
        return ({
          ...prevStateData,
          selectedMeme: memesArray[Math.floor(Math.random() * memesArray.length)].url
        })
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }


  return (
    <div className="meme-form-container">
      <div className="meme-form">
        <div className="form-input-container">
          <input type="text" className="form-input" placeholder="Top text" onChange={handleChange}/>
          <input type="text" className="form-input" placeholder="Bottom text" onChange={handleChange}/>
        </div>
        <button className="form-button" onClick={getMemeImg}>Get Meme Image</button>
      </div>
      <img src={stateData.selectedMeme} alt="" className="meme-image"/>
    </div>
  )
}


export default Meme;