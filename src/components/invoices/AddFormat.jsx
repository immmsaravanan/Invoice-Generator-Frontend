import { useEffect, useState } from "react"
import { useForm,useFieldArray } from "react-hook-form"
import useGet from "../../hooks/useGet"
import { useNavigate } from "react-router-dom"
export default function AddFormat()
{
      const [CompanyResponse,CompanyResponseErr] = useGet("/api/company/get")
      const [CompanyData,setCompanyData] = useState("")
      const [FormData,setFormData] = useState()
      const navigate = useNavigate()
      const {register,handleSubmit,control} = useForm({
        defaultValues:
                {
               sgst_cgst:[
      { name: "", type: ""},
      { name: "", type: ""},
      { name: "", type: ""}],
                igst:[
      { name: "", type: ""},
      { name: "", type: ""},
      { name: "", type: ""}                  
                ]
}
         
      })

      const {fields:sgst_cgst,remove:sgst_cgst_remove,append:sgst_cgst_append} = useFieldArray({
        control,name:"sgst_cgst"
      })
            const {fields:igst,remove:igst_remove,append:igst_append} = useFieldArray({
        control,name:"igst"
      })


      const onSubmit = (data)=>setFormData(data)
      console.log(FormData)
      useEffect(()=>{
        async function fetch()
        {
                const result  = await CompanyResponse()
                if(result)
                        setCompanyData(result.data)
                        
        }
        fetch()
      },[CompanyResponse])
      if(CompanyResponseErr)
        console.log(CompanyResponseErr
)
      return(
        <>
        {CompanyData && <h2>{CompanyData.company_name}</h2>} <br />
        <h3>CGST & SGST</h3>
        <br />
        <h4 className="text-center">Fields And Its Types</h4>
        <hr className="border-3"/>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-80">
        <br />
        CGST & SGST Percentage: <input {...register("sgst_cgst_percentage",{required:true})} className=" border-2 mt-10 rounded-2xl h-15 p-3  hover:bg-gray-200 desktop:w-1/4 mb-5 tablet:mb-1 desktop:mr-5 w-full" placeholder="Percentage %"/> <span className="font-bold text-4xl"></span>
        {sgst_cgst.map((item,index)=>
        {
        
                //SGST AND CGST
                return(
                        <div key ={item.id}>
                                <input className=" border-2 mt-10 rounded-2xl h-15 p-3  hover:bg-gray-200 w-full tablet:w-2/4 mb-5 tablet:mb-1  " {...register(`sgst_cgst.${index}.name`,{required:true})} placeholder= {`Field ${index+1}`}/>
                                <select {...register(`sgst_cgst.${index}.type`,{required:true})} className="bg-transparent border-2 border-gray-300 rounded-3xl p-3 ml-5 hover:bg-gray-200">
                                <option value="" className="">Select Type</option>
                                <option value="string">Characters</option>
                                <option value="number">Number</option>
                                <option value= "date">Date</option>
                                </select> <img src="/icons/delete.png" className="h-10 cursor-pointer ml-3 inline hover:scale-110 ease-in-out hover:duration-300" onClick={()=>sgst_cgst_remove(index)}/>                       
                        </div>
                )
        })}
        <button className="bg-red-600 hover:bg-red-900 w-full rounded-3xl h-15 mobile:mt-4 tablet:mt-10 text-white font-bold tablet:w-1/4 tablet:ml-4 cursor-pointer p-3 hover:scale-110 ease-in-out hover:duration-300" type="button" onClick={()=>sgst_cgst_append({name:"",type:""})}>Add Fields</button>
        <h2 className="mt-10">Upload the Excel file for CGST & SGST</h2> <br />
        <input type="file" className="file:bg-blue-600 file:rounded-3xl file:p-5 mt-5 file:text-white file:font-bold hover:file:bg-blue-800 file:cursor-pointer font-bold" {...register("Cgst_sgst_file",{required:true})}/>
        <h3 className="mt-30">IGST</h3>
        <br />
        <h4 className="text-center">Fields And Its Types</h4>
        <hr className="border-3"/>
        <br />
        IGST Percentage: <input {...register("igst_percentage",{required:true})} className=" border-2 mt-10 rounded-2xl h-15 p-3  hover:bg-gray-200 desktop:w-1/4 mb-5 tablet:mb-1 desktop:mr-5 w-full" placeholder="Percentage %"/> <span className="font-bold text-4xl"></span>
        {igst.map((item,index)=>
        {
                //IGST
                return(
                        <div key ={item.id}>
                                <input className=" border-2 mt-10 rounded-2xl h-15 p-3  hover:bg-gray-200 w-full tablet:w-2/4 mb-5 tablet:mb-1  " {...register(`igst.${index}.name`,{required:true})} placeholder= {`Field ${index+1}`}/>
                                <select {...register(`igst.${index}.type`,{required:true})} className="bg-transparent border-2 border-gray-300 rounded-3xl p-3 ml-5 hover:bg-gray-200">
                                <option value="" className="">Select Type</option>
                                <option value="string">Characters</option>
                                <option value="number">Number</option>
                                <option value= "date">Date</option>
                                </select> <img src="/icons/delete.png" className="h-10 cursor-pointer ml-3 inline hover:scale-110 ease-in-out hover:duration-300" onClick={()=>igst_remove(index)}/>                       
                        </div>
                )
        })}
         <button className="bg-red-600 hover:bg-red-900 w-full rounded-3xl h-15 mobile:mt-4 tablet:mt-10 text-white font-bold tablet:w-1/4 tablet:ml-4 cursor-pointer p-3 hover:scale-110 ease-in-out hover:duration-300" type="button" onClick={()=>igst_append({name:"",type:""})}>Add Fields</button>
        <h2 className="mt-10">Upload the Excel file for IGST</h2> <br />
        <input type="file" className="file:bg-blue-600 file:rounded-3xl file:p-5 mt-5 file:text-white file:font-bold hover:file:bg-blue-800 file:cursor-pointer font-bold file:block" {...register("igst_file",{required:true})}/>
        <br />
        <button className="bg-blue-600 hover:bg-blue-800 w-full mt-20 rounded-3xl h-15 mobile:mt-4 tablet:mt-10 text-white font-bold tablet:w-1/4 tablet:ml-4 cursor-pointer p-3 hover:scale-110 ease-in-out hover:duration-300" type="submit">Submit</button>
        <button className="bg-black hover:bg-gray-700 tablet:ml-10 w-full mt-20 rounded-3xl h-15 mobile:mt-4 tablet:mt-10 text-white font-bold tablet:w-1/4 tablet:ml-4 cursor-pointer p-3 hover:scale-110 ease-in-out hover:duration-300" type="button" onClick={()=>navigate('/invoices')}>Cancel</button>
        
        </form>

        </>
      )
}