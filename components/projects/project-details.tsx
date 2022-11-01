import { ContractLink } from 'components/contract-link'
import { Label } from 'components/label'
import LoadingSpinner from 'components/loading-spinner.js'
import { ParagraphMaker } from 'components/paragraph-maker/paragraph-maker'
import { ReachContext, ReachStdlib } from 'context/reach-context'
import { useCallback, useContext, useEffect, useState } from 'react'
import { strings } from 'strings/en.js'
import { endpoints } from 'utils/api-config.js'
import { getContractFromJsonString, ipfsUrlToGatewayUrl } from 'utils/string-utils.js'
import styles from './project-details.module.scss'

type ProjectDetailsProps = {
    id: string
}

type ProjectDetails = {
    contractId: string
    created: number
    logoUrl: string
    name: string
    description: string
}

const ProjectDetails = ({ id }: ProjectDetailsProps) => {
    const { stdlib } = useContext<ReachStdlib>(ReachContext)
    const [project, setProject] = useState<ProjectDetails | null>()
    const [error, setError] = useState<string | null>()

    const fetchProject = useCallback(async () => {
        if (!id) return
        setError(null)

        const response = await fetch(endpoints.project(id))

        if (response.ok) {
            const { url, created } = await response.json()

            const ipfsResponse = await fetch(ipfsUrlToGatewayUrl(url))

            if (ipfsResponse.ok) {
                const { name, image, description } = await ipfsResponse.json()
                const ipfsImageUrl = ipfsUrlToGatewayUrl(image)
                const contractId = stdlib.bigNumberToNumber(getContractFromJsonString(id))

                setProject({
                    contractId,
                    name,
                    created: parseInt(created),
                    logoUrl: ipfsImageUrl,
                    description: description.text as string
                } as ProjectDetails)
            }
        } else {
            setError(strings.errorFetchingProject)
        }
    }, [id, stdlib])

    useEffect(() => {
        fetchProject()
    }, [fetchProject])

    return (
        <div className={styles.container}>
            {!project && <LoadingSpinner />}
            {project && (
                <>
                    <div className={styles.name}>{project.name}</div>
                    <div className={styles.section}>
                        <img src={project.logoUrl} alt={project.name} className={styles.image} />
                    </div>
                    <div className={styles.section}>
                        <Label text={strings.contractId} />
                        <div className={styles.content}>
                            <ContractLink contractId={project.contractId} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <Label text={strings.created} />
                        <div className={styles.content}>{new Date(project.created).toLocaleDateString()}</div>
                    </div>
                    <div className={styles.section}>
                        <Label text={strings.description} />
                        <div className={styles.content}>
                            <ParagraphMaker text={project.description} />
                        </div>
                    </div>
                </>
            )}
            {error && <div>{error}</div>}
        </div>
    )
}

export default ProjectDetails
