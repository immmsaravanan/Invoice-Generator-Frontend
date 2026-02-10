import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import ConfirmationBox from "../ConfirmationBox"
export default function ClientEdit(props)
{
    const [Confirmation,setConfirmation]  = useState(false)
    const [ConfirmationFunction,setConfirmationFunction] = useState(()=>{})
    const [response,err] = useFetch("/api/client/edit")
    const [NewClientName,setNewClientName] = useState(props.client_name)
    const [NewClientGSTIN,setNewClientGSTIN] = useState(props.client_gstin)
    const [Message,setMessage] = useState()
    async function HandleEdit()
    {
        const Data = {GSTIN:props.client_gstin,client_name:NewClientName,client_gstin:NewClientGSTIN}
        const result = await response(Data)
        if(response)
        {
        if(result.status)
        {
            props.setEdit(false)
            props.setView(false)
            setConfirmation(false)
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
         <div className="bg-gray-200 h-120 w-full p-10 rounded-3xl">
            {Confirmation && <ConfirmationBox message={"Are you sure you want to edit this?"} execute={ConfirmationFunction} setHide={setConfirmation}/>}
                                                 <form onSubmit={(e) =>
                                                {
                                                e.preventDefault()
                                                setConfirmationFunction( ()=>()=>{HandleEdit()})
                                                setConfirmation(true)
                                                }
                                                }>
                                                        <h3 className="">Add Client Details</h3>
                                                        <br />
                                                        Client Name:
                                                        <input type="text" value={NewClientName} name="ClientName" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>{onChangeHandler(e,setNewClientName)}} required />
                                                        GSTIN:
                                                        <input type="text" name="ClientGSTIN" value={NewClientGSTIN} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>{onChangeHandler(e,setNewClientGSTIN)}} required />
                                                        <br />
                                                        {Message && <div className="text-lg text-red-600">{Message}</div>}
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Edit</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={() => { props.setEdit(false);props.setView(false) }}>Cancel</button>
                                                </form>
                                        </div>
        </>
    )
}