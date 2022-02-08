// Da parse nos parametros da url
export function serialize(obj) {
    let queryString = ""
    for (let key in obj) {
        queryString += `&${key}=${obj[key]}`
    }
    return queryString
}