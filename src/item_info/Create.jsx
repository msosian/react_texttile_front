import React from "react"
import Form from "./Form";
import {useNavigate} from"react-router-dom" //useHistory
import {CreateItem} from "./api"

function Create() 
{
    let navigate=useNavigate ()
        async function HandelInsert(values)
        {   
          let data= await CreateItem(values)
          console.log(data.data)
         let AllData= localStorage.getItem('ItemList')
         if(AllData != null){
  
             AllData=JSON.parse(AllData)
             console.log(AllData)
             AllData.push(data.data)
             localStorage.setItem('ItemList',JSON.stringify(AllData))
           }
           else{
             console.log("nulll")
           }
            navigate('/item-list')
        }
    return(
        <>
        
        <Form info="input Form" btn="insert" submit={HandelInsert}></Form>
        </>
    )
}
export default Create;