import { createCanvas, Canvas } from "canvas";

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
 * Draw a Fumen page to a canvas
 * @param {Page} fumenPage Fumen page to draw
 * @param {number} [tilesize] Size of a tile
 * @param {number} [numrows] Number of rows to draw
 * @param {boolean} [transparent] Whether to draw transparently
 * @returns {Canvas} Canvas with the Fumen page drawn on it
 */
export function fumen2Canvas(fumenPage, tilesize, numrows, transparent) {

    const field = fumenPage.field
    const operation = fumenPage.operation
    
    if (transparent == undefined) {
        transparent = true;
    }

    function operationFilter(e) {
        return i == e.x && j == e.y
    }

    if(!numrows) {
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

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

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
    return canvas;
}
import GIFEncoder from 'gifencoder'

/**
 * Draw a Fumen page to a GIFencoder
 * @param {Page[]} fumenPages Fumen pages to draw
 * @param {number} tilesize Size of a tile
 * @param {number} numrows Number of rows to draw
 * @param {number} start Page to start drawing from
 * @param {number} end Page to stop drawing at
 * @param {boolean} transparent Whether to draw transparently
 * @return {GIFEncoder} GIFencoder with the Fumen pages drawn on it
 */
export function fumen2GIF(
    fumenPages,
    tilesize,
    numrows,
    start,
    end,
    transparent
) {
    if (end == undefined) {
        end = fumenPages.length;
    }
    if (numrows == undefined) {
        numrows = 0;
        function operationFilter(e) {
            return i == e.x && j == e.y;
        }
        for (let x = start; x < end; x++) {
            const { field } = fumenPages[x];
            const { operation } = fumenPages[x];
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 23; j++) {
                    if (field.at(i, j) != "_") {
                        numrows = Math.max(numrows, j);
                    }
                    if (
                        operation != undefined &&
                        operation.positions().filter(operationFilter).length > 0
                    ) {
                        numrows = Math.max(numrows, j);
                    }
                }
            }
        }
        numrows += 2;
    }
    numrows = Math.min(23, numrows);
    const width = tilesize * 10;
    const height = numrows * tilesize;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const encoder = new GIFEncoder(width, height);
    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(500); // frame delay in ms
    encoder.setQuality(1); // image quality. 10 is default.
    if (transparent) {
        encoder.setTransparent("rgba(0, 0, 0, 0)");
    }
    for (let x = start; x < end; x++) {
        encoder.addFrame(
            fumen2Canvas(fumenPages[x], tilesize, numrows, transparent).getContext("2d")
        );
    }
    return encoder;
}
