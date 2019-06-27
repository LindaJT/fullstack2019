const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const gname = process.argv[3]
const gnumber = process.argv[4]

const url =
`mongodb+srv://lindajokinenthai:${password}@cluster0-8ognt.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!gname) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: gname,
        number: gnumber,
      })
      
      person.save().then(response => {
        console.log('added ' + gname + ' number ' + gnumber + ' to phonebook');
        mongoose.connection.close();
      })
}
