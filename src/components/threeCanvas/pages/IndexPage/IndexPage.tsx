import * as React from 'react'
import Container from 'react-bootstrap/Container'
// import Styles from './index.module.scss'
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

function IndexPage(props: { name: string, time: number }) {
  let needShake = false;
  const wrapper = useRef<HTMLDivElement | null>(null)
  const mainParticleRef = useRef<ParticleSystem | null>(null);
  // const MainParticle: ParticleSystem | null = null
  // console.log(needShake)
  const TurnBasicNum = { firefly: 0.002 }
  const al = 1500

  const tween2 = new Tween.Tween(TurnBasicNum).easing(Tween.Easing.Exponential.In)
  const tween1 = new Tween.Tween(TurnBasicNum).easing(Tween.Easing.Exponential.In)
  const shaking = (Point: any) => {
    Point.rotation.x += Math.random() * 0.005 - 0.0025;
    Point.rotation.y += Math.random() * 0.005 - 0.0025;
    Point.rotation.z += Math.random() * 0.005 - 0.0025;
  };

  // Function to update the position and rotation to a new random state
  const updateParticle = (particle: any, duration = 500) => {
    const newPosition = {
      x: (Math.random() - 0.5) * 100, // Adjust range as needed
      y: (Math.random() - 0.5) * 100, // Adjust range as needed
      z: (Math.random() - 0.5) * 100 // Adjust range as needed
    };

    new Tween.Tween(particle.position)
      .to(newPosition, duration)
      .easing(Tween.Easing.Quadratic.InOut)
      .start();
  };
  // console.log("state of needshake at line 45 is ", needShake)
  const Atomsphere1 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 600,
    renderUpdate: (Point) => {
      updateParticle(Point);
      // console.log("ran ", "shake state here is ", needShake)
      if (needShake) {
        // console.log("shaking")
        shaking(Point)
      }
    },
    callback: (Point) => {
      Point.position.z = al
    },
    onChangeModel: (Point) => {
      // setNeedShake(true);
      // console.log(needShake)
      needShake = true;
      setTimeout(() => { needShake = false }, 1000)
    }
  })
  const Atomsphere2 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 600,
    renderUpdate: (Point) => {
      // Point.rotation.y += TurnBasicNum.firefly
      updateParticle(Point);
      if (needShake) {
        // console.log("shaking")
        shaking(Point)
      }
    },
    callback: (Point) => {
      Point.position.y = -0.2 * al
      Point.position.z = -1 * al
    },
    onChangeModel: (Point) => {
      shaking(Point);
    }
  })
  const Atomsphere3 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 600,
    renderUpdate: (Point) => {
      // console.log(Point)
      // Point.rotation.z += TurnBasicNum.firefly / 2
      updateParticle(Point);
      if (needShake) {
        // console.log("shaking")
        shaking(Point)
      }
    },
    callback: (Point) => {
      Point.position.z = -1 * al
    },
    onChangeModel: (Point) => {
      // create a timer for shaking effect
      shaking(Point);
      // console.log('change model')
    }
  })

  const scaleNum = 600
  let Q = 0
  const Models: ParticleModelProps[] = [
    {
      name: 'cube',
      path: new URL('../../THREE/models/examples/cube.fbx', import.meta.url).href,
      onLoadComplete(Geometry) {
        const s = 400
        Geometry.scale(s, s, s)
      },
      loader: {
        loaderInstance: new FBXLoader(),
        load(group) {
          const g = new BufferGeometry()
          console.log(group)
          let arr = new Float32Array([])
          for (const i of group.children) {
            arr = new Float32Array([...arr, ...i.geometry.attributes.position.array])
          }
          g.setAttribute('position', new Float32BufferAttribute(VerticesDuplicateRemove(arr), 3))
          return g
        }
      }
    },
    {
      name: 'ball',
      path: new URL('../../THREE/models/examples/ball.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        Geometry.scale(scaleNum, scaleNum, scaleNum)
        // Geometry.translate(-600, 0, -100)
      },
      onEnterStart(PointGeometry) {
        // console.log('ball enter start')
      },
      onEnterEnd(PointGeometry) {
        // console.log('ball enter end')
      }
    },
    {
      name: 'cpac5',
      path: new URL('../../THREE/models/examples/cpac5.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        Geometry.scale(scaleNum, scaleNum, scaleNum)
        // Geometry.translate(-600, 0, -100)
      },
      onEnterStart(PointGeometry) {
        // console.log('ball enter start')
      },
      onEnterEnd(PointGeometry) {
        // console.log('ball enter end')
      }
    },
    {
      name: 'cpkv3',
      path: new URL('../../THREE/models/examples/cpkv3.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        Geometry.scale(400, 400, 400)
        Geometry.translate(0, -1300, -3000)
      },
      onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
        const p = PerfromPoint.geometry.getAttribute('position')
        TweenList.forEach((val, i) => {
          if (val.isPlaying === false) {
            const x = p.getX(i) // Get the x-coordinate
            const z = p.getZ(i) + 3000
            // Calculate the new Y-coordinate using the provided function
            const distance = Math.sqrt(x * x + z * z)
            if (distance > 2000) {
              const newY = 0.5 * (Math.abs((distance + Q) / 2) * Math.sin(Math.abs((distance + Q) / 2)) / 10)
              p.setY(i, newY)
            }
          }
        })
        Q += 0.02
        PerfromPoint.geometry.attributes.position.needsUpdate = true // Mark the position attribute for update
        return true
      }
    },
    {
      name: 'game',
      path: new URL('../../THREE/models/examples/game.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        Geometry.scale(scaleNum, scaleNum, scaleNum)
        Geometry.rotateX(45)
        Geometry.rotateZ(-30)
        Geometry.translate(0, 100, 300)
      }
    },
    {
      name: 'wave',
      geometry: GetFlatGeometry(),
      onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
        const p = PerfromPoint.geometry.getAttribute('position')
        TweenList.forEach((val, i) => {
          if (val.isPlaying === false) {
            p.setY(i, Math.sin((i + 1 + Q) * 0.3) * 50 + Math.sin((i + Q) * 0.5) * 50 - 500)
          }
        })
        Q += 0.08
        return true
      }
    },
    {
      name: 'plane',
      geometry: GetFlatGeometry()
    },
    {
      name: 'cone',
      path: new URL('../../THREE/models/examples/cone.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        Geometry.scale(scaleNum, scaleNum, scaleNum)
        // Geometry.translate(600, 100, -100)
      }
    }
  ]

  // window.changeModel = (name: string) => {
  //   if (MainParticle != null) {
  //     MainParticle.ChangeModel(name)
  //   }
  // }

  useEffect(() => {
    if ((mainParticleRef.current == null) && (wrapper.current != null)) {
      // Initialize the ParticleSystem only once
      mainParticleRef.current = new ParticleSystem({
        CanvasWrapper: wrapper.current,
        Models,
        addons: [Atomsphere1, Atomsphere2, Atomsphere3],
        onModelsFinishedLoad: (point) => {
          mainParticleRef.current?.ListenMouseMove();
        }
      });
    }

    const timeoutId = setTimeout(() => {
      handleModelChange(props.name);
    }, props.time);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    handleModelChange(props.name);
  }, [props.name]);

  const handleModelChange = (modelName: string) => {
    if (mainParticleRef.current != null) {
      mainParticleRef.current.ChangeModel(modelName, 500);
    }
  };

  return (
    <Container className="canvas_wrapper p-0" ref={wrapper} fluid></Container>
  );
}

export default IndexPage;
