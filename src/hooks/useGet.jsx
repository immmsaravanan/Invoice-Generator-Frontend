import { useState,useCallback } from "react";

export default  function useGet(url)
{
const [Err,setErr]= useState()
const post = useCallback(async()=>
{
let res;
try{
     res = await fetch("http://localhost:3000"+url,{
    method:'GET',
    credentials: "include"
   
})

}
catch(e)
{
setErr(e)
}
const response= await res.json()
return response
},[url])
return [post,Err]

}