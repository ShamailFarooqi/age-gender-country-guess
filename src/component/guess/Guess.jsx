"use client"
import { notFound } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { countryCodes } from "./countryCode";

export default function Guess(){

  const [text, setText] = useState("")
  const [name, setName] = useState("")


  const fetchUrls = (urls)=>{

    const f = (url) => fetch(url).then(res => res.json());
    if(name===""){
        return new Promise([])
    }
    return Promise.all(urls.map(api => f(api)))
    }
     const urls = [
          `https://api.agify.io?name=${name}`,
         `https://api.genderize.io/?name=${name}`,
         `https://api.nationalize.io/?name=${name}`
      ]
           
    const { data, error, mutate } = useSWR(urls, fetchUrls)

  const handleSubmit = (e) =>{
    e.preventDefault();
    mutate(setName(text))
   
  }  

  console.log(data)

    return(
        <div>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input value={text} onChange={(e)=>setText(e.target.value)}/>
          <button>Search</button>
        </form>
        </div>
        {data?.length >0 &&
        <div>
            <ul>
                <li>{data[0].name} age is {data[0].age} yrs</li>
                <li>{data[0].name} gender is{data[1].gender}</li>
                <li> {data[0].name} country is{countryCodes[data[2]['country'][0].country_id][name]} with code {data[2]['country'][0].country_id}</li>
            
            
           
            </ul>
        </div>
        }
        </div>
    )
}

