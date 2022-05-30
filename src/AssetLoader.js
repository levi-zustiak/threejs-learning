import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

import BoardSprite from "./Sprites/Board.png";
import RedTokenSprite from "./Sprites/Red_token.png";
import YellowTokenSprite from "./Sprites/Yellow_token.png";
import { createContext } from "react";

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
  const [Board, RedToken, YellowToken] = useLoader(TextureLoader, [
    BoardSprite,
    RedTokenSprite,
    YellowTokenSprite
  ]);

  const textures = {
    boardSprite: Board,
    redTokenSprite: RedToken,
    yellowTokenSprite: YellowToken
  };

  assets.current = textures;

  return <AssetLoaderProvider>{children}</AssetLoaderProvider>;
}

export default AssetLoader;
