import { useRef } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { useTransition, animated } from "@react-spring/three";
import { TextureLoader } from "three";
import RedToken from "./Sprites/Red_token.png";
import YellowToken from "./Sprites/Yellow_token.png";

function Token(props) {
  const { index, token } = props;
  const ref = useRef();

  const { viewport } = useThree();

  const heightFactor = 6.428571428571429;
  const tokenFactor = 10.909090909090908;
  const tokenSize = viewport.width / tokenFactor;
  const args = [tokenSize, tokenSize];

  const height = viewport.height / heightFactor;
  const final = height * (index - 2.5);
  const starting = viewport.height / 2;

  const TokenSprite = token.value ? RedToken : YellowToken;

  const texture = useLoader(TextureLoader, TokenSprite);

  const transition = useTransition(token, {
    from: { position: [0, starting, 0] },
    enter: { position: [0, final, 0] },
    config: {
      mass: 1.5,
      friction: 10,
      bounce: 0.1
    },
    key: token.key
  });

  return transition((props) => (
    <animated.mesh ref={ref} {...props}>
      <planeBufferGeometry args={args} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        transparent
        // toneMapped={false}
      />
    </animated.mesh>
  ));
}

export default Token;
