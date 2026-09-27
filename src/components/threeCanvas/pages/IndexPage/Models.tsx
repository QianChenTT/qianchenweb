import { ParticleModelProps } from '../../declare/THREE';
import { audioFrequency, flatGeometry, hanGeo } from '../../utils/GetFlatGeometry.ts';
import { gamma } from 'mathjs';

const scaleNum = 600;
let Q = 0;

// Only models shown by App's scroll pages are registered: every entry here is downloaded on load.
export const Models: ParticleModelProps[] = [
  {
    name: 'cpac5',
    path: new URL('../../THREE/models/examples/cpac5.obj', import.meta.url).href,
    onLoadComplete(Geometry) {
      Geometry.scale(scaleNum, scaleNum, scaleNum);
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
    onAnimationFrameUpdate(PerfromPoint, TweenList) {
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
    onAnimationFrameUpdate(PerfromPoint, TweenList) {
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
    onAnimationFrameUpdate(PerfromPoint, TweenList) {
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
