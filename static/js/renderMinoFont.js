let previousUrl = location.href;

let reverseMappingLetters = {
    "l_mino": "j_mino",
    "j_mino": "l_mino",
    "s_mino": "z_mino",
    "z_mino": "s_mino",
    "t_mino": "t_mino",
    "o_mino": "o_mino",
    "i_mino": "i_mino",
}

function render_mino_font(element) {
    if(element === undefined) {
        element = document.body;
    }
    
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        // console.log(node.textContent)
        if (node.nodeType === document.TEXT_NODE) {
            const a = node.textContent.match(/[TLJSZIO]_mino/i);
            // console.log(a)
            if (a != null) {
                a.forEach((tetramino) => {
                    const index = node.textContent.search(tetramino);
                    tetramino = tetramino.toLowerCase()
                    // console.log(tetramino)
                    if (index >= 0) {
                        let range = document.createRange();
                        
                        range.setStart(node, index);
                        range.setEnd(node, index + 6); // "X_mino" always 6 characters long
                        range.deleteContents();
                        const e = document.createElement('span');
                        
                        e.setAttribute("mino", tetramino);
                        
                        
                        if(window.localStorage.getItem("mirrorState") === "true") {
                            e.innerHTML = reverseMappingLetters[tetramino][0].toUpperCase();
                            e.className = reverseMappingLetters[tetramino];
                        }else {
                            e.innerHTML = tetramino[0].toUpperCase();
                            e.className = tetramino;
                        }
                        
                        
                        range.insertNode(e);
                    }
                });
            }
        }
    }
}

let shouldRender = false;
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
        shouldRender = true;
    }
})

i = 0;

const observer = new MutationObserver(function(mutations) {
    if(shouldRender) {
        render_mino_font();
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);

window.addEventListener("storage", function(e) {
    if (e.key === "mirrorState") {
        let minos = document.querySelectorAll("[mino]");
        for (let i = 0; i < minos.length; i++) {
            let mino = minos[i];
            let minoName = mino.getAttribute("mino");
            if (e.newValue === "true") {
                mino.innerHTML = reverseMappingLetters[minoName][0].toUpperCase();
                mino.className = reverseMappingLetters[minoName];
            } else {
                mino.innerHTML = minoName[0].toUpperCase();
                mino.className = minoName;
            }
        }
    }
});

console.log('renderMinoFont.js loaded')

