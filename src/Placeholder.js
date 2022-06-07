import { useCallback, useRef } from "react";
import { useSpring } from "@react-spring/three";

import { useRecoilValue } from "recoil";
import useAsset from "./hooks/useAsset";
import turnAtom from "./state/turnAtom";
import coordAtom from "./state/coordAtom";

import GameObject from "./GameObject";

function Placeholder() {
  const { tokenAsset } = useAsset();
  const turn = useRecoilValue(turnAtom);
  const coords = useRecoilValue(coordAtom);
  const ref = useRef();

  const texture = turn ? tokenAsset.redTexture : tokenAsset.yellowTexture;

  const x = tokenAsset.xOffset * (coords.col - 3);
  const y = tokenAsset.yOffset * (coords.row - 2.5);

  const { opacity } = useSpring({
    loop: { reverse: true },
    to: useCallback(async (next) => {
      await next({ opacity: 0.75 });
      await next({ opacity: 0 });
    }, []),
    from: { opacity: 0 },
    config: {
      tension: 200,
      friction: 26,
      precision: 0.01
    }
  });

  const position = [x, y, -1];

  const geometryProps = {
    args: tokenAsset.args
  };

  const materialProps = {
    map: texture,
    transparent: true
  };

  return (
    <GameObject
      ref={ref}
      position={position}
      geometry={geometryProps}
      material={materialProps}
      opacity={opacity}
      animate
    />
  );
}

export default Placeholder;
