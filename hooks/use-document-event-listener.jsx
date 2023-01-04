import { useEffect } from 'react'

export function useDocumentEventListener(event, callback) {
    useEffect(() => {
        // Bind the event listener
        document.addEventListener(event, callback)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener(event, callback)
        }
    })
}
