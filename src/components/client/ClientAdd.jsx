import { useState } from "react"
import usePost from "../../hooks/usePost"
import ConfirmationBox from "../ConfirmationBox"
import { useNavigate } from "react-router-dom"
export default function ClientAdd()
{
//Declarations    
const navigate = useNavigate()
const [Message, setMessage] = useState("")
const [ConfirmationBoxShow,setConfirmationBoxShow] = useState()
const [ConfirmationBoxFunction,setConfirmationBoxFunction] =useState(()=>{})
const [response, err] = usePost("/api/client/add")

//Handle Submiting
async function HandleSubmit(e) {
                const CompanyName = e.ClientName
                const GSTIN = e.ClientGSTIN
                const Address1 = e.Address1
                const Address2 = e.Address2
                const Address3 = e.Address3
                const State = e.State
                const Code = e.Code
                const Data = { name: CompanyName, GSTIN: GSTIN, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code }
                const result = await response(Data)

                if (err) {
                        console.log(err)
                }
                if (result.message)
                {
                        setMessage(result.message)
                        setConfirmationBoxShow(false)
                }
                else
                {
                        setMessage("")
                }
                if (result.status)
                {
                        setConfirmationBoxShow(false)
                        navigate("/clients")
                }
        }

//Render
return(
    <>
    <div>
        {ConfirmationBoxShow && <ConfirmationBox message={"Are you sure you want to add this client?"} execute={ConfirmationBoxFunction} setHide={setConfirmationBoxShow}/>}
         <button className="cursor-pointer" onClick={()=>navigate(`/clients`)}><img src="/icons/back_arrow.png" className="h-10 w-10" /></button>                              
                                       <div className="bg-gray-200 h-230 w-full p-10 rounded-3xl">
                                                <form onSubmit={(e) =>{
                                                        e.preventDefault()
                                                        const formData = new FormData(e.currentTarget)
                                                        const dataObject = Object.fromEntries(formData.entries())
                                                        setConfirmationBoxFunction( ()=>()=>{HandleSubmit(dataObject)})
                                                        setConfirmationBoxShow(true)
                                                        }}>
                                                        <h3 className="">Add Client Details</h3>
                                                        <br />
                                                        Client Name:
                                                        <input type="text" name="ClientName" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" required />
                                                        GSTIN:
                                                        <input type="text" name="ClientGSTIN" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" required />
                                                        Address Line 1 (Optional):
                                                        <input type="text" name="Address1" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" />
                                                        Address Line 2 (Optional):
                                                        <input type="text" name="Address2" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" />
                                                        Adress Line 3 (Optional):
                                                        <input type="text" name="Address3" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" />
                                                        State (Optional):
                                                        <input type="text" name="State" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" />
                                                        State-Code (Optional):
                                                        <input type="text" name="Code" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" />
                                                        <br />
                                                        {Message && <div className="text-lg text-red-600">{Message}</div>}
                                                        <button className="bg-blue-600 text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit">Submit</button>
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={()=>navigate("/clients")}>Cancel</button>
                                                </form>
                                        </div>
                                </div> 
    </>
)
}