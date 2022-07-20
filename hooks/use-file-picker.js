import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

export default function useFilePicker(props) {
    const fileInputRef = useRef(null)
    const [state, setState] = useState({ active: false })

    function openFileDialog() {
        if (props.disabled) return
        if (props.clearPickerAtLaunch) fileInputRef.current.value = ''
        fileInputRef.current.click()
    }

    function onDragOver(event) {
        event.preventDefault()
        if (props.disabled) return
        setState({ active: true })
    }

    function onDragLeave() {
        setState({ active: false })
    }

    function onDrop(event) {
        event.preventDefault()

        if (props.disabled) return

        const files = event.dataTransfer.files
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array)
        }
        setState({ active: false })
    }

    function onFilesAdded(event) {
        if (props.disabled) return
        const files = event.target.files
        if (props.onFilesAdded) {
            const array = fileListToArray(files)
            props.onFilesAdded(array)
        }
    }

    function fileListToArray(list) {
        const array = []
        for (let item of list) {
            array.push(item)
            if (!props.multiple) break
        }
        return array
    }

    return [state, fileInputRef, openFileDialog, onDragOver, onDragLeave, onDrop, onFilesAdded]
}

useFilePicker.propTypes = {
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    onFilesAdded: PropTypes.func
}
