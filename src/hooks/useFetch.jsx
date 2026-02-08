import { useState } from "react";

export default  function useFetch(url)
{
const [Err,setErr]= useState()
const get = async(body)=>
{
let res;
try{
     res = await fetch("http://localhost:3000"+url,{
    method:'POST',
    body:JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
   
})

}
catch(e)
{
setErr(e)
}
const response= await res.json()
return response
}
return [get,Err]

}