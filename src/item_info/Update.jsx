import Form from "./Form";
import {UpdateItem,EditItem} from './api'
import React, { useEffect, useState } from "react"
import {useNavigate,useParams } from"react-router-dom"
function Update()
{
    let nevigate=useNavigate()
    var {id}=useParams()

    var [values,setValues]=useState({
        name:"",
        mobile:""
    })
   
   async function HandelSubmit(input)
    {
        var responce=await UpdateItem(id,input)
        var data=responce.data
        console.log(data)
       let AllData= localStorage.getItem("ItemList")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                if(element.item_id === data.item_id)
                {
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("ItemList",JSON.stringify(update_elm))

        setValues(data)
        nevigate('/item-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditItem(id)
             console.log(User)
            setValues(User[0])
        }
        fetchUser()
    },[])

    
    return(
        <>
        <Form info="update Form" btn="update " itemDetail={values}  submit={HandelSubmit}></Form>
        </>
    )
   
}
export default Update;