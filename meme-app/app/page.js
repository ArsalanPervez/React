"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Home() {
  const [memes, setAllMemes] = useState([]);
  useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => {
              setAllMemes(data.data.memes)
            });
    }, []);
  return (
   <>
    <div className="navbar bg-neutral text-neutral-content">
      <button className="btn btn-ghost text-xl">
        MEME MAKER</button>
    </div>

    <div className="container w-full mx-auto">
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {memes && memes.map((item, index)=> {
            return (
              <div key={index} className="card bg-base-100 w-96 shadow-xl">
                  <figure className="px-10 pt-10 flex items-center justify-center">
                    <img
                      src={item.url}
                      alt="Shoes"
                      className="rounded-xl w-full h-[300px] mx-auto" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{item.name}</h2>
                    <div className="card-actions">
                      <Link href={{pathname: `/${item?.id}`, query: { url: item?.url, id: item?.id }}} className="btn btn-primary">Create Meme</Link>
                    </div>
                  </div>
              </div>
            )  
              
          })}
        </div>
    </div>
   </>
  );
}
