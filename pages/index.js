import Card from '../components/Card'
import { collection, getDoc, doc, setDoc } from "firebase/firestore"; 
import { useEffect, useState } from 'react'
import { db } from '../config/firebase'

export default function Home({ termInfo }) {

  return (
    <div className="main-bg w-full h-screen bg-gray-200 grid justify-center content-center">
      <Card wotdInfo={termInfo} />
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side
export async function getServerSideProps() {
  var termInfo = {}

  const docRef = await getDoc(doc(db, "stats", new Date().toDateString()));
  if (!docRef.data()) {
    // data does not exist for today
    const index = Math.floor(Math.random() * 125);
    const res = await fetch('https://web3-wotd.vercel.app/api/terms')
    const terms = await res.json()

    // Setting up the termInfo object
    termInfo = terms['terms'][index]
    termInfo['upvoted'] = 0
    termInfo['date'] = new Date().toDateString()

    // Adding a new entry for today's term
    await setDoc(doc(db, "stats", new Date().toDateString()), termInfo);
  } else {
    // data exists
    termInfo = docRef.data()
  }

  return {
    props: {
      termInfo
    }
  }
}