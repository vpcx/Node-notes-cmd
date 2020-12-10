const { default: chalk } = require('chalk');
const fs = require('fs');
const { argv } = require('process');


const addNote =  (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=>note.title===title)
    const duplicateNote = notes.find((note)=>note.title===title)
    
    debugger

    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New note added..")

    } else {
        console.log("Duplicate note found")
    }
}

const saveNotes =  (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}



const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []

    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((notes) => notes.title !== title)

    // const newNotes=notes.filter(function(useless) {
    //     return useless.title !== title
    // } )

    if (newNotes.length!==notes.length){
        console.log(chalk.bgGreen.black('Note removed.'))
        saveNotes(newNotes)
    }else{
        console.log(chalk.bgRed.black('No note found.'))
    }

}

const listNotes=()=>{
    const notes= loadNotes()
    console.log('Your Notes')
    // console.log(notes.title)
    notes.forEach((note)=>{
        console.log(note.title)})
}

const readNotes=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=> note.title===title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)

    }else{
        console.log(chalk.bgRed('Note not found'))
    }
}

module.exports = {
    
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}