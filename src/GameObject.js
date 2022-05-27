import { useRef } from "react";
import { animated } from "@react-spring/three";

function GameObject(props) {
  const { animate, position, mesh, geometry, material, children } = props;
  const ref = useRef();

  return animate ? (
    <animated.mesh ref={ref} position={position} {...mesh}>
      <planeBufferGeometry {...geometry} />
      <meshBasicMaterial attach="material" {...material} />
    </animated.mesh>
  ) : (
    <mesh ref={ref} position={position} {...mesh}>
      <planeBufferGeometry {...geometry} />
      <meshBasicMaterial attach="material" {...material} />
      {children}
    </mesh>
  );
}

export default GameObject;
