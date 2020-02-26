import { NextPage } from 'next'
import axios from 'axios'
import Layout from 'src/shared/components/layout'
import Link from 'next/link'

type Show = {
  show: Movie
}

type Movie = {
  id: string,
  name: string
}

type Props = {
  movies?: Array<Movie>
}

const Home: NextPage<Props> = ({ movies = [] }) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {movies.map((movie: Movie, index) => (
        <li key={`movie_${index}_${movie.id}`}>
          <Link href="/movie/[id]" as={`/movie/${movie.id}`}>
            <a>{movie.name}</a>
          </Link>
        </li>
      )) }
    </ul>
    <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
  </Layout>
)

Home.getInitialProps = async () => {
  try {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const movies: Array<Movie> = res.data.map((show: Show) => ({
      name: show.show.name,
      id: show.show.id
    }))
    return {
      movies,
    }
  } catch (err) {
    throw new Error(err)
  }
}

export default Home