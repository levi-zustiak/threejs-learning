import { useState, useRef, useEffect } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { useTransition, animated, config } from "@react-spring/three";
import { TextureLoader } from "three";
import RedToken from "./Sprites/Red_token.png";
import YellowToken from "./Sprites/Yellow_token.png";
import { v4 } from "uuid";

function Cell(props) {
  const [show, setShow] = useState(false);
  const { index, x, cell } = props;
  const ref = useRef();
  const { viewport } = useThree();

  const heightFactor = 6.428571428571429;
  const tokenFactor = 10.909090909090908;
  const tokenSize = viewport.width / tokenFactor;

  const height = viewport.height / heightFactor;
  const final = height * (index - 2.5);

  const starting = 10;

  useEffect(() => {
    setShow(true);
  }, []);

  // const { position } = useSpring({
  //   from: { position: [x, starting, 1] },
  //   to: { position: [x, final, 1] }
  //   // config: config.wobbly
  // });

  const key = v4();

  const transition = useTransition(show, {
    from: { position: [x, starting, 1] },
    enter: { position: [x, final, 1] },
    keys: v4()
  });

  const TokenSprite = cell === 1 ? RedToken : YellowToken;

  const texture = useLoader(TextureLoader, TokenSprite);

  return transition(
    ({ position }, item) =>
      item && (
        <animated.mesh ref={ref} position={position} key={key}>
          <planeBufferGeometry args={[tokenSize, tokenSize]} />
          <meshBasicMaterial
            attach="material"
            map={texture}
            transparent
            toneMapped={false}
          />
        </animated.mesh>
      )
  );

  // return (

  //   <>
  //     {cell && (
  //       <animated.mesh ref={ref}>
  //         <planeBufferGeometry args={[tokenSize, tokenSize]} />
  //         <meshBasicMaterial
  //           attach="material"
  //           map={texture}
  //           transparent
  //           toneMapped={false}
  //         />
  //       </animated.mesh>
  //     )}
  //   </>
  // );
}

export default Cell;
