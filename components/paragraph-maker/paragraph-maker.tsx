import React from 'react'
import styles from './paragraph-maker.module.scss'

type Props = {
    text: string
}

export const ParagraphMaker = ({ text }: Props) => {
    const filterOutBlankElements = (array: string[]) =>
        array.filter(element => /\S/.test(element)).map(element => element.trim())

    const paragraphs = text ? filterOutBlankElements(text.split('\n')) : []
    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <p className={styles.paragraph} key={index}>
                    {paragraph}
                </p>
            ))}
        </>
    )
}
