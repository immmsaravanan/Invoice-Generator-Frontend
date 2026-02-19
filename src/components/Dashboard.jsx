import { useState,useEffect } from "react"
import useFetch from "../hooks/usePost"
import { Navigate,useNavigate,useLocation,Outlet } from "react-router-dom"
import { BiUser } from "react-icons/bi"
import { BiMenu } from "react-icons/bi"

export default function Dashboard()
{
    const url = useLocation();
    const navigate = useNavigate()
    const [Menu,setMenu]= useState()
    const [Logged,setLogged]= useState(true)
    const [LoggedPost,err]= useFetch("/api/loggedin")

    //Find The Active Page
    function FindActive(url)
    {
      const PathName = url.pathname
      if(PathName.startsWith("/clients") ||PathName.startsWith("/client"))
        return "clients"
      else if(PathName.startsWith("/stock"))
        return "stock"
      else if(PathName.startsWith("/invoices") || PathName.startsWith("/invoices"))
        return "invoices"
      else if(PathName.startsWith("/reports") || PathName.startsWith("/reports"))
        return "reports"
      else if(PathName.startsWith("/payments") || PathName.startsWith("/payments"))
        return "payments"
    }
    //active status
    const active = FindActive(url)
    useEffect(()=>
    {
        async function fetch()
        {
        const Login = await LoggedPost()
        if(!Login.status)
            return setLogged(false)
        }
        fetch()
    },[LoggedPost])
        if(err)
            console.log(err)
    return (
  <>
    {!Logged && <Navigate to="/login" />}

    {/* Top bar */}
    <div className="flex items-center justify-between px-10 py-4">
      <h2 className="text-xl font-bold">AI Invoice</h2>
            <span className="laptop:hidden cursor-pointer transform transition hover:scale-110">

        <BiMenu size={22} onClick={()=>setMenu(!Menu)}/>
      </span>
      <span className="cursor-pointer transform transition hover:scale-110">

        <BiUser size={22} />
      </span>
      </div>


    {/* Main layout */}
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <aside className={Menu?"laptop:hidden flex flex-col font-bold bg-gray-100 w-full text-center text-black rounded-3xl gap-6 p-4":"hidden font-bold bg-gray-100 w-full text-center text-black rounded-3xl gap-6 p-4"}>
        <span className={active=="reports" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/reports")}}>Reports</span>
        <span className={active=="invoices" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/invoices")}}>Invoices</span>
        <span className={active=="clients" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"}onClick={()=>{navigate("/clients")}}>Clients</span>
        <span className={active=="stock" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer" } onClick={()=>{navigate("/stock")}}>Stocks</span>
        <span className={active=="payments" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/payments")}}>Payments</span>
      </aside>

      <aside className="hidden laptop:flex flex-col font-bold bg-gray-100 w-60 text-center text-black rounded-3xl gap-6 p-4">
        <span className={active=="reports" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/reports")}}>Reports</span>
        <span className={active=="invoices" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/invoices")}}>Invoices</span>
        <span className={active=="clients" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"}onClick={()=>{navigate("/clients")}}>Clients</span>
        <span className={active=="stock" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer" } onClick={()=>{navigate("/stock")}}>Stocks</span>
        <span className={active=="payments" ?"bg-black text-white rounded-3xl p-3 cursor-pointer":"hover:bg-black hover:text-white rounded-3xl p-3 cursor-pointer"} onClick={()=>{navigate("/payments")}}>Payments</span>
      </aside>

      {/* Page Content */}
      <main className={Menu?"hidden p-6 overflow-y-auto":"flex-1 p-6 overflow-y-auto"}>
       <Outlet />
      </main>

    </div>
  </>
)

}