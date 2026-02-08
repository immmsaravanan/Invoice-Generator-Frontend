import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import useFetch from "../hooks/useFetch";
import { Navigate } from "react-router-dom";
import useGet from "../hooks/useGet";
import ClientCard from "../components/ClientCard.jsx";


export default function Client() {
        const [response, err] = useFetch("/api/add/client")
        const [addClients, setaddClients] = useState(false)
        const [Message, setMessage] = useState("")
        const [Clients, setClients] = useState()
        const [fetchClients, Fetcherr] = useGet("/api/clients")
         useEffect(() => {
                        async function fetch() {
                                if (Fetcherr)
                                        console.log(Fetcherr)
                                const response =await fetchClients()
                                if (response)
                                        return setClients(response)
                                else 
                                        return null
                        }
                        fetch()
        }, [fetchClients,Fetcherr,addClients])
        const [HideAll,setHideAll] = useState(false)
        async function HandleView()
        {
                setHideAll(true)
        }
        async function HandleSubmitSignup(e) {
                e.preventDefault()
                const Form = new FormData(e.target)
                const CompanyName = Form.get("CompanyName")
                const GSTIN = Form.get("GSTIN")
                const Address1 = Form.get("Address1")
                const Address2 = Form.get("Address2")
                const Address3 = Form.get("Address3")
                const State = Form.get("State")
                const Code = Form.get("Code")
                const Data = { name: CompanyName, GSTIN: GSTIN, AddressLine1: Address1, AddressLine2: Address2, AddressLine3: Address3, state: State, code: Code }
                const result = await response(Data)
                if (err) {
                        console.log(err)
                }
                if (result.message)
                        setMessage(result.message)
                else
                        setMessage("")
                if (result.status)
                        setaddClients(false)
        }

        return (
                <>
                        <div className="h-screen grid grid-cols">
                                <Dashboard active="clients">
                                        {!HideAll && <div>
                                        {!addClients && <button className="bg-blue-700 p-3 rounded-3xl w-50 text-white hover:bg-blue-800 cursor-pointer transition-transform duration-400 hover:scale-110" onClick={() => { setaddClients(true) }}>Add Client</button>}
                                        {addClients && <div className="bg-gray-200 h-230 w-full p-10 rounded-3xl">
                                                <form onSubmit={(e) => HandleSubmitSignup(e)}>
                                                        <h3 className="">Add Client Details</h3>
                                                        <br />
                                                        Company Name:
                                                        <input type="text" name="CompanyName" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" required />
                                                        GSTIN:
                                                        <input type="text" name="GSTIN" className="border-2  border-gray-400 rounded-3xl  laptop:text-2xl mobile:w-full h-10  p-6  hover:border-black mb-4" required />
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
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={() => { setaddClients(false) }}>Cancel</button>
                                                </form>
                                        </div>}
                                { !Clients && <div className="text-center text-gray-400 mt-5">No Clients are found</div>}
                                </div> }
                                                                {!addClients && Clients && <div>{Clients.map((item,index)=>{
                                        return(
                                        <ClientCard key={index} name={item.client_name} gstin={item.client_gstin} onView={HandleView} View ={HideAll} addresses={item.client_addresses}/>
                                        )
                                })}</div>}
                                </Dashboard>
                        </div>
                </>
        )

}