function render_mino_font() {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        // console.log(node.textContent)
        if (node.nodeType === document.TEXT_NODE) {
            const a = node.textContent.match(/[TLJSZIO]_tetramino/g);
            console.log(a)
            if (a != null) {
                a.forEach((tetramino) => {
                    const index = node.textContent.search(tetramino);
                    if (index >= 0) {
                        let range = document.createRange();
                        
                        range.setStart(node, index);
                        range.setEnd(node, index + 11); // "X_tetramino" always 11 characters long
                        range.deleteContents();
                        const e = document.createElement('span');
                        e.innerHTML = tetramino[0];
                        
                        switch (tetramino) {
                            case 'L_tetramino':
                                e.className = 'l_mino';
                                break;
                            case 'J_tetramino':
                                e.className = 'j_mino';
                                break;
                            case 'S_tetramino':
                                e.className = 's_mino';
                                break;
                            case 'Z_tetramino':
                                e.className = 'z_mino';
                                break;
                            case 'I_tetramino':
                                e.className = 'i_mino';
                                break;
                            case 'O_tetramino':
                                e.className = 'o_mino';
                                break;
                            case 'T_tetramino':
                                e.className = 't_mino';
                                break;
                        }
                        
                        range.insertNode(e);
                    }
                });
            }
        }
    }
}



document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setTimeout(() => {
            render_mino_font();
        }, 100);
    }
};

console.log('renderMinoFont.js loaded')

