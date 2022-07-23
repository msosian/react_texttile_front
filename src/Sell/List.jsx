import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getSell} from "./api"

function List()
{
    var [sell,setSell]=useState([])
    useEffect(  ()=>{
               const getAllsell=async()=>{
           let data=await getSell()
           console.log(data.data.list)
           console.log("from list.jsx")
           setSell(data.data.list)
           localStorage.setItem("sell",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("sell")
       console.log("printing data")
       console.log(data);
       if(data === null){
        console.log("coming from server")
        getAllsell()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setSell(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/sell-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Sales List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
         <th>Date</th>
        <th>Party</th>
        <th>Category</th>
        <th>item</th>
        <th>size</th>
        <th>Quantity</th>
       
        <th>rate</th>
        <th>Total</th>
        <th>Discount Type</th>
        <th>Discount Amount</th>
        <th>Grand Total</th>
        <th>Update</th>

        <th>Delete</th>







         </tr>
          {sell.map((item)=>
               <tr>
               <td>{item.sell_id}</td>
               <td>{item.Date}</td>
               <td>{item.party_id}</td>
               <td>{item.category_id}</td>
               <td>{item.item_id}</td>
               <td>{item.quantity}</td>
               <td>{item.size}</td>
               <td>{item.rate}</td>
               <td>{item.DiscountType}</td>
               <td>{item.Discount}</td>
               <td>{item.GrandTotal}</td>





               <td>
                    <NavLink  to={`/sell-update/${item.sell_id}`} > <button className="btn btn-primary "> Update</button>  </NavLink>
                    
                    </td>
                  <td>
                    <NavLink  to={`/sell-delete/${item.sell_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
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