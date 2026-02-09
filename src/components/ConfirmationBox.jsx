export default function ConfirmationBox(props){
return(
<>
{props.execute && <div className="w-full relative">
<div className="w-full h-100 p-10 fixed flex justify-center">
<div className="bg-cyan-100 h-120 z-10 p-20 mt-10 w-150 rounded-3xl ">
<h4>{props.message}</h4>
<div className="mt-50">
<button className="bg-blue-600  text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-blue-500 hover:scale-110 ease-in-out hover:duration-300" type="submit" onClick={()=>{props.execute()}}>Confirm</button>
<button className="bg-black  text-white rounded-3xl p-2 w-full laptop:w-5/15 transform transition hover:bg-gray-700 mt-4 laptop:ml-5 hover:scale-110 ease-in-out hover:duration-300" onClick={()=>props.setHide(false)}>Cancel</button>
</div>
</div>
</div>
</div>}
</>
)
}