    import { DeleteSell } from "./api"
    import React, { useEffect } from "react"
    import {useNavigate,useParams } from"react-router-dom"
    
    function Delete()
    {
        let nevigate=useNavigate()
        var {id}=useParams()
        var data=[]
    
        useEffect(() => {
            const fun = async () => {
                console.log(id)
                alert("Are You Sure To Delete This Record")
               await DeleteSell(id)
                data=localStorage.getItem('sell')
               data=JSON.parse(data);
               let findelem=()=>{
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if(element.sell_id === id)
                    {
                       data.splice(index,1)
                        return data
    
                    }
                    
                }
               }
            let Del_elm=findelem()
            localStorage.setItem("sell",JSON.stringify( Del_elm))
            
                nevigate('/sell-list')
            }
            fun()
        }, [])
        
        
        
        
        return(
            <>
    
            </>
        )
    
    }
    export default Delete