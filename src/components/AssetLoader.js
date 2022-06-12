import { createContext } from "react";
import { TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";

import BoardSprite from "../assets/Board.png";
import RedTokenSprite from "../assets/Red_token.png";
import YellowTokenSprite from "../assets/Yellow_token.png";

export const AssetLoaderContext = createContext({});

const assets = {};

function AssetLoaderProvider({ children }) {
  return (
    <AssetLoaderContext.Provider value={assets}>
      {children}
    </AssetLoaderContext.Provider>
  );
}

function AssetLoader({ children }) {
  const { viewport } = useThree();

  const heightFactor = 6.428571428571429; // boardHeight: 720 / cellHeight: 112
  const tokenFactor = 10.909090909090908; // boardWidth: 960 / tokenWidth: 88

  const tokenSize = viewport.width / tokenFactor;

  const xOffset = viewport.width / 7.5; // column width
  const yOffset = viewport.height / heightFactor;

  const [
    boardTexture,
    redTokenTexture,
    yellowTokenTexture
  ] = useLoader(TextureLoader, [
    BoardSprite,
    RedTokenSprite,
    YellowTokenSprite
  ]);

  const current = {
    boardAsset: {
      position: [0, 0, 2],
      texture: boardTexture,
      args: [viewport.width, viewport.height]
    },
    columnAsset: {
      args: [viewport.width / 7.5, viewport.height]
    },
    tokenAsset: {
      redTexture: redTokenTexture,
      yellowTexture: yellowTokenTexture,
      args: [tokenSize, tokenSize],
      xOffset: xOffset,
      yOffset: yOffset,
      starting: viewport.height / 2
    }
  };

  assets.current = current;

  return <AssetLoaderProvider>{children}</AssetLoaderProvider>;
}

export default AssetLoader;
