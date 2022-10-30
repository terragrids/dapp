import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { Project } from 'types/project.js'
import { endpoints } from 'utils/api-config.js'

type MyProjectsDialogProps = {
    visible: boolean
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const MyProjectsDialog = ({ visible, onClose }: MyProjectsDialogProps) => {
    const user = useContext<User>(UserContext)
    const [projects, setProjects] = useState<Array<Project>>([])
    const [error, setError] = useState<Error | null>()

    const fetchProjects = useCallback(async () => {
        if (!user) return
        setError(null)

        const response = await fetch(endpoints.accountProjects(user.walletAddress))

        if (response.ok) {
            const { projects } = await response.json()
            setProjects(projects)
        } else {
            setError({ message: strings.errorFetchingProjects })
        }
    }, [user])

    useEffect(() => {
        if (visible) fetchProjects()
    }, [fetchProjects, visible])

    return (
        <ModalDialog visible={visible} title={strings.myProjects} onClose={onClose}>
            {projects.map(project => (
                <div key={project.id}>{project.id}</div>
            ))}
            {error && <div>{error.message}</div>}
        </ModalDialog>
    )
}

export default MyProjectsDialog
