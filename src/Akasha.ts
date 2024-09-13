import { operations } from './schema'

type GetCalculationsForUser =
    operations['getApiGetCalculationsForUserById']['responses']['200']['content']['application/json']

export default class AkashaAPI {
    private baseURL = 'https://akasha.cv/api/'
    private uuid: string

    constructor(uuid: string) {
        this.uuid = uuid
    }

    async getCalculationsForUser(): Promise<GetCalculationsForUser> {
        const url = `${this.baseURL}getCalculationsForUser/${this.uuid}`
        const response = await fetch(url, { method: 'GET' })
        return await response.json()
    }
}
