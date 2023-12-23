
function setValue(key, newValue) {
    window.localStorage.setItem(key, newValue);
    console.log('setValue', key, newValue)
    window.dispatchEvent(
        new StorageEvent("storage", { key, newValue })
    );
}

function handleKeydown(event) {
    if (event.repeat) return
    if (event.key === 'm') {
        setValue('mirrorState', !(window.localStorage.getItem('mirrorState') === 'true'))
    }
    if (event.key === 'g') {
        setValue('gridState', !(window.localStorage.getItem('gridState') === 'true'))
    }
}

window.addEventListener('keydown', handleKeydown)