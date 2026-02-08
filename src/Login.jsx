import { useState } from "react"
import useFetch from "./hooks/useFetch"
import { Navigate, useNavigate } from "react-router-dom"
export default function Login() {

  //declarations
  const [login, setLogin] = useState(true)
  const [signinon, setSigninon] = useState('inline-block p-2 text-2xl text-black  rounded-3xl ')
  const [loginon, setLoginon] = useState('inline-block p-2 text-2xl text-white bg-black rounded-3xl')
  const navigate = useNavigate()
  const [PostLogin, errLogin] = useFetch('/api/login')
  const [PostSignup, errSignup] = useFetch('/api/signup')
  const [ErrSignup, setErrSignup] = useState(null);
  const [ErrLogin, setErrLogin] = useState(null);
  const [sucessLogin,setSucessLogin] = useState(false);

  async function HandleSubmitLogin(e) {
    e.preventDefault()
    const Form = new FormData(e.target)
    const UsernameLogin = Form.get('UsernameLogin')
    const PasswordLogin = Form.get("PasswordLogin")

    const LoginObject = { username: UsernameLogin, password: PasswordLogin }
    const response= await PostLogin(LoginObject)
    if(response.status)
      setSucessLogin(true)
      if(response.err)
    {
    setErrLogin(response.err);
    }
      else{
      setErrLogin(null)
    }
    if(errLogin)
      console.log(errLogin)
    
  }

  async function HandleSubmitSignup(e) {
    e.preventDefault()
    const Form = new FormData(e.target)
    const CompanyName = Form.get("CompanyName")
    const CompanyEmail = Form.get("CompanyEmail")
    const GSTIN = Form.get("GSTIN")
    const UsernameSignup = Form.get("UsernameSignup")
    const PasswordSignup = Form.get("PasswordSignup")
    const ReTypePasswordSignup = Form.get("ReTypePasswordSignup")
    const ContactNumber = Form.get("ContactNumber")
    const AddressLine1 = Form.get("AddressLine1")
    const Addressline2 = Form.get("Addressline2")
    const AddressLine3 = Form.get("AddressLine3")
    const State = Form.get("State")
    const Country = Form.get("Country")

    const LoginObject = { company_name: CompanyName, company_email: CompanyEmail, gstin: GSTIN, username: UsernameSignup, password: PasswordSignup, confirm_password: ReTypePasswordSignup,address_line1: AddressLine1, address_line2:Addressline2,address_line3:AddressLine3,state:State,country:Country,contact_number:ContactNumber}
    const response = await PostSignup(LoginObject)
    if(response.status)
       setSucessLogin(true)
    if(errSignup)
          console.log("fetch: \n"+errSignup)
    if(response.err)
    {
    setErrSignup(response.err);
    }
    else{
      setErrSignup(null)
    }
  }


  //functions
  function toggle(n) {
    if (n) {
      setLoginon('inline-block p-2 text-2xl text-white bg-black rounded-3xl')
      setSigninon('inline-block p-2 text-2xl text-black  hover:bg-gray-300 rounded-3xl transform transition hover:scale-110 ease-in-out hover:duration-300')
      setLogin(true)
    }
    else {
      setLoginon('inline-block p-2 text-2xl text-black  rounded-3xl hover:bg-gray-300 rounded-3xl transform transition hover:scale-110 ease-in-out hover:duration-300')
      setSigninon('inline-block p-2 text-2xl text-white bg-black rounded-3xl')
      setLogin(false)
    }
  }
  return (
    <>
    <div className="m-10">
    {sucessLogin&& <Navigate to="/clients" />}
      <div>
        <h1 className="text-center text-gray-600 ">AI Invoice Generator</h1>
      </div>
      <div className="m-auto rounded-3xl flex flex-wrap w-45  mt-10 bg-gray-200  ">
        <button className={loginon} onClick={() => toggle(true)}>Login</button>
        <button className={signinon} onClick={() => toggle(false)}>Sign-Up</button>
      </div>

      {login && <form onSubmit={(e) => HandleSubmitLogin(e)} className="mt-10 m-auto rounded-3xl flex flex-wrap w-full laptop:w-2/4" >
        <div className="w-full">
          Username: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="UsernameLogin" required />
        </div>
        <div className="mt-5 w-full">
          Password:<input type='password' className="laptop:ml-5 border-2  border-gray-400 rounded-3xl laptop:text-2xl mobile:w-full laptop:w-2/4 h-10 p-6  hover:border-black " name="PasswordLogin" required />
        </div>
         {ErrLogin &&<div className="w-full text-red-600">{ErrLogin[0].msg}</div>}
        <div className="m-auto rounded-3xl flex flex-wrap laptop:w-full  p-o mt-10">
          <button className="bg-black text-white rounded-3xl p-2 w-8/10 laptop:w-5/15 transform transition hover:bg-gray-700 hover:scale-110 ease-in-out hover:duration-300" type="submit">Login</button>
          <button className="bg-red-500 ml-5 text-white rounded-3xl p-2 mt-5 laptop:mt-0 mobile:w-5/10 laptop:w-5/15 hover:bg-red-400 transform transition hover:scale-110 ease-in-out hover:duration-300" type="button" onClick={() => navigate('/home')}>Exit</button>

        </div>
      </form>
      }
      {!login && <form onSubmit={(e) => HandleSubmitSignup(e)} className="mt-10 m-auto rounded-3xl flex flex-wrap w-full laptop:w-2/4">
        <div className="mt-5 w-full">
          Company Name: <input type='text' className="border-2 border-gray-400 rounded-3xl laptop:ml-6 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black" name="CompanyName" required />
        </div>
        <div className="mt-5 w-full">
          Company Email: <input type='email' className="border-2  border-gray-400 rounded-3xl laptop:ml-8 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="CompanyEmail" required />
        </div>
        <div className="mt-5 w-full">
          GSTIN: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-33 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="GSTIN" required />
        </div>
        <div className="mt-5 w-full">
          Contact Number: <input type='number' className="border-2  border-gray-400 rounded-3xl laptop:ml-6 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="ContactNumber" required />
        </div>
        <div className="mt-5 w-full">
          Address Line 1: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-12 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="AddressLine1" required />
        </div>
        <div className="mt-5 w-full">
          Address Line 2: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-12 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="Addressline2" required />
        </div>
        <div className="mt-5 w-full">
          Address Line 3: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-12 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="AddressLine3" required />
        </div>
        <div className="mt-5 w-full">
          State: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-38 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="State" required />
        </div>
        <div className="mt-5 w-full">
          Country: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-30 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="Country" required />
        </div>
        <div className="mt-5 w-full">
          Username: <input type='text' className="border-2  border-gray-400 rounded-3xl laptop:ml-24 laptop:text-2xl mobile:w-full laptop:w-2/4 h-10  p-6  hover:border-black " name="UsernameSignup" required />
        </div>
        <div className="mt-5 w-full">
          Password:<input type='password' className="laptop:ml-28 border-2  border-gray-400 rounded-3xl laptop:text-2xl mobile:w-full laptop:w-2/4 h-10 p-6  hover:border-black " name="PasswordSignup" required />
        </div>
        <div className="mt-5 w-full">
          ReType-Password:<input type='password' className="laptop:ml-6 border-2  border-gray-400 rounded-3xl laptop:text-2xl mobile:w-full laptop:w-2/4 h-10 p-6  hover:border-black" name="ReTypePasswordSignup" required />
        </div>
         {ErrSignup &&<div className="w-full text-red-600">{ErrSignup[0].msg}</div>
        }
        <div className="m-auto rounded-3xl flex flex-wrap laptop:w-full  p-o mt-10">
          <button className="bg-black text-white rounded-3xl p-2 w-8/10 laptop:w-5/15 transform transition hover:bg-gray-700 hover:scale-110 ease-in-out hover:duration-300 ">Sign Up</button>
          <button className="bg-red-500 ml-5 text-white rounded-3xl p-2 mt-5 laptop:mt-0 mobile:w-5/10 laptop:w-5/15 hover:bg-red-400 transform transition hover:scale-110 ease-in-out hover:duration-300" type="button" onClick={() => navigate('/home')}>Exit</button>
        </div>
      </form>

      }
      </div>
    </>
  )
}