export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    },
    openai: {
        apiKey: string
    }
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.NEXT_PUBLIC_KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `${process.env.NEXT_PUBLIC_KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    openai: {
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY??'notsetyet'
    }
}
