// const validator=require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const { listNotes } = require('./notes.js');
const notes = require('./notes.js')

// costum yargs version
yargs.version('1.1.0')
// yargs.parse()



//create add command

yargs.command({
    command: 'add',
    describe: "Add a new note.",
    builder: {
        title: {
            describe: "The note title",
            demandOption: true,
            type: 'string'

        },
        body: {
            describe: 'body of the title',
            demandOption: true,
            type: 'string'

        }

    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }

})
//create remove command

yargs.command({
    command: 'remove',
    describe: 'removing the note.',
    builder: {
        title:{
            describe:'the note title',
            demandOption:true,
            type:'string'
        }

    },
    handler (argv) {
        notes.removeNote(argv.title)
    }
})

//creating read command

yargs.command({
    command: 'read',
    describe: 'reads the note',
    builder: {
        title:{
            describe:'note title',
            demandOption:true,
            type:'string',
        }

    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

//creating list command

yargs.command({
    command: 'list',
    describe: 'lists your notes',
    //builder:{

    //},
    handler () {
        notes.listNotes()
    }
})


// add, remove, read , list
//console.log(yargs.argv)
yargs.parse()