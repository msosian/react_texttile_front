import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getParty} from "./api"

function List()
{
    var [parties,setParties]=useState([])
    useEffect(  ()=>{
               const getAllParty=async()=>{
           let data=await getParty()
           console.log(data.data.list)
           console.log("from list.jsx")
           setParties(data.data.list)
           localStorage.setItem("PartyList",JSON.stringify(data.data.list))

       }
       let data= localStorage.getItem("PartyList")
       console.log("printing data")
       console.log(data);
       if(data === null){
        console.log("coming from server")
        getAllParty()
       }
       else{
        console.log("coming from localstorage")
        let list=JSON.parse(data)
        setParties(list)
    }


    },[])
    return(
        <>

<div className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/party-entry"><i className="fa fa-plus me-1"></i> Create New</NavLink> <h3 className="col-md-6 mb-3 text-center">Party List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>id</th>

        <th>Name</th>
        <th>mobile</th>
        <th>Address</th>
        <th>Firm</th>
        <th>Type</th>
        <th>status</th>
        <th>update</th>
        <th>Delete</th>




         </tr>
          {parties.map((item)=>
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
    )
}
export default List;