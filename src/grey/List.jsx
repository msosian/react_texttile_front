import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getInvoice} from "./api"

function List()
{
    var [Invoice,setinvoice]=useState([])
    useEffect(  ()=>{
               const getAllinvoce=async()=>{
           let data=await getInvoice()
           console.log(data)
           console.log("from list.jsx")
           setinvoice(data.data.list)
           localStorage.setItem("invoice",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("invoice")
       console.log("printing data")
       console.log(data);
        getAllinvoce()

    //    if(data === null){
    //     console.log("coming from server")
    //     getAllinvoce()
    //    }
    //    else{
    //     console.log("coming from localstorage")
    //     let list=JSON.parse(data)
    //     setinvoice(list)
    // }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/invoice-create"><i className="fa fa-plus me-1"></i> Create New Invoice</NavLink> <h3 className="col-md-6 mb-3 text-center">Invoice List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>Invoice NO</th>
         <th>Date</th>
        <th>Category</th>
        <th>Party Name</th>
        <th>Total</th>
        <th>Action</th>
        


         </tr>
          {Invoice.map((item)=>
               <tr>
               <td>{item.invoice_no}</td>

               <td>{item.Date}</td>
               <td>{item.category_name}</td>
               <td>{item.party_name}</td>
               <td>{item.Total}</td>


                  <td>
                    <NavLink  to={`/proceed_out/${item.invoice_id}`} > <button className="btn btn-primary "> Procced Out</button>  </NavLink>
                    <NavLink  to={`/proceed_in/${item.invoice_id}`} > <button className="btn btn-primary "> Procced in</button>  </NavLink>
                    
                    
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