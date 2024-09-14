import { generateSpec } from 'har-to-openapi'
import { writeFileSync } from 'fs'
import { getHAR, reduceExamples, setRequired } from './common'

import YAML from 'js-yaml'
;(async () => {
    const har = await getHAR([
        'https://akasha.cv/profile/605452914',
        'https://akasha.cv/leaderboards',
        'https://akasha.cv/builds',
        'https://akasha.cv/artifacts',
    ])

    writeFileSync('spec/tmp.har', JSON.stringify(har))
    const { spec } = await generateSpec(har, {
        attemptToParameterizeUrl: true,
        dropPathsWithoutSuccessfulResponse: true,
        urlFilter: /akasha\.cv\/api\/.*/,
        logErrors: true,
    })

    // Reduce examples to no more than 2
    for (const [path, methods] of Object.entries(spec.paths)) {
        const examples =
            methods.get.responses['200'].content['application/json']?.example
        if (examples) {
            methods.get.responses['200'].content['application/json'].example =
                reduceExamples(examples, 1)
        }
    }

    // Set fields as required
    for (const [path, methods] of Object.entries(spec.paths)) {
        const schema =
            methods.get.responses['200'].content['application/json']?.schema
        if (schema) {
            methods.get.responses['200'].content['application/json'].schema =
                setRequired(schema)
        }
    }

    writeFileSync('./spec/openapi.yaml', YAML.dump(spec))
    writeFileSync('./spec/openapi.json', JSON.stringify(spec))
})()
