import Image from 'next/image.js'
import React from 'react'
import styles from './projects-list-item.module.scss'

type ProjectListItemProps = {
    id: string
    name: string
    imageUrl: string
}

const ProjectListItem = ({ name, imageUrl }: ProjectListItemProps) => {
    return (
        <li className={styles.container}>
            <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={name} layout={'fill'} className={styles.image} />
            </div>
            <div className={styles.nameContainer}>{name}</div>
        </li>
    )
}

export default ProjectListItem
