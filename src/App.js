import "./styles.css";
import { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { RecoilRoot } from "recoil";

export default function App() {
  const canvas = useRef();
  const fov = 64;

  useEffect(() => {
    if (canvas.current) {
      // console.log(canvas.current);
    }
  }, [canvas]);

  const camera = {
    position: [0, 0, 64],
    zoom: fov,
    near: 0,
    far: fov
  };

  return (
    <div className="App">
      <Canvas ref={canvas} orthographic camera={camera}>
        <RecoilRoot>
          <Suspense fallback={null}>
            <Game />
          </Suspense>
        </RecoilRoot>
      </Canvas>
    </div>
  );
}
