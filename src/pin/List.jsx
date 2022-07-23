import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getEntry} from "./api"

function List()
{
    var [entries,setEntries]=useState([])
    useEffect(  ()=>{
               const getAllEntry=async()=>{
           let data=await getEntry()
           console.log(data.data.list)
           console.log("from list.jsx")
           setEntries(data.data.list)
           localStorage.setItem("pin",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("pin")
       console.log("printing data")
       if(data === null){
        console.log("coming from server")
        getAllEntry()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setEntries(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
      <div><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/invoice-list"><i className="fa fa-plus me-1"></i> Invoice List</NavLink>
       <h3 className="col-md-6 mb-3 text-center">Proceed In Entries</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
        <th>Date</th>
        <th>invoice No</th>
        <th>item</th>
        <th>Party</th>
        <th>Lot No</th>
        <th>piece</th>
        <th>size</th>
        <th>Damage</th>
        <th>Comment</th>

        <th>Update</th>

        <th>Delete</th>


         </tr>
          {entries.map((item)=>
               <tr>
               <td>{item.pin_id}</td>

               <td>{item.Date}</td>
               <td>{item.invoice_no}</td>
               <td>{item.item_id}</td>
               <td>{item.party_id}</td>
               <td>{item.lot_no}</td>
               <td>{item.piece}</td>
               <td>{item.size}</td>
               <td>{item.damage}</td>
               <td>{item.comment}</td>





               <td>
                    <NavLink  to={`/pin-list/update/${item.pin_id}`} > <button className="btn btn-primary "> Update</button>  </NavLink>
                    
                    </td> 
                  <td>
                    <NavLink  to={`/pin-list/delete/${item.pin_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
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