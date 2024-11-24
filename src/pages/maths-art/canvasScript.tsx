import React from 'react';
import { useEffect } from "react";
// @ts-ignore
import resetColourSchemeListeners from '../../scripts/maths-art/resetColourSchemes'; 

export default function CanvasScript({startFunction} : {startFunction: () => void}) {
    useEffect(() => {
        resetColourSchemeListeners();
        startFunction();
    }, []);
    return <></>;
  }
