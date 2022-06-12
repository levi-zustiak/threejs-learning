import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RecoilRoot } from "recoil";

import Board from "./entities/Board";
import Loading from "./components/Loading";
import AssetLoader from "./components/AssetLoader";

function Game() {
  const canvas = useRef();
  const fov = 64;

  const camera = {
    position: [0, 0, 32],
    zoom: fov,
    near: 0,
    far: fov
  };

  return (
    <Canvas ref={canvas} camera={camera} flat={true} orthographic>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <AssetLoader>
            <Board />
          </AssetLoader>
        </Suspense>
      </RecoilRoot>
    </Canvas>
  );
}

export default Game;
