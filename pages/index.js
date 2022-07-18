import Card from '../components/Card'
import { useEffect } from 'react'

export default function Home({ data }) {

  return (
    <div className="main-bg w-full h-screen bg-gray-200 grid justify-center content-center">
      <Card data={data} />
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side
export async function getServerSideProps() {

  const index = Math.floor(Math.random() * 125);
  const res = await fetch('http://localhost:3000/api/terms')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}