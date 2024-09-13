import { run } from 'chrome-har-capturer'

export const reduceExamples = (
    data: Record<string, any>,
    max_examples: number = 2
) => {
    for (const [key, value] of Object.entries(data)) {
        if (value instanceof Array) {
            data[key] = value.slice(0, max_examples)
        } else if (Object(value) === value) {
            data = reduceExamples(value)
        }
    }
    return data
}

export const setRequired = (data: Record<string, any>) => {
    // IF properties -> object
    // IF items -> array
    const type = data.type as string
    const required = data.required as string[]
    const properties = data.properties as Record<string, Record<string, any>>
    const items = data.items as Record<string, Record<string, any> | string>
    if (properties && required && type === 'object') {
        data.required = Object.keys(properties)
        Object.keys(properties).forEach((key) => {
            data.properties[key] = setRequired(data.properties[key])
        })
    } else if (items && type === 'array' && items.properties) {
        data.items.required = Object.keys(data.items.properties)
        Object.keys(data.items.properties).forEach((key) => {
            data.items.properties[key] = setRequired(data.items.properties[key])
        })
    }
    return data
}

export const getHAR = async (url: string[]) => {
    return new Promise((res, rej) => {
        const emitter = run(url, {
            content: true,
            retry: 3,
            retryDelay: 10,
            preHook: async (url, client) => {
                try {
                    const { Network } = client
                    await Network.setUserAgentOverride({
                        userAgent:
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
                    })
                    await Network.setBlockedURLs({
                        urls: [
                            // 'https://www.googletagmanager.com/*',
                            // 'https://akasha.cv/static*',
                            // 'https://enka.network*',
                            // 'https://cdn.intergient.com*',
                        ],
                    })
                } catch (err) {
                    console.error(err)
                }
            },
        })
        emitter.addListener('load', (url, index, string) => {
            console.log(url)
        })
        emitter.addListener('har', (har) => {
            res(har)
        })

        emitter.addListener('fail', (url, err, index) => {
            rej(`${err} on url ${url} (i=${index})`)
        })
    })
}
