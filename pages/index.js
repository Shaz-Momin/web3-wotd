import Card from '../components/Card'
import { getDoc, doc, setDoc } from "firebase/firestore"; 
import { db } from '../config/firebase'
import { useState, useEffect } from "react"

export default function Home() {

  const [data, setData] = useState({})

  useEffect(() => {
    const info = getData()
    info.then((value) => {
      setData(value)
    })
  }, [])

  return (
    <div className="main-bg w-full h-screen bg-gray-200 grid justify-center content-center">
      {data['term'] && <Card data={data} setData={setData} />}
    </div>
  )
}

const getData = async () => {
  var termInfo = {}

  const docRef = await getDoc(doc(db, "stats", new Date().toDateString()))
  if (!docRef.data()) {
    // data does not exist for today
    const index = Math.floor(Math.random() * 125);
    const res = await fetch('https://web3-wotd.vercel.app/api/terms')
    const terms = await res.json()

    // Setting up the termInfo object
    termInfo = terms['terms'][index]
    termInfo['date'] = new Date().toDateString()
    termInfo['upvoted'] = 0

    // remove upvoted token from last time (if exists)
    localStorage.removeItem("upvoted")

    // Adding a new entry for today's term
    await setDoc(doc(db, "stats", new Date().toDateString()), termInfo);
  } else {
    // data exists
    termInfo = docRef.data()
  }

  return termInfo
}