'use client'

import React, { useEffect, useState } from 'react'
import {getProviders,signIn} from 'next-auth/react'
type Provider={
  id:string,
  name:string,
  type:string,
  signUrl:string,
  callbackUrl:string,
  signInUrlParams?:Record<string,string>|null
}
type Providers=Record<string,Provider>
export default function AuthProviders() {
   const [providers,setProviders] = useState<Providers|null>(null)
   
   useEffect(()=>{
    const fecthProviders = async ()=>{
      const res = await getProviders()
      console.log(res)
      setProviders(res)
    }
    fecthProviders()
   },[])
  
   console.log('PROVIDER: ',providers)
  if(providers){
    return(
        <div>
        {Object.values(providers).map((provider:Provider,i)=>
          (
            <button onClick={()=>signIn(provider.id)} key={i}>{provider.id}</button>
          )
        )}
    </div>
    )
  }
}
