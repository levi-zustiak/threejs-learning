import { forwardRef, memo, useMemo } from "react";
import { a } from "@react-spring/three";

export default memo(
  forwardRef(function GameObject(props, ref) {
    const {
      animate,
      position,
      geometry,
      opacity = 1,
      texture,
      eventHandlers,
      children
    } = props;

    const materialProps = useMemo(
      () => ({
        opacity,
        map: texture,
        transparent: true
      }),
      [opacity, texture]
    );

    return animate ? (
      <a.mesh ref={ref} position={position} {...eventHandlers}>
        <planeBufferGeometry args={geometry} />
        <a.meshBasicMaterial attach="material" {...materialProps} />
      </a.mesh>
    ) : (
      <mesh ref={ref} position={position} {...eventHandlers}>
        <planeBufferGeometry args={geometry} />
        <meshBasicMaterial attach="material" {...materialProps} />
        {children}
      </mesh>
    );
  })
);
