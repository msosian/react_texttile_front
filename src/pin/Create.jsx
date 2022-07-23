import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {CreateEntry} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
          let data= await CreateEntry(values)
          console.log(data)
         let AllData= localStorage.getItem('pin')
         AllData=JSON.parse(AllData)
         console.log(AllData)
         AllData.push(data.data) 
         localStorage.setItem('pin',JSON.stringify(AllData))
            navigate('/pin-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;