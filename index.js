import express from 'express'
import fs from 'fs'
// import { writeFileFn, readFileFn } from './functions.js'


const app = express()
app.use(express.json())
const PORT = 4000

app.get('/', async(req, res) => {
    fs.readFile('./data/data.json', "utf-8", async(err, data) => {
        if(err){
            console.log('Failed to read file. ', err)
        }
    
        data = await JSON.parse(data)
        res.send(data)
    })
})



app.post('/new', (req, res) => {
    let newData = req.body
    
    fs.readFile('./data/data.json', "utf-8", async(err, data) => {
        if(err){
            console.log('Failed to read file. ', err)
        }
        
        try {
            if (data) {
                data = await JSON.parse(data)                
                data.projects.push(newData)
                data = JSON.stringify(data)
                
                fs.writeFile('./data/data.json', data, (err) => {
                    if(err) {
                        console.log('Failed to write file.', err)
                        return res.json({error: err})
                    } else{
                        console.log('Successfully written.')
                        return res.json({message: 'Successfully written'})
                    }
                })
            } else {
                let feedData = {projects: [newData]}
                feedData = JSON.stringify(feedData)
                
                fs.writeFile('./data/data.json', feedData, (err) => {
                    if(err) {
                        return res.json({error: err})
                    } else{
                        return res.json({message: 'Successfully written'})
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({error: error})
        }
    })
})

app.listen(PORT, () => console.log(`App running on port ${PORT}`))