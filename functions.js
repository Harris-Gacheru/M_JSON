import fs from 'fs'

export let readFileFn = async(data) => {
    fs.readFile('./data/data.json', "utf-8", async(err, data) => {
        if(err){
            console.log('Failed to read file. ', err)
        }
    
        data = await JSON.parse(data)
        res.send(data)
    })
}

export let writeFileFn = async(data) => {
    fs.writeFile('./data/data.json', data, (err) => {
        if(err) {
            console.log('Failed to write file.', err)
            return false
        } else{
            console.log('Successfully written.')
            return true
        }
    })
}