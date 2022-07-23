import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getType} from "./api"

function List()
{
    var [expense,setExpense]=useState([])
    useEffect(  ()=>{
               const getAllexpense=async()=>{
           let data=await getType()
           console.log(data.data.list)
           console.log("from list.jsx")
           setExpense(data.data.list)
           localStorage.setItem("Type",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("Type")
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
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/expenseType-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Expenses Type</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
         <th>expense Name</th>
        
        <th>update</th>
       
        <th>Delete</th>


         </tr>
          {expense.map((item)=>
               <tr>
               <td>{item.expense_id}</td>
               <td>{item.expense_name}</td>
              

               <td>
                    <NavLink  to={`/expenseType-update/${item.expense_id}`} > <button className="btn btn-primary "> Update</button>  </NavLink>
                    
                    </td>
                  <td>
                    <NavLink  to={`/expenseType-delete/${item.expense_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
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