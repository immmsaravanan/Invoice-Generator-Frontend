import { useContext,useState } from "react"
import { ClientData } from "../contexts/Contexts.mjs"
import ClientEdit from "./ClientEdit"
export default function AddressCard()
{
    const Data = useContext(ClientData)
    const [Edit,setEdit]= useState({data:null,status:false})
    return(
        <>
        <h3>{Data.name} </h3>
        <h4 className="inline">GSTIN:</h4>{Data.gstin} <br />
        {!Edit.status && <button className="bg-blue-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-blue-700 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Add Address</button>}
        {!Edit.status &&<div className="bg-gray-200 p-5 mt-5 rounded-3xl">
        {Data.addresses.map((item,index)=>{
            return(
            <div>
            <h3>Address {index +1}:</h3>
            <br />
            {item.address_line1 &&<div>{item.address_line1} </div>} 
            {item.address_line2 &&<div>{item.address_line2} </div>}
            {item.address_line3 &&<div>{item.address_line3} </div>}
            {item.state && <span>{item.state}</span>} {item.code && <span>Code: {item.code}</span>}
            <br />
            <button className="bg-violet-500 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-violet-600 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Make Invoice</button>
            <button className="bg-cyan-400 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-cyan-500 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>setEdit({data:item,index:index,status:true})}>Edit</button>
            <button className="bg-red-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-red-700 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Delete</button> 
            </div>
            )
        })}
        </div>}
        {Edit.status && <ClientEdit key={Edit.index} data={Edit.data} index={Edit.index} visible ={setEdit} clientdata ={Data}/>}
        </>
    )
}