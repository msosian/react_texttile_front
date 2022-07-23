import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getItem} from "./api"

function List()
{
    var [items,setItems]=useState([])
    useEffect(  ()=>{
               const getAllCategory=async()=>{
           let data=await getItem()
           console.log(data.data.list)
           console.log("from list.jsx")
           setItems(data.data.list)
           localStorage.setItem("ItemList",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("ItemList")
       console.log("printing data")
       console.log(data);
       if(data === null){
        console.log("coming from server")
        getAllCategory()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setItems(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/item-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Item List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
         <th>Name</th>
         <th>Type</th>

        <th>update</th>
        <th>Delete</th>


         </tr>
          {items.map((item)=>
               <tr>
               <td>{item.item_id}</td>

               <td>{item.name}</td>
               <td>{item.item_type}</td>

               <td>
                   <NavLink  to= {`/item-list/update/${item.item_id}`}> <button className="btn btn-info text-light  "> Update</button>  </NavLink>
                  
               </td>
                  <td>
                    <NavLink  to={`/item-list/delete/${item.item_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
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