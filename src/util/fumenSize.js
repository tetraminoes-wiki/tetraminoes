export default function (numcols, field, operation) {
    function operationFilter(e) {
        return i == e.x && j == e.y
    }
    
    let numrows = 0;
    
    for(let i = 0; i < numcols; i++) {
        for(let j = 0; j < 23; j++) {
            if(field.at(i,j) != '_') {
                numrows = Math.max(numrows, j);
            }
            if(operation != undefined && operation.positions().filter(operationFilter).length > 0) {
                numrows = Math.max(numrows, j);
            }
        }
    }
    
    return numrows;
    
}