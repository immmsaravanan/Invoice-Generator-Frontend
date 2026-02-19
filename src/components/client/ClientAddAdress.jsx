import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import { useEffect, useState } from "react";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate, useParams } from "react-router-dom";
export default function ClientAddAdress()
{
const navigate = useNavigate()
const {client_gstin} =useParams()
const [ClientResponse,Clienterr] = useGet(`/api/client/get/${client_gstin}`)
const [ClientData,setClientData] = useState("")
const [response,err] = usePost("/api/client/address/add")
const [Confirmation,setConfirmation] = useState(false)
const [ConfirmationBoxFunction,setConfirmationBoxFunction] = useState(()=>{})
const [Address1,SetAddress1] = useState("")
const [Address2,SetAddress2] = useState("")
const [Address3,SetAddress3] = useState("")
const [State,setState] = useState("")
const [Code,setCode] = useState("")
const [Message,setMessage] = useState()

if(Clienterr)
        console.log(Clienterr)
//Client Data set Use Effect
useEffect(()=>{
        async function fetch(){
        const data = await ClientResponse();
        if(data)
        {
                const client = data.client
                setClientData(data?.data)
                SetAddress1(client?.address_line1 || "")
                SetAddress2(client?.address_line2 || "")
                SetAddress3(client?.address_line3 || "")
                setState(client?.state || "")
                setCode(client?.state_code || "")
        }
        }
fetch()
},[ClientResponse])
function ChangeHandler(e,setState)
{
    const value = e.target.value
    setState(value)
}
async function HandleSubmit() {

                const Data = {GSTIN: client_gstin, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code }
                const result = await response(Data)
                if (err) {
                        console.log(err)
                }
                if (result.message)
                {
                        setMessage(result.message)
                        setConfirmation(false)
                }
                else
                {
                        setMessage("")
                }
                if(result.err)
                    console.log(result.err)
                if(result.status)
                {
                        setConfirmation(false)
                        navigate(`/client/view/address/${client_gstin}`)
                } 
            }
return(
    <>
     {Confirmation && <ConfirmationBox message={"Are you sure you want to edit this?"} execute={ConfirmationBoxFunction} setHide={setConfirmation}/>}
      <button className="cursor-pointer" onClick={()=>navigate(`/client/view/address/${ClientData.client_gstin}`)}><img src="/icons/back_arrow.png" className="h-10 w-10" /></button>
    <br />
    <div className="bg-gray-200 h-180 w-full p-10 rounded-3xl">
                                                        <form onSubmit={(e) =>
                                                {
                                                e.preventDefault()
                                                setConfirmationBoxFunction( ()=>()=>{HandleSubmit()})
                                                setConfirmation(true)
                                                }
                                                }>
                                                        <h3 className="">Add Client Details</h3>
                                                        <br />
                                                        Address Line 1 (Optional):
                                                        <input type="text" name="Address1" value={Address1} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>ChangeHandler(e,SetAddress1)}/>
                                                        Address Line 2 (Optional):
                                                        <input  type="text" name="Address2" value={Address2} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>ChangeHandler(e,SetAddress2)} />
                                                        Adress Line 3 (Optional):
                                                        <input type="text" name="Address3" value={Address3} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>ChangeHandler(e,SetAddress3)} />
                                                        State (Optional):
                                                        <input  type="text" name="State" value={State} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>ChangeHandler(e,setState)} />
                                                        State-Code (Optional):
                                                        <input type="text" name="Code" value={Code} className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" onChange={(e)=>ChangeHandler(e,setCode)} />
                                                        <br />
                                                        {Message && <div className="text-lg text-red-600">{Message}</div>}
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Add</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={()=>{navigate(`/client/view/address/${client_gstin}`)}}>Cancel</button>
                                                </form>
                                        </div>
    </>
)
}