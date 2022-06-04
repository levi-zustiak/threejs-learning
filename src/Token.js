import { useTransition } from "@react-spring/three";
import GameObject from "./GameObject";
import useAsset from "./hooks/useAsset";

function Token(props) {
  const { index, token } = props;
  const { tokenAsset } = useAsset();

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

  const geometryProps = {
    args: tokenAsset.args
  };

  const materialProps = {
    map: texture,
    transparent: true
  };

  return transition(({ position }) => (
    <GameObject
      position={position}
      geometry={geometryProps}
      material={materialProps}
      animate
    />
  ));
}

export default Token;
