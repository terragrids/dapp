import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { ParagraphMaker } from './paragraph-maker'

afterEach(cleanup)

describe('ParagraphMaker', function () {
    it('shows paragraphs when line breaks are in text', async () => {
        const { getByText, getByTestId } = render(
            <div data-testid={'wrapper'}>
                <ParagraphMaker text={'Text 1\n  Text 2 \n\n Text 3'} />
            </div>
        )

        expect(getByText('Text 1')).toBeVisible()
        expect(getByText('Text 2')).toBeVisible()
        expect(getByText('Text 3')).toBeVisible()
        expect(getByTestId('wrapper')).toHaveTextContent('Text 1Text 2Text 3')
    })

    it('shows paragraphs when only line breaks are in text', async () => {
        const { getByTestId } = render(
            <div data-testid={'wrapper'}>
                <ParagraphMaker text={'\n\n'} />
            </div>
        )

        expect(getByTestId('wrapper')).toHaveTextContent('')
    })

    it('shows paragraphs when text is empty', async () => {
        const { getByTestId } = render(
            <div data-testid={'wrapper'}>
                <ParagraphMaker text={''} />
            </div>
        )

        expect(getByTestId('wrapper')).toHaveTextContent('')
    })
})
