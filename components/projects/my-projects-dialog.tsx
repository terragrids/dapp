import ModalDialog from 'components/modal-dialog'
import React, { useCallback, useEffect, useState } from 'react'
import { strings } from 'strings/en'

type MyProjectsDialogProps = {
    visible: boolean
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const MyProjectsDialog = ({ visible, onClose }: MyProjectsDialogProps) => {
    const [error, setError] = useState<Error | null>()

    const fetchProjects = useCallback(async () => {
        setError(null)
    }, [])

    useEffect(() => {
        if (visible) fetchProjects()
    }, [fetchProjects, visible])

    return (
        <ModalDialog visible={visible} title={strings.myProjects} onClose={onClose}>
            {strings.myProjects}
            {error && <div>{error.message}</div>}
        </ModalDialog>
    )
}

export default MyProjectsDialog
