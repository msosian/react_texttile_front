import React, { useState } from "react"
import {NavLink} from "react-router-dom"
function Filter(Props)
{

    var [values,setValues]=useState({
        expenses_type:"",
        expenses_tittle:"",
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
  if(values.expenses_type === "" && values.expenses_tittle ===""){
    alert('please All Fileds')
  }

      if(values.expenses_type !=""){
          let newData=data.filter((listt)=>{
            return listt.expenses_type === values.expenses_type
          })
          console.log(newData)
          setList(newData)
        }


        if(values.expenses_tittle !=""){
            let newData=data.filter((listt)=>{
              return listt.expenses_tittle === values.expenses_tittle
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
              <label>  Type </label><br/>
              <input name="expenses_type" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder=" Type" />
          </div>    
          <div className="form-group">
              <label>  Status </label><br/>
              <input name="expenses_tittle" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder="Title" />
          </div>    
          
          <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> Filter  
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/expenses-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

        <div id="list" className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/expenses-entry"><i className="fa fa-plus me-1"></i> Create New </NavLink> <h3 className="col-md-6 mb-3 text-center">Expenses List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>
         <th>Date</th>
        <th>Amount</th>
        <th>Tittle</th>
        <th>Detail</th>
        <th>Payment Mode</th>
        <th>update</th>
       
        <th>Delete</th>


         </tr>
          {list.map((item)=>
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
}
export default Filter