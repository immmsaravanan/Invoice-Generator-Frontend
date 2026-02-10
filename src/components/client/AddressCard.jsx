import { useContext, useEffect, useState } from "react"
import useDelete from "../../hooks/useDelete"
import ClientAddressEdit from "./ClientAddressEdit"
import { ClientData } from "../../contexts/Contexts.mjs"
import useFetch from "../../hooks/useFetch"
import ConfirmationBox from "../ConfirmationBox"
import ClientAddAdress from "./ClientAddAdress"
export default function AddressCard() {
    const [response, err] = useFetch("/api/client/get")
    const [Confirmation, setConfirmation] = useState(false)
    const [ConfirmationBoxFunction, setConfirmationBoxFunction] = useState(() => { })
    const clientdata = useContext(ClientData)
    const [Edit, setEdit] = useState({ data: null, status: false })
    const [Data, setData] = useState([])
    const [Add,setAdd] = useState(false)
    const [DeleteResponse, DeleteErr] = useDelete("/api/client/addressess/delete")
    const [DeleteStatus,setDeleteStatus] = useState(false)
    useEffect(() => {
        async function fetch() {
            const result = await response(clientdata)
            if (result.status)
                setData(result.data)
            if (err)
                console.log(err)
            if (result.err)
                console.log(result.err)
        }
        fetch()
    }, [response, err,clientdata, Edit,DeleteStatus,Add])

    async function handleDelete(body) {
        const response = await DeleteResponse(body)
        if (response) {
            if (response.status) {
                 setDeleteStatus(!DeleteStatus)
                setConfirmation(false)
            }
            if (response.err)
                console.log(response.err)
        }
        if (DeleteErr)
            console.log(DeleteErr)
    }
    return (
        <>
            {Confirmation && <ConfirmationBox message={"Are you sure you want to Delete this?"} execute={ConfirmationBoxFunction} setHide={setConfirmation} />}
            <h3>{Data.client_name} </h3>
            <h4 className="inline">GSTIN:</h4>{Data.client_gstin} <br />
            {!Add && !Edit.status && <button className="bg-blue-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-blue-700 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>setAdd(true)}>Add Address</button>}
            {!Add && !Edit.status && <div>
                {!Data.client_addresses?.length && <div className="text-center text-gray-400 mt-5">No Clients Addressess are found</div>}
                {Data.client_addresses && Data?.client_addresses?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="bg-gray-200 p-5 mt-5 rounded-3xl">
                                <h3>Address {index + 1}:</h3>
                                <br />
                                {item.address_line1 && <div>{item.address_line1} </div>}
                                {item.address_line2 && <div>{item.address_line2} </div>}
                                {item.address_line3 && <div>{item.address_line3} </div>}
                                {item.state && <span>{item.state}</span>} {item.state_code && <span>Code: {item.state_code}</span>}
                                <br />
                                <button className="bg-violet-500 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-violet-600 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5">Make Invoice</button>
                                <button className="bg-cyan-400 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-cyan-500 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={() => setEdit({ data: item, index: index, status: true })}>Edit</button>
                                <button className="bg-red-600 text-white text-xl rounded-3xl p-2 w-40 transform transition hover:bg-red-700 hover:scale-110 ease-in-out hover:duration-300 mr-3 mt-5" onClick={()=>{setConfirmationBoxFunction(() =>() =>handleDelete({ client_name:Data.client_name,client_gstin: Data.client_gstin, index: index }));setConfirmation(true)}}>Delete</button>
                            </div>
                            <br />
                        </div>
                    )
                })}
            </div>}
            {Edit.status && <ClientAddressEdit data={Edit.data} index={Edit.index} visible={setEdit} clientdata={Data} />}
            {Add && <ClientAddAdress setView={setAdd} visible={()=>(console.log("excuted"))} client_name={Data.client_name} client_gstin={Data.client_gstin}/>} 
        </>
    )
}