import fs from 'fs'

export let stringifyContent = (data) => {
    return JSON.stringify(data)
}

export let parseContent = (data) => {
    return JSON.parse(data)
}

export let readFileFn = async(path) => {
    const data = await fs.promises.readFile(path, "utf8")
    return data
}

export let appendFileFn = async(path, data) => {
    return await fs.promises.appendFile(path, data)
}

export let writeFileFn = async(path, data) => {
    return await fs.promises.writeFile(path, data)
}