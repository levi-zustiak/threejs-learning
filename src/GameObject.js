import { forwardRef, memo } from "react";
import { a } from "@react-spring/three";

export default memo(
  forwardRef(function GameObject(props, ref) {
    const {
      animate,
      position,
      opacity,
      mesh,
      geometry,
      material,
      children
    } = props;

    return animate ? (
      <a.mesh ref={ref} position={position} {...mesh}>
        <planeBufferGeometry {...geometry} />
        <a.meshBasicMaterial
          attach="material"
          {...material}
          opacity={opacity}
        />
      </a.mesh>
    ) : (
      <mesh ref={ref} position={position} {...mesh}>
        <planeBufferGeometry {...geometry} />
        <meshBasicMaterial attach="material" {...material} />
        {children}
      </mesh>
    );
  })
);
