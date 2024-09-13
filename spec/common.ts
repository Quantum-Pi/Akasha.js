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
