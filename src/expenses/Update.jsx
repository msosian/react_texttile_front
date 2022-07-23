import Form from "./Form";
import {UpdateExpenses,EditExpenses} from './api'
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
        var responce=await UpdateExpenses(id,input)
        var data=responce.data
        console.log(data)
       let AllData= localStorage.getItem("Expenses")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                if(element.expenses_id === data.expenses_id)
                {
                    console.log(" in here")
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("Expenses",JSON.stringify(update_elm))

        setValues(data)
        nevigate('/expenses-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditExpenses(id)
             console.log(User)
            setValues(User[0])
        }
        fetchUser()
    },[])

    
    return(
        <>
        <Form info="update Form" btn="update " expensesDetail={values}  submit={HandelSubmit}></Form>
        </>
    )
   
}
export default Update;