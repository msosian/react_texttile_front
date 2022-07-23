import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {CreateParty} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
          let data= await CreateParty(values)
          console.log(data.data)
         let AllData= localStorage.getItem('PartyList')
         AllData=JSON.parse(AllData)
         console.log(AllData)
         AllData.push(data.data)
         localStorage.setItem('PartyList',JSON.stringify(AllData))
            navigate('/party-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;