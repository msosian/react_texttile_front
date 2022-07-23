import React,{useState,useEffect} from "react";
import {NavLink} from "react-router-dom"

import {EditParty} from "./api"
import {useParams } from"react-router-dom"

function Form(Props){
  var {id}=useParams()

  var [values,setValues]=useState(
      {
      
        party_name:Props.partyDetail?Props.partyDetail.party_name:"",
        party_mobile:Props.partyDetail?Props.partyDetail.party_mobile:"",
        party_Address:Props.partyDetail?Props.partyDetail.party_Address:"",
        party_firm:Props.partyDetail?Props.partyDetail.party_firm:"",
        party_type:Props.partyDetail?Props.partyDetail.party_type:"",
        party_status:Props.partyDetail?Props.partyDetail.party_status:""
    })

  useEffect(()=>{
       const fetchUser=async ()=>{
           console.log("from form fetch")
           console.log(id)
            const User=await EditParty(id)
            console.log(User[0])

            setValues(User[0])
        }
        fetchUser()
    },[])


    let HandelChange=(event)=>{
        let {name,value}=event.target
        setValues((pre)=>{
            return{

                ...pre,
                [name]:value
            }
        })
    }
    let HandelSub=(event)=>{
        event.preventDefault()
        console.log(values)
                Props.submit(values);
           
    }
    return(
        <>

<div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >{Props.info}</h2>
              
        <form onSubmit={HandelSub}   method="POST" autoComplete="off">
          <input type="hidden" name="_id" />
          <div className="form-group">
              <label>Full Name</label><br/>
              <input type="text"  onChange={HandelChange} value={values.party_name}  className="form-control mb-3 mt-2" name="party_name" placeholder="Full Name" />
          </div>  
          <div className="form-group">
            <label>Mobile</label><br/>
            <input type="number"  onChange={HandelChange} value={values.party_mobile}  className="form-control mb-3 mt-2" name="party_mobile" placeholder="Mobile" />
          </div>

          <div className="form-group">
            <label>Address</label><br/>
            <input type="text"  onChange={HandelChange} value={values.party_Address}  className="form-control mb-3 mt-2" name="party_Address" placeholder="Address" />
          </div>

          <div className="form-group">
            <label>Firm</label><br/>
            <input type="text"  onChange={HandelChange} value={values.party_firm}  className="form-control mb-3 mt-2" name="party_firm" placeholder="firm" />
          </div>

          <div className="form-group">
            <label>Type</label><br/>
            <input type="text"  onChange={HandelChange} value={values.party_type}  className="form-control mb-3 mt-2" name="party_type" placeholder="type" />
          </div>

          <div className="form-group">
            <label>status</label><br/>
            <input type="text"  onChange={HandelChange} value={values.party_status}  className="form-control mb-3 mt-2" name="party_status" placeholder="status" />
          </div>

             
           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/party-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>
    
            </>
    
    )
}
export default Form