import { useState,useEffect } from "react"
import ConfirmationBox from "../ConfirmationBox"
import { useNavigate, useParams } from "react-router-dom"
import useGet from "../../hooks/useGet"
import usePost from "../../hooks/usePost"
export default function ClientEdit()
{
    const navigate = useNavigate()
    const {client_gstin} =useParams()
    const [ClientData,setClientData] = useState()
    const [ClientResponse,errClientResponse] = useGet(`/api/client/get/${client_gstin}`)
    const [Confirmation,setConfirmation]  = useState(false)
    const [ConfirmationFunction,setConfirmationFunction] = useState(()=>{})
    const [response,err] =  usePost("/api/client/edit")
    const [NewClientName,setNewClientName] = useState("")
    const [NewClientGSTIN,setNewClientGSTIN] = useState("")
    const [Message,setMessage] = useState()

//Client Fetch Error Log
if(errClientResponse)
    console.log(err)

    useEffect(()=>
    {
            async function fetch()
            {
                    const result = await ClientResponse()
                    if(result.status)
                            setClientData(result.data)
                    if(result.err)
                            console.log(result.err)
                     
            } fetch()
    },[ClientResponse,client_gstin])

    useEffect(() => {

        async function setClient()
        {
        setNewClientName(ClientData?.client_name || "")
        setNewClientGSTIN(ClientData?.client_gstin || "")
        }setClient()
    }, [ClientData]);

    async function HandleEdit()
    {
        const Data = {GSTIN:client_gstin,client_name:NewClientName,client_gstin:NewClientGSTIN,id:ClientData.id}
        const result = await response(Data)
        if(response)
        {
        if(result.status)
        {

            setConfirmation(false)
            navigate("/clients")
        }
        
        if(result.message)
            setMessage(result.message)
            setConfirmation(false)
        }

        if(err)
            console.log(err)
    }
    function onChangeHandler(e,setValue)
    {
        setValue(e.target.value)
    }
    return(
        <>
         <button className="cursor-pointer" onClick={()=>navigate(`/clients`)}><img src="/icons/back_arrow.png" className="h-10 w-10" /></button>                              
         <div className="bg-gray-200 h-120 w-full p-10 rounded-3xl">
            {Confirmation && <ConfirmationBox message={"Are you sure you want to edit this?"} execute={ConfirmationFunction} setHide={setConfirmation}/>}
                                     
                                                 <form onSubmit={(e) =>
                                                {
                                                e.preventDefault()
                                                setConfirmationFunction( ()=>()=>{HandleEdit()})
                                                setConfirmation(true)
                                                }
                                                }>
                                                        <h3 className="">Edit Client Details</h3>
                                                        <br />
                                                        Client Name:
                                                        <input type="text" value={NewClientName} name="ClientName" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>{onChangeHandler(e,setNewClientName)}} required />
                                                        GSTIN:
                                                        <input type="text" name="ClientGSTIN" value={NewClientGSTIN} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>{onChangeHandler(e,setNewClientGSTIN)}} required />
                                                        <br />
                                                        {Message && <div className="text-lg text-red-600">{Message}</div>}
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Edit</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={() => {navigate("/clients")}}>Cancel</button>
                                                </form>
                                        </div>
        </>
    )
}