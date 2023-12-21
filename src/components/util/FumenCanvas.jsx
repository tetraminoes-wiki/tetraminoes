import React, {useEffect} from "react";
import {decoder} from "tetris-fumen";

const colors = {
    I: {
        normal: "#41afde",
        highlight1: "#3dc0fb",
        highlight2: "#3dc0fb",
        lighter: "#3dc0fb",
        light: "#43d3ff"
    },
    T: {
        normal: "#b451ac",
        highlight1: "#d161c9",
        highlight2: "#d161c9",
        lighter: "#d161c9",
        light: "#e56add"
    },
    S: {
        normal: "#66c65c",
        highlight1: "#75d96a",
        highlight2: "#7cd97a",
        lighter: "#7cd97a",
        light: "#88ee86"
    },
    Z: {
        normal: "#ef624d",
        highlight1: "#ff7866",
        highlight2: "#ff8778",
        lighter: "#fd7660",
        light: "#ff9484"
    },
    L: {
        normal: "#ef9535",
        highlight1: "#ffa94d",
        highlight2: "#ffae58",
        lighter: "#fea440",
        light: "#ffbf60"
    },
    J: {
        normal: "#1983bf",
        highlight1: "#1997e3",
        highlight2: "#1997e3",
        lighter: "#1997e3",
        light: "#1ba6f9"
    },
    O: {
        normal: "#f7d33e",
        highlight1: "#ffe34b",
        highlight2: "#ffe34b",
        lighter: "#ffe34b",
        light: "#fff952"
    },
    X: {
        normal: "#686868",
        highlight1: "#686868",
        highlight2: "#686868",
        lighter: "#686868",
        light: "#949494"
    },
    Empty: { normal: "#f3f3ed" }
};

/**
 * @param {string} fumenText - Fumen text to be displayed
 * @param {number} [tilesize] - Size of each tile in pixels
 * @param {boolean} [transparent] - Whether to make empty tiles transparent
 * @param {number} [numrows] - Number of rows to display
* */
const FumenCanvas = ({ fumenText, tilesize, transparent, numrows, ...props }) => {
    
    // helper function
    function operationFilter(e) {
        return i == e.x && j == e.y
    }
    
    // input processing
    console.log(fumenText, "fumenText")
    const fumenPage = decoder.decode(fumenText)[0];
    const field = fumenPage.field
    const operation = fumenPage.operation
    
    // Default tilesize
    if (!tilesize) {
        tilesize = 32;
    }
    
    // Default transparent
    if(transparent == undefined) {
        transparent = true;
    }
    
    if(numrows == undefined) {
        numrows = 0;
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 23; j++) {
                if(field.at(i,j) != '_') {
                    numrows = Math.max(numrows, j);
                }
                if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                    numrows = Math.max(numrows, j);
                }
            }
        }
        numrows+=2
    }
    
    const width = tilesize*10;
    const height = numrows*tilesize;
    
    
    // Canvas reference
    // So we can draw on it
    const canvasRef = React.useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        
        if(!transparent) {
            context.fillStyle = colors['Empty'].normal
        }
        else {
            context.fillStyle = 'rgba(0, 0, 0, 0)'
        }
        context.fillRect(0, 0, width, height);
        
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < numrows; j++) {
                if(field.at(i,j) != '_') {
                    context.fillStyle = colors[field.at(i,j)].light
                    context.fillRect(i*tilesize, height-(j+1)*tilesize-tilesize/5, tilesize, tilesize+tilesize/5)
                }
                if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                    context.fillStyle = colors[operation.type].light
                    context.fillRect(i*tilesize, height-(j+1)*tilesize-tilesize/5, tilesize, tilesize+tilesize/5)
                }
            }
        }
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < numrows; j++) {
                if(field.at(i,j) != '_') {
                    context.fillStyle = colors[field.at(i,j)].normal
                    context.fillRect(i*tilesize, height-(j+1)*tilesize, tilesize, tilesize)
                }
                if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                    context.fillStyle = colors[operation.type].normal
                    context.fillRect(i*tilesize, height-(j+1)*tilesize, tilesize, tilesize)
                }
            }
        }
        
    }, []);
    
    return <canvas ref={canvasRef} width={width} height={height}/>;
}

export default FumenCanvas;