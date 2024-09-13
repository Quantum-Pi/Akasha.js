import { generateSpec } from 'har-to-openapi'
import { readFileSync, writeFileSync } from 'fs'
import { reduceExamples, setRequired } from './common'

import YAML from 'js-yaml'
;(async () => {
    const profileHar = JSON.parse(
        readFileSync('./spec/akasha_profile.har').toString('utf-8')
    )
    // const leaderboardHar = JSON.parse(readFileSync('./spec/akasha_leaderboard.har').toString('utf-8'))
    const { yamlSpec, domain, spec } = await generateSpec(profileHar, {
        attemptToParameterizeUrl: true,
        dropPathsWithoutSuccessfulResponse: true,
        urlFilter: /akasha\.cv\/api\/.*/,
    })
    // Reduce examples to no more than 2
    for (const [path, methods] of Object.entries(spec.paths)) {
        const examples =
            methods.get.responses['200'].content['application/json'].example
        methods.get.responses['200'].content['application/json'].example =
            reduceExamples(examples, 1)
    }

    // Set fields as required
    for (const [path, methods] of Object.entries(spec.paths)) {
        const schema =
            methods.get.responses['200'].content['application/json'].schema
        methods.get.responses['200'].content['application/json'].schema =
            setRequired(schema)
    }
    writeFileSync('./spec/openapi.yaml', YAML.dump(spec))
    writeFileSync('./spec/openapi.json', JSON.stringify(spec))
})()
