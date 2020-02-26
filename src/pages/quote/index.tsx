import { NextPage } from 'next'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Quote: NextPage = () => {
  const [data, setData] = useState({
    quote: '',
    author: '',
    number: 0,
  })

  useEffect(() => {
    const getRandomQuote = async () => {
      const res = await axios.get('/api/random-quote?numberValue=99')
      const randomQuote = res.data
      setData(randomQuote)
    }
    getRandomQuote()
  }, [])

  const { quote, author, number } = data

  return (
    <main className="center">
      <div className="quote">{quote}</div>
      <span className="author">- {author}</span>
      <span>- {number}</span>

      <style jsx>{`
        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
          text-align: center;
        }
        .quote {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
    </main>
  )
}

export default Quote