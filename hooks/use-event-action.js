import { useState, useCallback } from 'react'

export function useEventAction() {
    const [actions, setActions] = useState([])
    const onEvent = useCallback(
        (...args) => {
            actions.forEach((action) => action(...args))
        },
        [actions]
    )
    const setEventAction = useCallback((action) => {
        setActions(() => [action])
    }, [])

    // Add addEventAction() when more than one handler is needed

    return [onEvent, setEventAction]
}
