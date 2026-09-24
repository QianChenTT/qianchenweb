import React, {useEffect, useRef} from 'react'
import IAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import QingLian from '../../public/audios/QingLian.mp3'

const AudioPlayer = (props: { playPause: boolean }) => {
  const player = useRef<IAudioPlayer>(null)
  const { playPause } = props

  useEffect(() => {
    const audio = player.current?.audio.current
    if (!audio) return            // not mounted yet: nothing to do

    if (playPause) {
      audio.play().catch(() => {
        // blocked by browser autoplay policy until the user interacts
      })
    } else {
      audio.pause()
    }
  }, [playPause])

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
