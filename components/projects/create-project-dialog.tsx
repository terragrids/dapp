import ModalDialog from 'components/modal-dialog'
import React from 'react'
import { strings } from 'strings/en'

type CreateProjectDialogProps = {
    visible: boolean
    onClose: () => void
}

const CreateProjectDialog = ({ visible, onClose }: CreateProjectDialogProps) => {
    return <ModalDialog visible={visible} title={strings.createProject} onClose={onClose}></ModalDialog>
}

export default CreateProjectDialog
