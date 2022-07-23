import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {EditExpenses} from './api'
import {useParams } from"react-router-dom"

function Form(Props)
{
  var {id}=useParams()

  
    var [selects,setSelect]=useState({
      expense_name:Props.expenseDetail?Props.expenseDetail.expense_name:"",
    
    })
    useEffect(()=>{
         
     const fetchexpenses=async ()=>{
      const data=await EditExpenses(id)
       console.log(data)
       setSelect(data[0])
  }
  
  fetchexpenses() 
    },[])
    function HandelChange(event)
    { 
      
      let name=event.target.name
      let value=event.target.value
      console.log(value)
     setSelect((pre)=>{
        return {
            ...pre,
            [name]:value
        }
     })   
    }
    let HandelSub=(event)=>{
      event.preventDefault()
              Props.submit(selects);
         
  }
       return <>
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Expenses  </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group">
              <label> Expense Name </label><br/>
              <input name="expense_name" type="text" onChange={HandelChange} value={selects.expense_name}  className="form-control mb-3 mt-2" />
          </div>    
        

           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/expenseType-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form