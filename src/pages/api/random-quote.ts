import { NextApiRequest, NextApiResponse } from 'next'

const randomQuote = (req: NextApiRequest, res: NextApiResponse) => {
  const { numberValue } = req.query
  const number = Math.floor(Math.random() * 30)
  res.status(200).json({
    quote: 'Write tests, not too many, mostly integration',
    author: 'Guillermo Rauch',
    number: Number(numberValue) || number,
  })
}

export default randomQuote