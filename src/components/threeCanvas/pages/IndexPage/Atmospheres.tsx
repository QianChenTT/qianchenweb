import AtmosphereParticle from '../../THREE/atmosphere.ts';
import * as THREE from 'three';
import Tween from '@tweenjs/tween.js';
import { BufferGeometry } from 'three';
import { useEffect, useRef, useState } from 'react';

export const Atmosphere = () => {
  let needShake = false;
  const [animating, setAnimating] = useState(false);
  const animatingRef = useRef(animating);

  // Shaking function
  const shaking = (Point: THREE.Points<BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>) => {
    Point.rotation.x += Math.random() * 0.005 - 0.0025;
    Point.rotation.y += Math.random() * 0.005 - 0.0025;
    Point.rotation.z += Math.random() * 0.005 - 0.0025;
  };

  // Function to update the position and rotation
  const updateParticle = (particle: any, duration = 10000) => {
    const newPosition = {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      z: (Math.random() - 0.5) * 200
    };

    new Tween.Tween(particle.position)
      .to(newPosition, duration)
      .easing(Tween.Easing.Linear.None)
      .start()
      .onStart(() => setAnimating(true))
      .onComplete(() => setAnimating(false));
  };

  useEffect(() => {
    animatingRef.current = animating;
  }, [animating]);

  const createAtmosphere = () => {
    return new AtmosphereParticle({
      longestDistance: 1500,
      particleSum: 600,
      renderUpdate: (Point) => {
        if (!animatingRef.current) {
          updateParticle(Point);
          Tween.update();
        }
        if (needShake) {
          shaking(Point);
        }
      },
      callback: (Point) => {},
      onChangeModel: (Point) => {
        needShake = true;
        setTimeout(() => { needShake = false }, 1000);
      }
    });
  };

  const Atmosphere1 = createAtmosphere();
  const Atmosphere2 = createAtmosphere();
  const Atmosphere3 = createAtmosphere();

  return [Atmosphere1, Atmosphere2, Atmosphere3];
}
