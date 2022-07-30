import React, { useState } from "react"
import {NavLink} from "react-router-dom"
function Filter(Props)
{

    var [values,setValues]=useState({
        category_name:"",
        category_status:"",
    })
    var [list,setList]=useState([])
    
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
function HandelSubmit(event)
{
  event.preventDefault()
  var  data=JSON.parse(localStorage.getItem('List'))
  if(values.category_name === "" && values.category_status ===""){
    console.log("ads")
    alert('please All Fileds')
  }

      if(values.category_name !=""){
          let newData=data.filter((listt)=>{
            return listt.category_name === values.category_name
          })
          console.log(newData)
          setList(newData)
        }


        if(values.category_status !=""){
            let newData=data.filter((listt)=>{
              return listt.category_status === values.category_status
            })
            console.log(newData)
            setList(newData)
          }
        
}
       return <>
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Filter By </h2>
          
        <form autoComplete="off" onSubmit={HandelSubmit}  method="POST">
        <div className="form-group">
              <label>  Name </label><br/>
              <input name="category_name" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder=" Name" />
          </div>    
          <div className="form-group">
              <label>  Status </label><br/>
              <input name="category_status" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder="Status" />
          </div>    
          
          <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> Filter  
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/category-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

        <div id="list" className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/category-entry"><i className="fa fa-plus me-1"></i> Create New </NavLink> <h3 className="col-md-6 mb-3 text-center">Category List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>ID</th>
        <th> Name</th>
         <th>Qauntity</th>
        <th>Status</th>
        <th>Unit</th>

        <th>Update</th>
        <th>Delete</th>



        


         </tr>
          {list.map((item)=>
               <tr>
               <td>{item.category_id}</td>
               <td>{item.category_name}</td>
               <td>{item.category_quantity}</td>
               <td>{item.category_status}</td>
               <td>{item.category_unit}</td>
               <td>
                   <NavLink  to= {`/party-list/update/${item.party_id}`}> <button className="btn btn-info text-light  "> Update</button>  </NavLink>
                  
               </td>
                  <td>
                    <NavLink  to={`/party-list/delete/${item.party_id}`} > <button className="btn btn-danger "> Delete</button>  </NavLink>
                    
                    </td> 
           </tr>
        
          )}
            
            
         </table>

      </div>
            </div>

        

    </>
}
export default Filter