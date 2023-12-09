import * as React from 'react'
import Container from 'react-bootstrap/Container'
import ParticleSystem from '../../THREE'
import { useEffect, useRef, useState } from 'react'
import AtmosphereParticle from '../../THREE/atmosphere.ts'
import { ParticleModelProps } from '../../declare/THREE'
import Tween from '@tweenjs/tween.js'
import GetFlatGeometry from '../../utils/GetFlatGeometry.ts'
import { BufferGeometry, Float32BufferAttribute } from 'three'
import VerticesDuplicateRemove from '../../utils/VerticesDuplicateRemove.ts'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'
import { Models } from './Models.tsx'
import { Atmosphere } from './Atmospheres.tsx';

function IndexPage({ name, time }: { name: string, time: number }) {
  const wrapper = useRef<HTMLDivElement | null>(null)
  const mainParticleRef = useRef<ParticleSystem | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const atmosphere = Atmosphere()
  useEffect(() => {
    if ((mainParticleRef.current == null) && (wrapper.current != null)) {
      // Initialize the ParticleSystem only once
      mainParticleRef.current = new ParticleSystem({
        CanvasWrapper: wrapper.current,
        Models,
        addons: atmosphere,
        onModelsFinishedLoad: (point) => {
          mainParticleRef.current?.ListenMouseMove();
          setIsModelLoaded(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    handleModelChange(name);
  }, [name, isModelLoaded]);

  const handleModelChange = (modelName: string) => {
    if (isModelLoaded && (mainParticleRef.current != null)) {
      mainParticleRef.current.ChangeModel(modelName, time);
    }
  };

  return (
    <Container className="canvas_wrapper p-0" ref={wrapper} fluid></Container>
  );
}

export default IndexPage;
