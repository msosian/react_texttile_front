import React,{useState,useEffect} from "react";
import {NavLink} from "react-router-dom"

import {EditCategory} from "./api"
import {useParams } from"react-router-dom"

function Form(Props){
  var {id}=useParams()

  var [values,setValues]=useState(
      {
        category_name:Props.categoryDetail?Props.categoryDetail.category_name:"",
        category_quantity:Props.categoryDetail?Props.categoryDetail.category_quantity:"",
        category_unit:Props.categoryDetail?Props.categoryDetail.category_unit:"",

        category_status:Props.categoryDetail?Props.categoryDetail.category_status:""
    })

  useEffect(()=>{
       const fetchUser=async ()=>{
           console.log("from form fetch")
           console.log(id)
            const Category=await EditCategory(id)
            console.log(Category[0])

            setValues(Category[0])
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
          <div className="form-group">
              <label>Category Name</label><br/>
              <input type="text"  onChange={HandelChange} value={values.category_name}  className="form-control mb-3 mt-2" name="category_name" placeholder="Enter Name" />
          </div>  
          <div className="form-group">
            <label>Quantity</label><br/>
            <input type="number"  onChange={HandelChange} value={values.category_quantity}  className="form-control mb-3 mt-2" name="category_quantity" placeholder="Quantity" />
          </div>
          <div className="form-group">
            <label>Unit</label><br/>
            <input type="text"  onChange={HandelChange} value={values.category_unit}  className="form-control mb-3 mt-2" name="category_unit" placeholder="Unit" />
          </div>
  
          <div className="form-group">
            <label>status</label><br/>
            <input type="text"  onChange={HandelChange} value={values.category_status}  className="form-control mb-3 mt-2" name="category_status" placeholder="status" />
          </div>

             
           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/category-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>
    
            </>
    
    )
}
export default Form