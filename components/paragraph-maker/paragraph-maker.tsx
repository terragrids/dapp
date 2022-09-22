import React from 'react'

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
                <p key={index}>{paragraph}</p>
            ))}
        </>
    )
}
