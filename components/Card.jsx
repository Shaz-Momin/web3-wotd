import React, { useState, useEffect } from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { AiFillFire } from 'react-icons/ai'
import { db } from '../config/firebase'

const Card = ({ data, setData }) => {
    const [upvoted, setUpvoted] = useState(false)
    const [date, setDate] = useState(new Date().toLocaleDateString())
    const options = {weekday: 'long', day: '2-digit', year: 'numeric', month: 'long' }

    const activated = "bg-transparent bg-indigo-800  font-semibold text-white py-1.5 px-3 border border-indigo-800 hover:border-transparent rounded"
    const deactivated = "bg-transparent hover:bg-indigo-400 text-indigo-800 font-semibold hover:text-white py-1.5 px-3 border border-indigo-800 hover:border-transparent rounded"

    const handleUpvote = async (e) => {
        e.preventDefault()
        if (new Date().toDateString() != data.date) {
            // outdated data, refresh the page for new data (term)
            window.location.reload()
        } else {
            var votes = data.upvoted
            if (upvoted) {
                setUpvoted(false)
                localStorage.removeItem("upvoted")
                votes--
            } else {
                setUpvoted(true)
                localStorage.setItem("upvoted", true)
                votes++
            }
            setData({
                term: data.term,
                grammar: data.grammar,
                definition: data.definition,
                upvoted: votes,
                date: data.date
            })
        }
    }

    const upvote = async () => {
        await setDoc(doc(db, "stats", new Date().toDateString()), data);
    }

    useEffect(() => {
        setDate(new Date())
        const userClicked = localStorage.getItem("upvoted")
        if (userClicked) {
            setUpvoted(true)
        } else {
            setUpvoted(false)
        }
    }, [])

    useEffect(() => {
        if (data['term']) {
            // if data exists, update upvote
            upvote()
        }
    }, [data])


    return (
        <div className="bg-white border-none p-5 rounded-xl h-auto ml-[6%] mr-[6%] md:mx-0 items-center sm:max-w-sm md:max-w-md shadow-md">
            <div className="text-center text-md text-gray-600 tracking-wide">{date.toLocaleString('en-US', options).replace(/,/,"")}</div>
            <div className="p-8 text-center">
                <div className="text-4xl font-semibold text-indigo-800">{data.term}</div>
                <div className="italic font-semibold text-emerald-700">{data.grammar}</div>
            </div>
            <div className="text-lg tracking-wide font-light px-8 pb-6 text-center">{data.definition}</div>
            <div className="text-sm flex justify-between px-8 items-center pb-4">
                <button
                    onClick={handleUpvote}
                    className={upvoted ? activated : deactivated}>
                    <AiFillFire size={25} />
                </button>
                <div className="font-light pl-6">{data.upvoted != 1 ? data.upvoted + " people found this term interesting" : 
                    data.upvoted + " person found this term interesting"}</div>
            </div>
        </div>
    )
}

export default Card