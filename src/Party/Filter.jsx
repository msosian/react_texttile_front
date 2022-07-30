import React, { useState } from "react"
import {NavLink} from "react-router-dom"
function Filter(Props)
{

    var [values,setValues]=useState({
      party_name:"",
      party_Address:"",
      party_mobile:"",
      party_status:"",
      party_type:""

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
  var  data=JSON.parse(localStorage.getItem('PartyList'))
  if(values.party_name === "" && values.party_Address === ""   && values.party_mobile === "" && values.party_status === ""  && values.party_type === "" ){
    alert('please All Fileds')
  }

      if(values.party_name !=""){
          let newData=data.filter((listt)=>{
            return listt.party_name === values.party_name
          })
          console.log(newData)
          setList(newData)
        }


        if(values.party_Address !=""){
            let newData=data.filter((listt)=>{
              return listt.party_Address === values.party_Address
            })
            console.log(newData)
            setList(newData)
          }
        if(values.party_mobile !=""){
          let newData=data.filter((listt)=>{
            console.log(listt.party_mobile)
            return listt.party_mobile === values.party_mobile
          })
          console.log(newData)
          setList(newData)
        }
        if(values.party_status !=""){
          let newData=data.filter((listt)=>{
            console.log(listt.party_status)
            return listt.party_status === values.party_status
          })
          console.log(newData)
          setList(newData)
        }
        if(values.party_type !=""){
         let newData=data.filter((listt)=>{
              console.log(listt.party_type)
              return listt.party_type === values.party_type
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
              <label> Party Name </label><br/>
              <input name="party_name" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder="Party Name" />
          </div>    
          <div className="form-group">
              <label> Party Address </label><br/>
              <input name="party_Address" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder=" party Address" />
          </div>    
          <div className="form-group">
              <label> Party Mobile </label><br/>
              <input name="party_mobile" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder=" party mobile" />
          </div>    
          <div className="form-group">
              <label> Party Type </label><br/>
              <input name="party_type" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder=" party Type" />
          </div>   
          <div className="form-group">
              <label> Party Status </label><br/>
              <input name="party_status" type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" placeholder="party_status" />
          </div>   
          
          <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> Filter  
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/party-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

        <div id="list" className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/party-entry"><i className="fa fa-plus me-1"></i> Create New Party</NavLink> <h3 className="col-md-6 mb-3 text-center">Party List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>ID</th>
        <th> Name</th>
         <th>Mobile</th>
        <th>Address</th>
        <th>Firm</th>
        <th>Type</th>
        <th>Status</th>
        <th>Update</th>
        <th>Delete</th>



        


         </tr>
          {list.map((item)=>
               <tr>
               <td>{item.party_id}</td>
               <td>{item.party_name}</td>
               <td>{item.party_mobile}</td>
               <td>{item.party_Address}</td>
               <td>{item.party_firm}</td>
               <td>{item.party_type}</td>
               <td>{item.party_status}</td>
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