import { operations } from './schema'

type GetCalculationsForUser =
    operations['getApiGetCalculationsForUserById']['responses']['200']['content']['application/json']

type GetApiFiltersArtifacts =
    operations['getApiFiltersArtifacts']['responses']['200']['content']['application/json']

type GetApiFiltersCategories =
    operations['getApiFiltersCategories']['responses']['200']['content']['application/json']

type GetApiFiltersCharacters =
    operations['getApiFiltersCharacters']['responses']['200']['content']['application/json']

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

    async getApiFiltersArtifacts(): Promise<GetApiFiltersArtifacts> {
        const url = `${this.baseURL}filters/artifacts`
        const response = await fetch(url, { method: 'GET' })
        return await response.json()
    }

    async getApiFiltersCategories(): Promise<GetApiFiltersCategories> {
        const url = `${this.baseURL}filters/categories`
        const response = await fetch(url, { method: 'GET' })
        return await response.json()
    }

    async getApiFiltersCharacters(): Promise<GetApiFiltersCharacters> {
        const url = `${this.baseURL}filters/characters`
        const response = await fetch(url, { method: 'GET' })
        return await response.json()
    }
}
