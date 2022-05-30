import "./styles.css";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RecoilRoot } from "recoil";
import Board from "./Board";
import Loading from "./Loading";
import AssetLoader from "./AssetLoader";

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
          <Suspense fallback={<Loading />}>
            <AssetLoader>
              <Board />
            </AssetLoader>
          </Suspense>
        </RecoilRoot>
      </Canvas>
    </div>
  );
}
