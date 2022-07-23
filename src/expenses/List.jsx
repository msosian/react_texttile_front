import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getexpense} from "./api"

function List()
{
    var [expense,setExpense]=useState([])
    useEffect(  ()=>{
               const getAllexpense=async()=>{
           let data=await getexpense()
           console.log(data.data.list)
           console.log("from list.jsx")
           setExpense(data.data.list)
           localStorage.setItem("Expenses",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("Expenses")
       console.log("printing data")
       console.log(data);
       if(data === null){
        console.log("coming from server")
        getAllexpense()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setExpense(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/expenses-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Expenses List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>expenses_id</th>
         <th>Date</th>
        <th>Amount</th>
        <th>Tittle</th>
        <th>Detail</th>
        <th>Payment Mode</th>
        <th>update</th>
       
        <th>Delete</th>


         </tr>
          {expense.map((item)=>
               <tr>
               <td>{item.expenses_id}</td>
               <td>{item.Date}</td>
               <td>{item.Amount}</td>
               <td>{item.expenses_tittle}</td>
               <td>{item.expenses_detail}</td>
               <td>{item.payment_mode}</td>

               <td>
                    <NavLink  to={`/expenses-update/${item.expenses_id}`} > <button className="btn btn-primary "> Update</button>  </NavLink>
                    
                    </td>
                  <td>
                    <NavLink  to={`/expenses-delete/${item.expenses_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
                    </td> 
      
           </tr>
        
          )}
            
            
         </table>

      </div>
            </div>

        </>
    )
}
export default List;