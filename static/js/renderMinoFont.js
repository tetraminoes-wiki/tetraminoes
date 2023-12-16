let previousUrl = location.href;

function render_mino_font() {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        // console.log(node.textContent)
        if (node.nodeType === document.TEXT_NODE) {
            const a = node.textContent.match(/[TLJSZIO]_mino/i);
            console.log(a)
            if (a != null) {
                a.forEach((tetramino) => {
                    const index = node.textContent.search(tetramino);
                    
                    tetramino = tetramino.toLowerCase()
                    console.log(tetramino)
                    if (index >= 0) {
                        let range = document.createRange();
                        
                        range.setStart(node, index);
                        range.setEnd(node, index + 6); // "X_mino" always 6 characters long
                        range.deleteContents();
                        const e = document.createElement('span');
                        
                        e.innerHTML = tetramino[0].toUpperCase();
                        e.className = tetramino;
                        
                        range.insertNode(e);
                    }
                });
            }
        }
    }
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
        setTimeout(() => {
            render_mino_font();
        }, 100);
    }
})

const observer = new MutationObserver(function(mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        render_mino_font();
    }
});

const config = {subtree: true, childList: true};
observer.observe(document, config);

console.log('renderMinoFont.js loaded')

