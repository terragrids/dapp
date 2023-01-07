import { strings } from 'strings/en.js'

export type Project = {
    id: string
    created: string
    creator: string
    name: string
    offChainImageUrl: string
}

export class ProjectStatus {
    static readonly CREATED = new ProjectStatus('created', strings.waitingForApproval)
    static readonly APPROVED = new ProjectStatus('approved', strings.approved)
    static readonly EDITED = new ProjectStatus('approved-edited', strings.waitingForEditReview)
    static readonly ARCHIVED = new ProjectStatus('archived', strings.archived)

    // private to disallow creating other instances of this type
    private constructor(public readonly key: string, public readonly value: string) {}

    static list() {
        return [ProjectStatus.CREATED, ProjectStatus.APPROVED, ProjectStatus.EDITED, ProjectStatus.ARCHIVED]
    }
}
