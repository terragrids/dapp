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
import usePrevious from 'hooks/use-previous.js'
import Button, { ButtonType } from 'components/button'

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
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [nextPageKey, setNextPageKey] = useState<string | null>(null)
    const [error, setError] = useState<Error | null>()
    const [selectedProject, setSelectedProject] = useState<string | null>()

    const fetchProjects = useCallback(async () => {
        if (!user || isFetching) return
        setIsFetching(true)
        setError(null)

        const response = await fetch(
            ownerWalletAddress
                ? endpoints.paginatedAccountProjects(ownerWalletAddress, nextPageKey)
                : endpoints.paginatedProjects(nextPageKey)
        )

        if (response.ok) {
            const jsonResponse = await response.json()
            setProjects(!projects ? jsonResponse.projects : projects.concat(jsonResponse.projects))
            setNextPageKey(jsonResponse.nextPageKey)
        } else {
            setError({ message: strings.errorFetchingProjects })
        }

        setIsFetching(false)
    }, [isFetching, nextPageKey, ownerWalletAddress, projects, user])

    const prevVisible = usePrevious(visible)
    useEffect(() => {
        if (visible && !prevVisible) {
            setProjects(null)
            setNextPageKey(null)
            setSelectedProject(null)
            setError(null)
        }
    }, [fetchProjects, prevVisible, visible])

    useEffect(() => {
        if (visible && !projects && !error) {
            fetchProjects()
        }
    }, [error, fetchProjects, projects, visible])

    function openProject(id: string) {
        setSelectedProject(id)
    }

    function fetchMoreProjects() {
        const hasMore = !!nextPageKey
        if (hasMore) fetchProjects()
    }

    function handleScroll(e: React.UIEvent<HTMLElement>) {
        const margin = 10
        const scroll = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - margin
        const bottom = scroll <= e.currentTarget.clientHeight
        if (bottom) {
            fetchMoreProjects()
        }
    }

    function close() {
        if (!selectedProject) onClose()
        else setSelectedProject(null)
    }

    function getTitle() {
        if (selectedProject) return projects?.find(project => project.id === selectedProject)?.name
        else return ownerWalletAddress ? strings.myProjects : strings.projects
    }

    return (
        <ModalDialog visible={visible} title={getTitle()} onClose={close} onScroll={handleScroll}>
            <div className={styles.container}>
                {!projects && !error && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}
                {projects && !selectedProject && (
                    <div className={styles.scrollContainer}>
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
                        {isFetching && (
                            <div className={styles.loading}>
                                <LoadingSpinner />
                            </div>
                        )}
                        {!isFetching && !!nextPageKey && (
                            <Button type={ButtonType.OUTLINE} label={strings.showMore} onClick={fetchMoreProjects} />
                        )}
                    </div>
                )}
                {selectedProject && <ProjectDetails id={selectedProject} />}
                {error && <div>{error.message}</div>}
            </div>
        </ModalDialog>
    )
}

export default ProjectsDialog
