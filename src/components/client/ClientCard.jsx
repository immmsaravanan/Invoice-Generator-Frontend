import { useState } from "react"
import { ClientData } from "../../contexts/Contexts.mjs";
import AddressCard from "./AddressCard";
import ClientEdit from "./ClientEdit";
import ClientAddAdress from "./ClientAddAdress";
export default function ClientCard(props)
{
const [View,setView] = useState(false) 
const [Edit,setEdit] =useState(false)   
const [Add,setAdd] = useState(false)

const Data = {client_name:props.name,client_gstin:props.gstin,index:props.index,setView:setView,onView:props.onView}

    return(
        <>
{!props.View && <div className="bg-gray-200 p-5 mt-5 rounded-3xl">
<h3>{props.name}</h3>
<h4 className="inline">GSTIN:</h4>{props.gstin} <br /><br />
<button className="bg-blue-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>{props.onView(true);setView(true)}}>View</button>
<button className="bg-green-500 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-green-600 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Bills</button>
<button className="bg-violet-500 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-violet-600 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Make Invoice</button>
<button className="bg-cyan-400 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-cyan-500 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>{setEdit(true);props.onView(true)}}>Edit</button>
<button className="bg-amber-500 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-amber-600 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>{setAdd(true);props.onView(true)}}>Add Address</button>
<button className="bg-red-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-red-700 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>props.deleteclient(props.name,{client_gstin:props.gstin})}>Delete</button> 
</div>}
{View && <ClientData.Provider value={Data}><AddressCard key={props.index} /></ClientData.Provider> }
{Edit && <ClientEdit client_name={props.name} client_gstin={props.gstin} setEdit={setEdit} setView={props.onView}/>}
{Add && <ClientAddAdress setView={props.onView} visible={setAdd} client_name={props.name} client_gstin={props.gstin} />}
 </>
    )
}