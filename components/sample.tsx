// TODO: Remove once other ts files are created
// This file needed to remove an error `No inputs were found in config file` in tsconfig.json
// Ref: https://stackoverflow.com/questions/41211566/tsconfig-json-buildno-inputs-were-found-in-config-file

import React from 'react'

const sample = () => {
    return <Text str={'hello'} />
}

const Text = ({ str }: { str: string }) => {
    return <p>{str}</p>
}

const sum = (a: number, b: number) => {
    return a + b
}
sum(1, 1)

export default sample
