import express from 'express'
import fs from 'fs'
import { appendFileFn, parseContent, readFileFn, stringifyContent, writeFileFn } from './functions.js'
// import { writeFileFn, readFileFn } from './functions.js'


const app = express()
app.use(express.json())
const PORT = 4000

app.get('/', async(req, res) => {
    try {
        readFileFn('./data/data.json').then(response => {
            res.json({message: 'Succesfully', data: parseContent(response)})
        })
    } catch (error) {
        console.log(error);
        return res.json({message: 'Failed to read', error: error})
    }
})

app.patch('/append', async(req, res) => {
    let appendData = req.body
    appendData = stringifyContent(appendData)
    
    try {
        appendFileFn('./data/data.txt', appendData)
        res.json({message: 'Successful'})
    } catch (error) {
        return res.json({message: 'Failed to append', error: error})
    }
})

app.post('/new', (req, res) => {
    let newData = req.body
    newData = stringifyContent(newData)
    
    try {
        writeFileFn('./data/dt.json', newData)
        return res.json({message: 'Successful'})        
    } catch (error) {
        console.log(error)
        return res.json({message: 'Failed to write', error: error})        
    }
})

app.get('/open', (req, res) => {
    fs.open('./data/file.txt', 'w', (err, file) => {
        if(err) return res.json({message: 'Failed to write', error: err})

        return res.json({message: 'Successful', file: file})
    })
})

app.get('/rename', (req, res) => {
    fs.rename('./data/file.txt', './data/rename.txt', (err) => {
        if(err) return res.json({message: 'Failed to rename', error: err})

        return res.json({message: 'Successful'})
    })
})

app.get('/delete', (req, res) => {
    fs.unlink('./data/rename.txt', (err) => {
        if(err) return res.json({message: 'Failed to delete', error: err})

        return res.json({message: 'Successful'})
    })
})

app.listen(PORT, () => console.log(`App running on port ${PORT}`))