import axios from 'axios';
import React, { useEffect ,useState } from 'react'
import { useParams ,useNavigate } from 'react-router-dom';

export default function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [state, setstate] = useState({
        name:'',
        age:''
    });

    useEffect((req,res)=>{
        axios
    },[id]);
  return (
    <>
    <div>
        <div className='flex flex-col p-[17px] shadow-2xl justify-center items-center'> EDIT</div>
        <div className='flex'>
        <div className='ml-4 button p-2 justify-center items-center m-3 aspect-square rounded-lg  bg-amber-300' onClick={()=>navigate(-1)}>Back</div>
        </div>
    </div>
    </>
  )
}
