import React from 'react'
import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import node from '../../public/assets/gradient.png'

const Points = () => {
  return(<div>

  </div>)
}

export const Particle = () => {

  return (
    <>
      <Canvas
        legacy={false}
        camera={{position: [100,10,0], fov: 75}}
      >
        <Points/>
      </Canvas>
    </>
  )
}
