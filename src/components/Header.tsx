import React from 'react'
import '../stylesheets/Header.css'

const Header = () => {
  //subtitle typing effect starts here
  const [displayText, setDisplayText] = React.useState('');
  const [subtitleIndex, setSubtitleIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  const subtitles = [
    "Computer Engineering",
    "University Of Waterloo",
    "Cyber Security"
  ];

  const baseTypingSpeed = 100;

  React.useEffect(() => {
    const currentDisplay = subtitles[subtitleIndex];
    console.log(currentDisplay);
    const printTimeouts: (number | undefined)[] = [];
    for(let i = 0; i < currentDisplay.length; i++){
      const typeDisplay = setTimeout(() => {
        setDisplayText(prev => {return prev + currentDisplay[i]});
      }, i * baseTypingSpeed)
      printTimeouts.push(typeDisplay)
    }

    for(let i = 0; i < currentDisplay.length; i++){
      const typeDisplay = setTimeout(() => {
        setDisplayText(prev => {return prev.slice(0, prev.length -1)});
      }, i * baseTypingSpeed + 2000 + 2000)
        printTimeouts.push(typeDisplay)
    }

    const timeoutId = setTimeout(() => {
      setSubtitleIndex(prev => {return ((prev + 1) % subtitles.length)});
    },2 * (currentDisplay.length - 1) * baseTypingSpeed + 2000 + 1000)

    printTimeouts.push(timeoutId)

    return () => {
      printTimeouts.forEach(clearTimeout)
    }
  }, [subtitleIndex]);

  // React.useEffect(() => {
  //   // Typing effect for each subtitle
  //   if (charIndex < subtitles[subtitleIndex].length) {
  //     const timeoutId1 = setTimeout(() => {
  //       setDisplayText((prev) => prev + subtitles[subtitleIndex][charIndex]);
  //       setCharIndex(charIndex + 1);
  //     }, 100);
  //
  //     return () => clearTimeout(timeoutId1);
  //   } else {
  //     if(displayText.length === 0){
  //       setCharIndex(0)
  //       setSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
  //     }
  //     const timeoutId3 = setTimeout(() => {
  //       setDisplayText((prev) => prev.slice(0, prev.length - 1));
  //     },100)
  //
  //     return () => clearTimeout(timeoutId3);
  //   }
  //
  // }, [charIndex, subtitleIndex, displayText.length]);
  //subtitle typing effect ends here

  return (
    <>
      <div className="header">
        <h1 className="header-title">
          Han
        </h1>
        <h2 className="header-subtitle">
          {displayText}
        </h2>
      </div>
    </>
  )
}

export default Header;



//Meme Generator Header
{/*<img src="/assets/brand-logo.png" alt="" className="header-brand-logo"/>*/}
{/*<div className="header-text">Meme Generator</div>*/}