import styles from './project-details.module.scss'

type ProjectDetailsProps = {
    id: string
}

const ProjectDetails = ({ id }: ProjectDetailsProps) => {
    return <div className={styles.container}>{id}</div>
}

export default ProjectDetails
