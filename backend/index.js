const connectToMongo = require('./database');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

//Available routes
// app.get('/', (req, res) => {
//   res.send('Hello chirag')
// })
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})