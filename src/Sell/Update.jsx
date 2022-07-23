import Form from "./Form";
import {UpdateSell,EditSell} from './api'
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
        var responce=await UpdateSell(id,input)
        var data=responce.data
        console.log(responce)
       let AllData= localStorage.getItem("sell")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                console.log(data)
                if(element.sell_id === data.sell_id)
                {
                    console.log(" in here")
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("sell",JSON.stringify(update_elm))

        setValues(data)
        // nevigate('/sell-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditSell(id)
             console.log(User)
            setValues(User[0])
        }
        fetchUser()
    },[])

    
    return(
        <>
        <Form info="update Form" btn="update " sellDetail={values}  submit={HandelSubmit}></Form>
        </>
    )
   
}
export default Update;