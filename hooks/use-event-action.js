import { useState, useCallback } from 'react'

export function useEventAction() {
    const [actions, setActions] = useState([])
    const onEvent = useCallback(() => {
        actions.forEach(action => action())
    }, [actions])
    const setEventAction = useCallback(action => {
        setActions(() => ([action]))
    }, [])

    // Add addEventAction() when more than one handler is needed 

    return [onEvent, setEventAction]
}