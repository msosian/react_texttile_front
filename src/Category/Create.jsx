import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {CreateCategory} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
          let data= await CreateCategory(values)
          console.log(data.data)
         let AllData= localStorage.getItem('List')
         AllData=JSON.parse(AllData)
         console.log(AllData)
         AllData.push(data.data)
         localStorage.setItem('List',JSON.stringify(AllData))
            navigate('/category-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;