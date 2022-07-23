import Form from "./Form";
import {UpdateCategory,EditCategory} from './api'
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
        var responce=await UpdateCategory(id,input)
        var data=responce.data
        console.log(data)
       let AllData= localStorage.getItem("List")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                if(element.category_id === data.category_id)
                {
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("List",JSON.stringify(update_elm))

        setValues(data)
        nevigate('/category-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditCategory(id)
             console.log(User)
            setValues(User[0])
        }
        fetchUser()
    },[])

    
    return(
        <>
        <Form info="update Form" btn="update " categoryDetail={values}  submit={HandelSubmit}></Form>
        </>
    )
   
}
export default Update;