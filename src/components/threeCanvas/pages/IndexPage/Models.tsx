import { ParticleModelProps } from '../../declare/THREE';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { audioFrequency, flatGeometry, hanGeo } from '../../utils/GetFlatGeometry.ts';
import { gamma } from 'mathjs';
import VerticesDuplicateRemove from '../../utils/VerticesDuplicateRemove.ts';
import * as THREE from 'three';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const scaleNum = 600;
let Q = 0;

export const Models: ParticleModelProps[] = [
  {
    name: 'cube',
    path: new URL('../../THREE/models/examples/cube.fbx', import.meta.url).href,
    onLoadComplete(Geometry) {
      const s = 400;
      Geometry.scale(s, s, s);
    },
    loader: {
      loaderInstance: new FBXLoader(),
      load(group) {
        const g = new BufferGeometry();
        let arr = new Float32Array([]);
        console.log(group)
        for (const i of group.children) {
          arr = new Float32Array([...arr, ...i.geometry.attributes.position.array]);
        }
        g.setAttribute('position', new Float32BufferAttribute(VerticesDuplicateRemove(arr), 3));
        return g;
      }
    }
  },
  {
    name: 'TEMPLE',
    path: new URL('../../THREE/models/examples/TEMPLE.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      const s = 5000;
      Geometry.scale(s, s, s);
    }
  },
  {
    name: 'ball',
    path: new URL('../../THREE/models/examples/ball.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
    }
  },
  {
    name: 'headphone',
    path: new URL('../../THREE/models/examples/headphone.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
    }
  },
  {
    name: 'cpac5',
    path: new URL('../../THREE/models/examples/cpac5.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
    }
  },
  {
    name: 'cpkv3',
    path: new URL('../../THREE/models/examples/cpkv3.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(400, 400, 400);
      Geometry.translate(0, -1300, -3000);
    },
    onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
      const p = PerfromPoint.geometry.getAttribute('position');
      TweenList.forEach((val, i) => {
        if (val.isPlaying === false) {
          const x = p.getX(i);
          const z = p.getZ(i) + 3000;
          const distance = Math.sqrt(x * x + z * z);
          if (distance > 2000) {
            const newY = 0.5 * (Math.abs((distance + Q) / 2) * Math.sin(Math.abs((distance + Q) / 2)) / 10);
            p.setY(i, newY);
          }
        }
      });
      Q += 0.02;
      PerfromPoint.geometry.attributes.position.needsUpdate = true;
      return true;
    }
  },
  {
    name: 'game',
    path: new URL('../../THREE/models/examples/game.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
      Geometry.rotateX(45);
      Geometry.rotateZ(-30);
      Geometry.translate(0, 100, 300);
    }
  },
  {
    name: 'DiamondSword',
    path: new URL('../../THREE/models/examples/DiamondSword.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(30, 30, 30);
      Geometry.rotateX(45);
      // Geometry.rotateZ(-20);
      Geometry.translate(0, 100, 300);
    }
  },
  {
    name: 'cone',
    path: new URL('../../THREE/models/examples/cone.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
    }
  },
  {
    name: 'boi1o1',
    path: new URL('../../THREE/models/examples/boi1o1.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(10000, 10000, 10000);
      Geometry.rotateX(-11)
    }
  },
  {
    name: 'boi2o1',
    path: new URL('../../THREE/models/examples/boi2o1.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(10, 10, 10);
      Geometry.rotateX(-11)
    }
  },
  {
    name: 'wave',
    geometry: flatGeometry.createGeometry(),
    onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
      const p = PerfromPoint.geometry.getAttribute('position');
      TweenList.forEach((val, i) => {
        if (val.isPlaying === false) {
          p.setY(i, Math.sin((i + 1 + Q) * 0.3) * 50 + Math.sin((i + Q) * 0.5) * 50 - 200);
        }
      });
      Q += 0.08;
      return true;
    }
  },
  {
    name: 'sampleFunction',
    geometry: audioFrequency.createGeometry(),
    onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
      const p = PerfromPoint.geometry.getAttribute('position');
      TweenList.forEach((val, i) => {
        const x = p.getX(i);
        if (val.isPlaying === false) {
          p.setY(i, x * Math.sin(Math.tan(Math.log(gamma(Q) * Math.pow(x, 2)))) * Math.cos(x));
        }
      });
      Q += 0.0002;
      if (Q > 2) {
        Q = 0.0002;
      }
      return true;
    }
  },
  {
    name: 'hanGeo',
    geometry: hanGeo.createGeometry(),
    NeedRemoveDuplicateParticle: false,
    onLoadComplete(Geo) {
      // Geo.translate(-window.innerWidth / 2, -window.innerHeight / 2, 0)
    },
    onAnimationFrameUpdate(PerfromPoint, TweenList, Geometry) {
      const p = PerfromPoint.geometry.getAttribute('position');
      TweenList.forEach((val, i) => {
        if (i > 5000) {
          if (p.getY(i) < -10000) {
            p.setY(i, -Q);
          }
        }
      });
      Q += 0.8;
      return true;
    }
  }
];
