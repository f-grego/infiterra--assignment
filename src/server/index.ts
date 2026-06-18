import express from 'express'
import cors from 'cors'
import { products, categories } from '../constants/mockData'

const app = express()
app.use(cors())

app.get('/products', (req, res) => {
  res.json(products)
})
app.get('/categories', (req, res) => {
  res.json(categories)
})

app.listen(8000, () => console.log('Server is running on port 8000'))