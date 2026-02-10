import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import useFetch from "../hooks/useFetch";
import useGet from "../hooks/useGet";
import ClientCard from "../components/client/ClientCard.jsx";
import ConfirmationBox from "../components/ConfirmationBox.jsx";
import useDelete from "../hooks/useDelete.jsx";

export default function Client() {
        const [Confirmation,setConfirmation] = useState()
        const [DeleteResponse,DeleteErr]=useDelete("/api/client/delete")
        const [DeleteStatus,setDeleteStatus] =useState("")
        const [ConfirmationBoxMessage,setConfirmationBoxMessgae] = useState()
        const [ConfirmationBoxFunction,setConfirmationBoxFunction] =useState(()=>{})
        const [response, err] = useFetch("/api/client/add")
        const [addClients, setaddClients] = useState(false)
        const [editClient,seteditClient] = useState(false)
        const [Message, setMessage] = useState("")
        const [Clients, setClients] = useState()
        const [HideAll,setHideAll] = useState(false)
        const [fetchClients, Fetcherr] = useGet("/api/clients")
         useEffect(() => {
                        async function fetch() {
                                if (Fetcherr)
                                        console.log(Fetcherr)
                                const response =await fetchClients()
                                if (response.status)
                                        setClients(response.data)
                                if(response.err)
                                        console.log(err)
                        }
                        fetch()
        }, [fetchClients,Fetcherr,addClients,err,HideAll,DeleteStatus])
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
                        setConfirmation(false)
                }
                else
                {
                        setMessage("")
                }
                if (result.status)
                        setaddClients(false)
                        setConfirmation(false)
        }

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
                        <div className="h-screen grid grid-cols">
                                <Dashboard active="clients">
                                        {Confirmation && <ConfirmationBox message={ConfirmationBoxMessage} execute={ConfirmationBoxFunction} setHide={setConfirmation}/>}
                                        {!HideAll && <div>
                                        {!addClients && <button className="bg-blue-700 p-3 rounded-3xl w-50 text-white hover:bg-blue-800 cursor-pointer transition-transform duration-400 hover:scale-110" onClick={() => { setaddClients(true) }}>Add Client</button>}
                                        {addClients && <div className="bg-gray-200 h-230 w-full p-10 rounded-3xl">
                                                <form onSubmit={(e) =>{
                                                        e.preventDefault()
                                                        const formData = new FormData(e.currentTarget)
                                                        const dataObject = Object.fromEntries(formData.entries())
                                                        setConfirmationBoxMessgae("Are you sure you want to save the client information")
                                                        setConfirmationBoxFunction( ()=>()=>{HandleSubmit(dataObject)})
                                                        setConfirmation(true)
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
                                                        <button className="bg-black text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={() =>{ setaddClients(false) }}>Cancel</button>
                                                </form>
                                        </div>}
                                { !Clients && <div className="text-center text-gray-400 mt-5">No Clients are found</div>}
                                </div> }
                                {!addClients && Clients && <div>{Clients?.map((item,index)=>{
                                        return(
                                        <ClientCard key={index} index={index} name={item.client_name} gstin={item.client_gstin} onView={setHideAll} onEdit={seteditClient} edit={editClient} View ={HideAll} addresses={item.client_addresses} deleteclient={()=>{setConfirmation(true);setConfirmationBoxMessgae("Are you sure you want to delete client "+item.client_name+"?");setConfirmationBoxFunction(()=>()=>handleDelete(item.client_name,{client_gstin:item.client_gstin}))}}/>
                                        )
                                })}</div>}
                                </Dashboard>
                        </div>
                </>
        )

}