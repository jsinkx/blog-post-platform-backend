import express from 'express'

const app = express()

app.get('/', (_, res) => {
	res.send('Hello World!')
})

app.listen(5000, () => {
	console.log('App started 5000 port')
})
