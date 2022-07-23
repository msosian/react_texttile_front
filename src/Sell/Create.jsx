import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {createSell} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
            console.log(values)
          let data= await createSell(values)
          console.log(data) 
          let AllData= localStorage.getItem('sell')

              AllData=JSON.parse(AllData)
              console.log(AllData)
              AllData.push(data.data)
              localStorage.setItem('sell',JSON.stringify(AllData))
              navigate('/sell-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;