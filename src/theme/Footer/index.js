import React from 'react';
import Footer from '@theme-original/Footer';
import {useLocalStorageStateBool} from "@site/src/util/useLocalStorageState";

export default function FooterWrapper(props) {
    
    const [mirrorState, setMirroredState] = useLocalStorageStateBool('mirrorState', false)
    const [gridState, setGridState] = useLocalStorageStateBool('gridState', false)
    
    // keybinds
    React.useEffect(() => {
        function handleKeydown(event) {
            if (event.repeat) return
            if (event.key === 'm') {
                setMirroredState(!mirrorState)
            }
            if (event.key === 'g') {
                setGridState(!gridState)
            }
        }
        
        window.addEventListener('keydown', handleKeydown)
        
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [mirrorState, gridState])
    
    return (
        <>
            <Footer {...props} />
        </>
    );
}
