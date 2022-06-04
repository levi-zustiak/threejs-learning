import { useSpring } from "@react-spring/three";
import GameObject from "./GameObject";
import useAsset from "./hooks/useAsset";
import { useRecoilValue } from "recoil";
import turnAtom from "./state/turnAtom";
import coordAtom from "./state/coordAtom";
import { useEffect, useRef } from "react";

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
    from: { opacity: 0 },
    to: { opacity: 0.75 },
    config: {
      tension: 200,
      friction: 26,
      precision: 0.01
    },
    trail: 500
  });

  console.log(opacity);

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
