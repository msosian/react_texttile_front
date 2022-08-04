import React, { useState } from "react"
import { useEffect } from "react"
import {NavLink} from "react-router-dom"
import {getType,getReport} from './api'
function Filter(Props)
{
var [type,setTypes]=useState([])
var [report,setReport]=useState([]) 
var [Total,setTotal]=useState("")

    var [values,setValues]=useState({
        expenses_type:"",
        to:"",
        from:""
    })
    
function HandelChange(event){
    let name=event.target.name;
    let value=event.target.value
    setValues((pre)=>{
        return{
       ...pre,
       [name]:value,  
     }
   })
}
async function HandelSubmit(event)
{

  event.preventDefault()
  console.log(values.expenses_type)
  let data=await getReport(values)
  console.log(data)
  setReport(data.data.list)
    
}
       return <>
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-30 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Choose a Type</h2>
          
        <form autoComplete="off" onSubmit={HandelSubmit}  method="POST">
        <div className="form-group">
              <label> From </label><br/>
              <input name="from" type="date" onChange={HandelChange} value={values.from}  className="form-control mb-3 mt-2" />
          </div>
          <div className="form-group">
              <label> TO </label><br/>
              <input name="to" type="date" onChange={HandelChange} value={values.to}  className="form-control mb-3 mt-2" />
          </div> 
       
          <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> submit  
            </button>
         
          </div>
         
        </form>
        
        </div>
        </div>
        <div className="d-flex vh-100 align-items-center justify-content-center " >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/invoice-create"><i className="fa fa-plus me-1"></i> Create New Entry</NavLink> <h3 className="col-md-6 mb-3 text-center">Report </h3>
          </div>
          <table className="table table-striped" >
          <tr>
         <th>expense name</th>
        <th>Total</th>
        


         </tr>
          {report.map((item)=>
               <tr>
               <td>{item.expense_name}</td>

               <td>{item.Total}</td>
               


           </tr>
        
          )}
            
            
         </table>

      </div>
            </div>

        </>
}
export default Filter