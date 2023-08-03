import { useEffect } from "react";
import resetColourSchemeListeners from '@/scripts/maths-art/resetColourSchemes'

export default function CanvasScript({startFunction} : {startFunction: () => void}) {
    useEffect(() => {
        resetColourSchemeListeners();
        startFunction();
    }, []);
    return <></>;
  }