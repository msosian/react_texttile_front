import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {CreateInvoice} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
            console.log(values)
          let data= await CreateInvoice(values)
          console.log(data)
            let AllData= localStorage.getItem('invoice')
          if(AllData != null){
  
            AllData=JSON.parse(AllData)
            console.log(AllData)
             AllData.push(data.data)
             localStorage.setItem('invoice',JSON.stringify(AllData))
           }
           else{
             console.log("nulll")
           }
   
            navigate('/invoice-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;