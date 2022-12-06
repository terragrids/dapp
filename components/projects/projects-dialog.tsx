import LoadingSpinner from 'components/loading-spinner.js'
import ModalDialog from 'components/modal-dialog'
import { UserContext } from 'context/user-context.js'
import { User } from 'hooks/use-user.js'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en'
import { Project } from 'types/project.js'
import { endpoints } from 'utils/api-config.js'
import ProjectDetails from './project-details'
import ProjectListItem from './projects-list-item'
import styles from './projects-dialog.module.scss'

type ProjectsDialogProps = {
    visible: boolean
    ownerWalletAddress: string | null
    onClose: () => void
}

type Error = {
    message: string
    description?: string
}

const ProjectsDialog = ({ visible, ownerWalletAddress = null, onClose }: ProjectsDialogProps) => {
    const user = useContext<User>(UserContext)
    const [projects, setProjects] = useState<Array<Project> | null>(null)
    const [error, setError] = useState<Error | null>()
    const [selectedProject, setSelectedProject] = useState<string | null>()

    const fetchProjects = useCallback(async () => {
        if (!user) return
        setError(null)

        const response = await fetch(
            ownerWalletAddress ? endpoints.accountProjects(ownerWalletAddress) : endpoints.projects
        )

        if (response.ok) {
            const { projects } = await response.json()
            setProjects(projects)
        } else {
            setError({ message: strings.errorFetchingProjects })
        }
    }, [ownerWalletAddress, user])

    useEffect(() => {
        if (visible) {
            setProjects(null)
            setSelectedProject(null)
            fetchProjects()
        }
    }, [fetchProjects, visible])

    function openProject(id: string) {
        setSelectedProject(id)
    }

    return (
        <ModalDialog
            visible={visible}
            title={ownerWalletAddress ? strings.myProjects : strings.projects}
            onClose={onClose}>
            {!projects && !error && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {projects && !selectedProject && (
                <>
                    {projects.map(project => (
                        <ProjectListItem
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            ownerWallet={project.creator}
                            imageUrl={project.offChainImageUrl}
                            onClick={openProject}
                        />
                    ))}
                </>
            )}
            {selectedProject && <ProjectDetails id={selectedProject} />}
            {error && <div>{error.message}</div>}
        </ModalDialog>
    )
}

export default ProjectsDialog
