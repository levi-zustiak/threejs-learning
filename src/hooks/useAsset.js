import { useContext } from "react";
import { AssetLoaderContext } from "../components/AssetLoader";

function useAsset() {
  const { current } = useContext(AssetLoaderContext);

  return current;
}

export default useAsset;
