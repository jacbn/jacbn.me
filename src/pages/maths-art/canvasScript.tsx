import React from 'react';
import { useEffect } from "react";
// @ts-expect-error no types
import resetColourSchemeListeners from '../../scripts/maths-art/resetColourSchemes'; 

export default function CanvasScript({startFunction} : {startFunction: () => void}) {
    useEffect(() => {
        resetColourSchemeListeners();
        startFunction();
    }, []);
    return <></>;
  }
