import { useRef } from "react";
import { useTransition } from "@react-spring/three";
import GameObject from "../components/GameObject";
import useAsset from "../hooks/useAsset";

function Token(props) {
  const { index, token } = props;
  const { tokenAsset } = useAsset();
  const ref = useRef();

  const texture = token.value
    ? tokenAsset.redTexture
    : tokenAsset.yellowTexture;

  const final = tokenAsset.yOffset * (index - 2.5);

  const transition = useTransition(token, {
    from: { position: [0, tokenAsset.starting, 0] },
    enter: { position: [0, final, 0] },
    config: {
      mass: 1.6,
      friction: 10,
      tension: 150,
      bounce: 0.1
    },
    key: token?.key
  });

  return transition(({ position }) => (
    <GameObject
      ref={ref}
      position={position}
      geometry={tokenAsset.args}
      texture={texture}
      animate
    />
  ));
}

export default Token;
