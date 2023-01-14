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
    static readonly REJECTED = new ProjectStatus('rejected', strings.rejected)
    static readonly EDITED = new ProjectStatus('approved-edited', strings.waitingForEditReview)
    static readonly ARCHIVED = new ProjectStatus('archived', strings.archived)

    // private to disallow creating other instances of this type
    private constructor(public readonly key: string, public readonly value: string) {}

    static list() {
        return [ProjectStatus.CREATED, ProjectStatus.APPROVED, ProjectStatus.REJECTED, ProjectStatus.ARCHIVED]
    }

    static getByKey(key: string): string {
        const status = this.list().find(status => status.key === key)
        return status ? status.value : ''
    }
}
