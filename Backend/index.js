const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
app.use(cors())
const port = 5000
app.use(express.json())
//Available Routes
app.use('/api/auth', require('./routes/authh'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port  http://localhost:${port}`)
})

