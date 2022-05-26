import "./styles.css";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { RecoilRoot } from "recoil";

export default function App() {
  const canvas = useRef();
  const fov = 64;

  const camera = {
    position: [0, 0, 32],
    zoom: fov,
    near: 0,
    far: fov
  };

  return (
    <div className="App">
      <Canvas ref={canvas} camera={camera} flat={true} orthographic>
        <RecoilRoot>
          <Suspense fallback={null}>
            <Game />
          </Suspense>
        </RecoilRoot>
      </Canvas>
    </div>
  );
}
