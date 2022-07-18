import React, { useState, useEffect } from 'react'

const Card = () => {
    const [date, setDate] = useState(new Date().toLocaleDateString())
    const [data, setData] = useState({
        term: "blockchain",
        grammar: "noun",
        definition: "a system in which a record of transactions made in bitcoin or another cryptocurrency are maintained across several computers that are linked in a peer-to-peer network"
    })
    const options = {weekday: 'long', day: '2-digit', year: 'numeric', month: 'long' }

    useEffect(() => {
        setDate(new Date())
    }, [])
    

    return (
        <div class="bg-white border-none p-5 rounded-xl h-auto ml-[6%] mr-[6%] md:mx-0 items-center sm:max-w-sm shadow-md">
            <div class="text-center text-md text-gray-600 tracking-wide">{date.toLocaleString('en-US', options).replace(/,/,"")}</div>
            <div class="p-8 text-center">
                <div class="text-4xl font-semibold text-indigo-800">{data.term}</div>
                <div class="italic font-semibold text-emerald-700">{data.grammar}</div>
            </div>
            <div class="text-lg tracking-wide font-light px-8 pb-6 text-center">{data.definition}</div>
        </div>
    )
}

export default Card