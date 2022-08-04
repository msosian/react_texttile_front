import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getReportM} from './api'
function Filter(Props)
{
var [Total,setTotal]=useState([{

  month:"",
  Total:""
}]
)
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    
    useEffect(()=>{
      let FetchData=async()=>{
        let data=await getReportM()
          console.log(data)
     setTotal(data.data.list)
  
      }
      FetchData()
    },[]
  
    )
  

       return <>
          
                
    

        <div className="d-flex vh-100 align-items-center justify-content-center " >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/invoice-create"><i className="fa fa-plus me-1"></i> Create New Entry</NavLink> <h3 className="col-md-6 mb-3 text-center">Report </h3>
          </div>
          <table className="table table-striped" >
          <tr>
         <th>Month</th>
        <th>Total</th>
        


         </tr>
           {Total.map((item)=>
               <tr>
               <td>{month[item.month-1]}</td>

               <td>{item.Total}</td>
               


           </tr>
        
          )}
            
            
         </table> 

      </div>
            </div> 

    </>
}
export default Filter