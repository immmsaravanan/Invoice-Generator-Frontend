import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ConfirmationBox from "./ConfirmationBox";
export default function  ClientAddressEdit(props)
{
const [response,err] = useFetch("/api/client/address/edit")
const [Confirmation,setConfirmation] = useState(false)
const [ConfirmationBoxFunction,setConfirmationBoxFunction] = useState(()=>{})
const [Address1,SetAddress1] = useState(props.data.address_line1 || "")
const [Address2,SetAddress2] = useState(props.data.address_line2 || "")
const [Address3,SetAddress3] = useState(props.data.address_line3 || "")
const [State,setState] = useState(props.data.state || "")
const [Code,setCode] = useState(props.data.state_code || "")
const [Message,setMessage] = useState()
function ChangeHandler(e,setState)
{
    const value = e.target.value
    setState(value)
}
async function HandleSubmit() {
                const CLientName = props.clientdata.client_name
                const ClientGSTIN = props.clientdata.client_gstin
                const Data = { name: CLientName, GSTIN: ClientGSTIN, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code, index:props.index }
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
                        props.visible(false)
                        setConfirmation(false)
                } 
            }
return(
    <>
    {Confirmation && <ConfirmationBox message={"Are you sure you want to edit this?"} execute={ConfirmationBoxFunction} setHide={setConfirmation}/>}

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
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={()=>props.visible({status:false})}>Cancel</button>
                                                </form>
                                        </div>
                                        </>
)
}
