import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getCategory} from "./api"

function List()
{
    var [categories,setCategories]=useState([])
    useEffect(  ()=>{
               const getAllCategory=async()=>{
           let data=await getCategory()
           console.log(data.data.list)
           console.log("from list.jsx")
           setCategories(data.data.list)
           localStorage.setItem("List",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("List")
       console.log("printing data")
       console.log(data);
       if(data === null){
        console.log("coming from server")
        getAllCategory()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setCategories(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/category-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Category List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
         <th>Name</th>
        <th>quantity</th>
        <th>status</th>
        <th>update</th>
        <th>Delete</th>


         </tr>
          {categories.map((item)=>
               <tr>
               <td>{item.category_id}</td>

               <td>{item.category_name}</td>
               <td>{item.category_quantity}</td>
               <td>{item.category_status}</td>

               <td>
                   <NavLink  to= {`/category-list/update/${item.category_id}`}> <button className="btn btn-info text-light  "> Update</button>  </NavLink>
                  
               </td>
                  <td>
                    <NavLink  to={`/category-list/delete/${item.category_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
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