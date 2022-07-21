import Card from '../components/Card'
import { getDoc, doc, setDoc } from "firebase/firestore"; 
import { db } from '../config/firebase'
import { useState, useEffect } from "react"
import DocumentMeta from 'react-document-meta';
import Head from 'next/head'


export default function Home() {

  const [data, setData] = useState({})
  const meta = {
    title: 'Web 3 - Word of the Day',
    description: 'Explore Web-3 terminology everyday',
    canonical: 'http://web3-wotd.vercel.app',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'web3,web,word,terms,everday,technology,definition,glossary,vocabulary'
      }
    }
  };

  useEffect(() => {
    const info = getData()
    info.then((value) => {
      setData(value)
    })
  }, [])

  return (
    <DocumentMeta {...meta}>
      <Head>
        <title>{meta.title}</title>
        <meta name="theme-color" content="#311E5C" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>" />
      </Head>
      <div className="main-bg w-full h-screen bg-gray-200 grid justify-center content-center">
        {data['term'] && <Card data={data} setData={setData} />}
      </div>
    </DocumentMeta>
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