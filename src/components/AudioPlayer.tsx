import React, {useEffect, useRef} from 'react'
import IAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import QingLian from '../../public/audios/QingLian.mp3'

const AudioPlayer = (props: { playPause: boolean }) => {
  const player = useRef(null)

  const HandlePlayPause = () => {
    if (props.playPause) {
      // @ts-expect-error
      player.current.audio.current.play();
    } else {
      // @ts-expect-error
      player.current.audio.current.pause();
    }
  }

  useEffect(() => {
    HandlePlayPause()
  }, [props])

  return (
    <IAudioPlayer
      ref={player}
      src={QingLian}
      autoPlay
      hasDefaultKeyBindings={false}
    />
  )
}

export default AudioPlayer
