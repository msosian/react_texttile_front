import Form from "./Form";
import {UpdateParty,EditParty} from './api'
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
        var responce=await UpdateParty(id,input)
        var data=responce.data
        console.log(data)
       let AllData= localStorage.getItem("PartyList")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                if(element.party_id === data.party_id)
                {
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("PartyList",JSON.stringify(update_elm))

        setValues(data)
        nevigate('/party-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditParty(id)
             console.log(User)
            setValues(User[0])
        }
        fetchUser()
    },[])

    
    return(
        <>
        <Form info="update Form" btn="update " partyDetail={values}  submit={HandelSubmit}></Form>
        </>
    )
   
}
export default Update;