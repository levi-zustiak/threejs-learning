import { useCallback, useEffect, useRef } from "react";
import { useSpring } from "@react-spring/three";

import { useRecoilState, useRecoilValue } from "recoil";
import useAsset from "../hooks/useAsset";
import useHelpers from "../hooks/useHelpers";
import gameAtom from "../state/gameAtom";
import placeholderAtom from "../state/placeholderAtom";

import GameObject from "../components/GameObject";

function Placeholder() {
  const { tokenAsset } = useAsset();
  const { getNextRow, isAvailable } = useHelpers();
  const { board, turn } = useRecoilValue(gameAtom);
  const [{ col, row }, setPlaceholder] = useRecoilState(placeholderAtom);
  const ref = useRef();

  const texture = turn ? tokenAsset.redTexture : tokenAsset.yellowTexture;

  const x = tokenAsset.xOffset * (col - 3);
  const y = tokenAsset.yOffset * (row - 2.5);

  const { opacity } = useSpring({
    loop: { reverse: true },
    to: useCallback(async (next) => {
      await next({ opacity: 0.75 });
      await next({ opacity: 0 });
    }, []),
    from: { opacity: 0 },
    config: {
      tension: 180,
      friction: 28,
      precision: 0.01
    }
  });

  const position = [x, y, -1];

  const getNextPosition = () => {
    if (isAvailable(col)) {
      setPlaceholder({
        col: col,
        row: getNextRow(col)
      });
    } else if (isAvailable(3)) {
      setPlaceholder({
        col: 3,
        row: getNextRow(3)
      });
    } else {
      let i, j;

      for (i = 4, j = 2; i < 7; i++, j--) {
        if (isAvailable(j)) {
          setPlaceholder({
            col: j,
            row: getNextRow(j)
          });
          break;
        } else if (isAvailable(i)) {
          setPlaceholder({
            col: i,
            row: getNextRow(i)
          });
          break;
        }
      }
    }
  };

  useEffect(() => {
    getNextPosition();
  }, [board]);

  return (
    <GameObject
      ref={ref}
      position={position}
      geometry={tokenAsset.args}
      texture={texture}
      opacity={opacity}
      animate
    />
  );
}

export default Placeholder;
