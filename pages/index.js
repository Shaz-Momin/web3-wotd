import Card from '../components/Card'
import { useEffect } from 'react'

export default function Home({ termInfo }) {
  console.log(termInfo)

  return (
    <div className="main-bg w-full h-screen bg-gray-200 grid justify-center content-center">
      <Card wotdInfo={termInfo} />
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side
export async function getServerSideProps() {

  const index = Math.floor(Math.random() * 125);
  const res = await fetch('https://web3-wotd.vercel.app/api/term')
  const termInfo = await res.json()

  return {
    props: {
      termInfo
    }
  }
}