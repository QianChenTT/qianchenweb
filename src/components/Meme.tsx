// import React from 'react'
// import '../stylesheets/Meme.css'
// import Memes from '../resources/memeData.tsx'
//
//
// const Meme = () => {
//   const[stateData, setStateData] = React.useState({
//     selectedMeme: "",
//     upperText: "",
//     bottomText: "",
//   })
//   const memesArray = Memes.data.memes;
//
//   const getMemeImg = () => {
//     setStateData(prevStateData => {
//         return ({
//           ...prevStateData,
//           selectedMeme: memesArray[Math.floor(Math.random() * memesArray.length)].url
//         })
//     })
//   }
//
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {name, value} = event.target
//     setStateData(prevStateData => {
//       return({
//         ...prevStateData,
//         [name]: value
//       })
//     })
//   }
//
//
//   return (
//     <div className="meme-form-container">
//       <div className="meme-form">
//         <div className="form-input-container">
//           <input
//             type="text"
//             className="form-input"
//             placeholder="Top text"
//             onChange={handleChange}
//             name="upperText"
//             value={stateData.upperText}
//           />
//           <input
//             type="text"
//             className="form-input"
//             placeholder="Bottom text"
//             onChange={handleChange}
//             name="bottomText"
//             value={stateData.bottomText}
//           />
//         </div>
//         <button className="form-button" onClick={getMemeImg}>Get Meme Image</button>
//       </div>
//       <div className="created-meme">
//         <img src={stateData.selectedMeme} alt="" className="meme-image"/>
//         <h3 className="uppertext">{stateData.selectedMeme === "" ? "":stateData.upperText}</h3>
//         <h3 className="bottomtext">{stateData.selectedMeme === "" ? "":stateData.bottomText}</h3>
//       </div>
//     </div>
//   )
// }
//
//
// export default Meme;