import React, { useState, useEffect } from 'react'

const Card = ({ wotdInfo }) => {
    const [date, setDate] = useState(new Date().toLocaleDateString())
    const [data, setData] = useState({
        term: "blockchain",
        grammar: "noun",
        definition: "a system in which a record of transactions made in bitcoin or another cryptocurrency are maintained across several computers that are linked in a peer-to-peer network"
    })
    const options = {weekday: 'long', day: '2-digit', year: 'numeric', month: 'long' }

    useEffect(() => {
        setDate(new Date())
        setData(wotdInfo)
    }, [])

    return (
        <div className="bg-white border-none p-5 rounded-xl h-auto ml-[6%] mr-[6%] md:mx-0 items-center sm:max-w-sm md:max-w-md shadow-md">
            <div className="text-center text-md text-gray-600 tracking-wide">{date.toLocaleString('en-US', options).replace(/,/,"")}</div>
            <div className="p-8 text-center">
                <div className="text-4xl font-semibold text-indigo-800">{data.term}</div>
                <div className="italic font-semibold text-emerald-700">{data.grammar}</div>
            </div>
            <div className="text-lg tracking-wide font-light px-8 pb-6 text-center">{data.definition}</div>
        </div>
    )
}

export default Card