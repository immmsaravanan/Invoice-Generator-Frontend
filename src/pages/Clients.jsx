import { useState, useEffect } from "react";
import useGet from "../hooks/useGet";
import ClientCard from "../components/client/ClientCard.jsx";
import ConfirmationBox from "../components/ConfirmationBox.jsx";
import useDelete from "../hooks/useDelete.jsx";
import {useNavigate } from "react-router-dom";

export default function Client() {
        const navigate = useNavigate()
        const [Confirmation,setConfirmation] = useState()
        const [DeleteResponse,DeleteErr]=useDelete("/api/client/delete")
        const [DeleteStatus,setDeleteStatus] =useState("")
        const [ConfirmationBoxMessage,setConfirmationBoxMessgae] = useState()
        const [ConfirmationBoxFunction,setConfirmationBoxFunction] =useState(()=>{})
        const [editClient,seteditClient] = useState(false)
        const [Clients, setClients] = useState()
        const [fetchClients, Fetcherr] = useGet("/api/clients")
         useEffect(() => {
                        async function fetch() {
                                if (Fetcherr)
                                        console.log(Fetcherr)
                                const response =await fetchClients()
                                if (response.status)
                                        setClients(response.data)
                        }
                        fetch()
        }, [fetchClients,Fetcherr,DeleteStatus])

        async function handleDelete(name,body) {
                const response = await DeleteResponse(body)
                if (response) {
                    if (response.status) {
                        setConfirmation(false)
                    }
                      setDeleteStatus(!DeleteStatus)
                    if (response.err)
                        console.log(response.err)
                }
                if (DeleteErr)
                    console.log(DeleteErr)
            }
        
        return (
                <>
                        
                                {Confirmation && <ConfirmationBox message={ConfirmationBoxMessage} execute={ConfirmationBoxFunction} setHide={setConfirmation}/>}
                                <button className="bg-blue-700 p-3 h-16 rounded-3xl w-50 text-white hover:bg-blue-800 cursor-pointer transition-transform duration-400 hover:scale-110" onClick={()=>{navigate("/client/add")}}>Add Client</button> 
                                {Clients && <div>{Clients?.map((item,index)=>{
                                        return(
                                        <ClientCard key={index} index={index} name={item.client_name} gstin={item.client_gstin} onEdit={seteditClient} edit={editClient} addresses={item.client_addresses} deleteclient={()=>{setConfirmation(true);setConfirmationBoxMessgae("Are you sure you want to delete client "+item.client_name+"?");setConfirmationBoxFunction(()=>()=>handleDelete(item.client_name,{client_gstin:item.client_gstin}))}}/>
                                        )
                                })}</div>}
                        { !Clients?.length && <div className="text-center text-gray-400 mt-5">No Clients are found</div>}
                      
                </>
        )

}