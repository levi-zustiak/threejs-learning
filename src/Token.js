import { useThree } from "@react-three/fiber";
import { useTransition } from "@react-spring/three";
import GameObject from "./GameObject";
import useAsset from "./hooks/useAsset";

function Token(props) {
  const { index, token } = props;
  const { viewport } = useThree();
  const { redTokenSprite, yellowTokenSprite } = useAsset();

  const texture = token.value ? redTokenSprite : yellowTokenSprite;

  const heightFactor = 6.428571428571429;
  const tokenFactor = 10.909090909090908;
  const tokenSize = viewport.width / tokenFactor;

  const height = viewport.height / heightFactor;
  const final = height * (index - 2.5);
  const starting = viewport.height / 2;

  const transition = useTransition(token, {
    from: { position: [0, starting, 0] },
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
    args: [tokenSize, tokenSize]
  };

  const materialProps = {
    map: texture,
    transparent: true
  };

  return transition(
    ({ position }) =>
      token && (
        <GameObject
          position={position}
          geometry={geometryProps}
          material={materialProps}
          animate
        />
      )
  );
}

export default Token;
