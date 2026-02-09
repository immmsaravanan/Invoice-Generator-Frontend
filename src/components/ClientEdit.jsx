import { useContext, useState } from "react";
import { ClientData } from "../contexts/Contexts.mjs";
import useFetch from "../hooks/useFetch";
export default function  ClientEdit(props)
{
const [response,err] = useFetch("/api/client/edit")
const Data = useContext(ClientData)
const [Address1,SetAddress1] = useState(props.data.address_line1 || "")
const [Address2,SetAddress2] = useState(props.data.address_line2 || "")
const [Address3,SetAddress3] = useState(props.data.address_line3 || "")
const [State,setState] = useState(props.data.state || "")
const [Code,setCode] = useState(props.code || "")
const [Message,setMessage] = useState()
function ChangeHandler(e,setState)
{
    const value = e.target.value
    setState(value)
}
async function HandleSubmit(e) {
                e.preventDefault()
                const Form = new FormData(e.target)
                const CLientName = props.clientdata.name
                const ClientGSTIN = props.clientdata.gstin
                console.log(props.clientdata)
                const Address1 = Form.get("Address1")
                const Address2 = Form.get("Address2")
                const Address3 = Form.get("Address3")
                const State = Form.get("State")
                const Code = Form.get("Code")
                const Data = { name: CLientName, GSTIN: ClientGSTIN, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code, index:props.index }
                const result = await response(Data)
                if (err) {
                        console.log(err)
                }
                if (result.message)
                        setMessage(result.message)
                else
                        setMessage("")
                if(result.err)
                    console.log(result.err)
            }
return(
    <>
    <br />
    <div className="bg-gray-200 h-230 w-full p-10 rounded-3xl">
                                                <form onSubmit={(e) => HandleSubmit(e)}>
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
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Confirm</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300">Cancel</button>
                                                </form>
                                        </div>
                                        </>
)
}
