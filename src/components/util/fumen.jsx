import React  from "react";
import { fumen2Canvas } from "../../util/fumen2Image";
import {decoder} from "tetris-fumen";

/**
 * Fumen component
 * @param {string} fumen - Fumen string
 * @param {number} [tileSize] - Size of each tile in pixels
 * @param {number} [numRows] - Number of rows to display
 * @param {boolean} [transparent] - Whether to make the background transparent
 * @param {React.ReactNode} children - Children to render
 * @returns {React.ReactNode} - React node
 * */
export const Fumen = ({ fumen, tileSize, numRows, transparent }) => {
    const pages = decoder.decode(fumen)
    let fumenPage = pages[0]
    
    if (!tileSize) {
        tileSize = 32
    }
    
    console.log(typeof tileSize, typeof numRows, typeof transparent)
    
    console.log(tileSize, numRows, transparent)
    
    let fumenCanvas = fumen2Canvas(fumenPage, tileSize, numRows, transparent );
    
    return (
        <img src={fumenCanvas.toDataURL()} alt="Fumen" />
    )
}


