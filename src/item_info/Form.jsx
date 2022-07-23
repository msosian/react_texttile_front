import React,{useState,useEffect} from "react";
import {NavLink} from "react-router-dom"

import {EditItem,getItem,getCategory} from "./api"
import {useParams } from"react-router-dom"

function Form(Props){
  var {id}=useParams()

  var [values,setValues]=useState(
      {
        name:Props.itemDetail?Props.itemDetail.name:"",
        item_type:Props.itemDetail?Props.itemDetail.item_type:"",
    })
var [type,setType]=useState([])
  useEffect(()=>{
    const getType=async()=>{
        let data=await getCategory()
        console.log(data.data.list)
        setType(data.data.list)
     }
   
    const fetchUser=async ()=>{
           console.log("from form fetch")
           console.log(id)
            const item=await EditItem(id)
            console.log(item[0])

            setValues(item[0])
        }
        getType()
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
          <div className="form-group">
              <label>item Name</label><br/>
              <input type="text"  onChange={HandelChange} value={values.name}  className="form-control mb-3 mt-2" name="name" placeholder="Enter Name" />
          </div>  
          <div className="form-group w-full">
              <label>item Type</label><br/> 
              <select name="item_type" className="form-group"  value={values.item_type} onChange={HandelChange}>
                   {type.map((item)=>{
                    return(
                      <option value={item.category_id}>{item.category_name}</option>
                    )
                           
          })}
                   
            </select>
          </div>


           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/item-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>
    
            </>
    
    )
}
export default Form