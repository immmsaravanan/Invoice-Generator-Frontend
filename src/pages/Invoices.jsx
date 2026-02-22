import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGet from "../hooks/useGet"
export default function Invoices()
{
  //Declarations
  const [FormatDropDown,setFormatDropDown] = useState(false)
  const navigate = useNavigate()
  const [CompanyData,setCompanyData] = useState("")
  const [CompanyResponse,CompanyResponseErr] = useGet("/api/company/get")
  //useEffects
useEffect(()=>
{
async function fetch()
{
    const data = await CompanyResponse()
    if(data)
        setCompanyData(data.data)
}
fetch()
},[CompanyResponse])

//Company response err log
if(CompanyResponseErr)
{
    console.log(CompanyResponseErr)
}
  return(
        <>
            {CompanyData &&<h2>{CompanyData?.company_name}</h2>}
            <h2>Invoices</h2>
            <br />
            Formats:
            <div className="h-14 w-80 tablet:w-100 border-2 rounded-3xl border-gray-300 p-3 text-2xl font-bold flex justify-between cursor-pointer hover:bg-gray-300" onClick={()=>setFormatDropDown(!FormatDropDown)}><p className="inline">Test</p> <img className="h-7 w-5 inline" src="/icons/dropdown-arrow.svg" /></div>
            <button className="bg-blue-600 text-white rounded-3xl p-2 w-40 laptop:w-5/25 h-14 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300 inline mt-4" onClick={()=>navigate("/invoice/format/add")}>Add Format</button>
            {FormatDropDown && <div className="w-80 bg-black h-50 rounded-3xl mt-7 overflow-x-hidden">
            <ul className="text-white p-5">
                <li className="mt-5 cursor-pointer">item1</li>
            </ul>
            </div>}
        </>
        )

}