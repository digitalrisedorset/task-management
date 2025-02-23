export interface graphQLVariables {
    [k: string]: string | number | {"connect": { "id": string} } | {"disconnect": boolean }
}