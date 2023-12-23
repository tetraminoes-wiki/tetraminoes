import React, {useEffect, useRef, useSyncExternalStore} from "react";
import {decoder, encoder} from "tetris-fumen";
import mirrorPages from "@site/src/util/mirrorPages";
import fumenSize from "@site/src/util/fumenSize";
import styles from "./FumenCanvas.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import {useLocalStorageStateBool} from "@site/src/util/useLocalStorageState";

// let useLocalStorageStateBool
//
// (async function () {
//     if (ExecutionEnvironment.canUseDOM) {
//         let useLocalStorageStatLib = await import("@site/src/util/useLocalStorageState")
//         useLocalStorageStateBool = useLocalStorageStatLib.useLocalStorageStateBool
//     }
// })()

const colors = {
    I: {
        normal: "#42afe1",
        highlight: "#6ceaff",
        skim: "#5cc7f9"
    },
    T: {
        normal: "#9739a2",
        highlight: "#d958e9",
        skim: "#b94bc6"
    },
    S: {
        normal: "#51b84d",
        highlight: "#84f880",
        skim: "#70d36d"
    },
    Z: {
        normal: "#eb4f65",
        highlight: "#ff7f79",
        skim: "#f96c67"
        
    },
    L: {
        normal: "#f38927",
        highlight: "#ffba59",
        skim: "#f99e4c"
    },
    J: {
        normal: "#1165b5",
        highlight: "#339bff",
        skim: "#2c84da"
    },
    O: {
        normal: "#f6d03c",
        highlight: "#ffff7f",
        skim: "#f9df6c"
    },
    X: {
        normal: "#868686",
        highlight: "#dddddd",
        skim: "#bdbdbd"
    },
    Empty: { normal: "#f3f3ed" },
    Stroke: { normal: "#aaaaaa" }
};

/**
 * @param {string} fumenData - Fumen text to be displayed
 * @param {number} [tilesize] - Size of each tile in pixels
 * @param {boolean} [transparent] - Whether to make empty tiles transparent
 * @param {number} [numrows] - Number of rows to display
 * */
function operationFilter(e) {
    return i == e.x && j == e.y
}

function drawFumens(context, field, operation, tilesize, numrows, height, width, numcols, skimRows, gridState) {
    context.fillRect(0, 0, width, height);
    
    if (gridState) {
        // grid with stroke
        context.fillStyle = "rgba(0, 0, 0, 0)"
        context.strokeStyle = colors['Stroke'].normal
        
        for(let i = 0; i < numcols; i++) {
            for(let j = 0; j < numrows; j++) {
                context.strokeRect(i*tilesize, height-(j+1)*tilesize, tilesize, tilesize)
            }
        }
    }
    
    // the highlight
    for(let i = 0; i < numcols; i++) {
        for(let j = 0; j < numrows; j++) {
            if(field.at(i,j) != '_') {
                context.fillStyle = colors[field.at(i,j)].highlight
                context.fillRect(i*tilesize, height-(j+1)*tilesize-tilesize/5, tilesize, tilesize+tilesize/5)
            }
            if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                context.fillStyle = colors[operation.type].highlight
                context.fillRect(i*tilesize, height-(j+1)*tilesize-tilesize/5, tilesize, tilesize+tilesize/5)
            }
        }
    }
    
    // the rest of the piece
    for(let i = 0; i < numcols; i++) {
        for(let j = 0; j < numrows; j++) {
            if(field.at(i,j) != '_') {
                if(skimRows[j]) {
                    // console.log(field.at(i,j), colors[field.at(i,j)].skim)
                    context.fillStyle = colors[field.at(i,j)].skim
                }else {
                    context.fillStyle = colors[field.at(i,j)].normal
                }
                context.fillRect(i*tilesize, height-(j+1)*tilesize, tilesize, tilesize)
            }
            if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                if(skimRows[j]) {
                    context.fillStyle = colors[operation.type].skim
                }else {
                    context.fillStyle = colors[operation.type].normal
                }
                context.fillRect(i*tilesize, height-(j+1)*tilesize, tilesize, tilesize)
            }
        }
    }

}

function defaults( tilesize, transparent ){
    // Tile Size
    if (!tilesize) {
        tilesize = 32;
    }
    
    // Transparency
    if(transparent == undefined) {
        transparent = true;
    }
    
    return [tilesize, transparent]
}

const FumenCanvas = ({ fumenData, tilesize, transparent, numrows, ...props }) => {
    
    let mirrorState, setMirroredState
    let gridState, setGridState
    
    if (ExecutionEnvironment.canUseDOM) {
        [ mirrorState, setMirroredState ] = useLocalStorageStateBool('mirrorState', false);
        [ gridState, setGridState ] = useLocalStorageStateBool('gridState', false);
    }
    
    function clickHandler() {
        setMirroredState(!mirrorState)
        // console.log(mirrorState)
    }
    
    // Canvas reference
    // So we can draw on it
    const canvasRef = React.useRef(null);
    
    // Canvas size
    let width
    let height
    
    // Default values
    [tilesize, transparent] = defaults(tilesize, transparent)
    
    useEffect(() => {
        
        let fumenPage
        
        if(mirrorState) {
            fumenPage = mirrorPages(decoder.decode(fumenData))[0]
        }else {
            fumenPage = decoder.decode(fumenData)[0]
        }
        
        const numcols = 10;
        const field = fumenPage.field
        const operation = fumenPage.operation
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let skimRows = []
        
        
        // Number of rows
        if(numrows == undefined) {
            numrows = fumenSize(numcols, field, operation);
            numrows+=2
        }
        
        // Canvas size
        width = numcols * tilesize;
        height = numrows * tilesize;
        
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        if(!transparent) {
            context.fillStyle = colors['Empty'].normal
        }
        else {
            context.fillStyle = 'rgba(0, 0, 0, 0)'
        }
        
        // check which rows to skim
        for(let j = 0; j < numrows; j++) {
            skimRows[j] = true
            for(let i = 0; i < numcols; i++) {
                if (field.at(i,j) == '_') {
                    skimRows[j] = false
                    break
                }
            }
        }
        
        // console.log(skimRows)
    
        drawFumens(context, field, operation, tilesize, numrows, height, width, numcols, skimRows, gridState);
    }, [mirrorState, gridState]);
    
    return <canvas
        className={styles.fumenCanvasSmall}
        onClick={clickHandler}
        fumenData={fumenData}
        ref={canvasRef}
        width={width}
        height={height}/>;
}

export default FumenCanvas;