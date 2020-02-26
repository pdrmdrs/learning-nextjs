import { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from 'src/shared/components/layout'

interface Props {
  name: string,
  summary: string,
  image?: string,
}

const Movie: NextPage<Props> = ({
  name,
  summary,
  image = null
}) => {
  const router = useRouter()

  return (
    <Layout>
      <h1>{name}</h1>
      <p>{summary}</p>
      {image && <img src={image} />}
    </Layout>
  )
}

Movie.getInitialProps = async (context) => {
  try {
    const { id } = context.query
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}`)
    const movie = {
      name: res.data.name,
      summary: res.data.summary.replace(/<[/]?[pb]>/g, ''),
      image: res.data.image?.medium
    }

    return movie
  } catch (err) {
    throw new Error(err)
  }
}

export default Movie