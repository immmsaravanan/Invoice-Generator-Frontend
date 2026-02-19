import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import ConfirmationBox from "../ConfirmationBox";
import useGet from "../../hooks/useGet";
import { useNavigate, useParams } from "react-router-dom";
export default function  ClientAddressEdit()
{
const navigate = useNavigate()
const {client_gstin,index}= useParams()
const [ClientResponse,errClientResponse] = useGet(`/api/client/get/${client_gstin}`)
const [response,err] = usePost("/api/client/address/edit")
const [Confirmation,setConfirmation] = useState(false)
const [ClientData,setClientData] = useState()
const [ConfirmationBoxFunction,setConfirmationBoxFunction] = useState(()=>{})

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

//Client Data Error Log
if(errClientResponse)
        console.log(errClientResponse)

const [Address1,SetAddress1] = useState("")
const [Address2,SetAddress2] = useState("")
const [Address3,SetAddress3] = useState("")
const [State,setState] = useState("")
const [Code,setCode] = useState("")
const [Message,setMessage] = useState("")

useEffect(() => {
    if (ClientData) {
        const address = ClientData.client_addresses?.[index];
        async function setAdderess()
        {
        SetAddress1(address.address_line1 || "");
        SetAddress2(address.address_line2 || "");
        SetAddress3(address.address_line3 || "");
        setState(address.state || "");
        setCode(address.state_code || "");
        }setAdderess()
    }
}, [ClientData,index]);
function ChangeHandler(e,setState)
{
    const value = e.target.value
    setState(value)
}
async function HandleSubmit() {
                const CLientName = ClientData.client_name
                const ClientGSTIN = ClientData.client_gstin
                const Data = { name: CLientName, GSTIN: ClientGSTIN, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code, index:index }
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
                        navigate(`/client/view/address/${ClientData.client_gstin}`)
                } 
            }
return(
    <>
    {Confirmation && <ConfirmationBox message={"Are you sure you want to edit this?"} execute={ConfirmationBoxFunction} setHide={setConfirmation}/>}
    <button className="cursor-pointer" onClick={()=>navigate(`/client/view/address/${ClientData.client_gstin}`)}><img src="/icons/back_arrow.png" className="h-10 w-10" /></button>
    <br />
    <div className="bg-gray-200 h-230 w-full p-10 rounded-3xl">
                                                        <form onSubmit={(e) =>
                                                {
                                                e.preventDefault()
                                                setConfirmationBoxFunction( ()=>()=>{HandleSubmit()})
                                                setConfirmation(true)
                                                }
                                                }>
                                                        <h3 className="">Edit Client Details</h3>
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
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Edit</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={()=>navigate(`/client/view/address/${ClientData.client_gstin}`)}>Cancel</button>
                                                </form>
                                        </div>
                                        </>
)
}
