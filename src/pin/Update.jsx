import Form from "./Form";
import {UpdatePin,EditPin,getRecord} from './api'
import React, { useEffect, useState } from "react"
import {useNavigate,useParams } from"react-router-dom"
import {NavLink} from "react-router-dom"

function Update()
{
    let nevigate=useNavigate()
    var {id}=useParams()

    var [values,setValues]=useState([])
    var [records,setRecords]=useState([
        {
            name:"",
            piece:"",
            size:"",
            item_id:"",
            invoice_id:"",
            invoice_no:"",
            party_id:"",
            party_name:"",
            category_unit:"",
            lot_no:""
        }])

   
   async function HandelSubmit(event)
    {
        event.preventDefault()
         console.log(values)
        var responce=await UpdatePin(values)
        var data=responce.data
        console.log(responce)
       let AllData= localStorage.getItem("pin")
        AllData=JSON.parse(AllData);
        let findelem=()=>{
            for (let index = 0; index <AllData.length; index++) {
                const element = AllData[index];
                if(element.expenses_id === data.expenses_id)
                {
                    console.log(" in here")
                    AllData.splice(index, 1, data);
                    return AllData

                }
                
            }                   
           }
        let update_elm=findelem()
        localStorage.setItem("pin",JSON.stringify(update_elm))

        setValues(data)
        // nevigate('/pin-list')
    }
    useEffect(()=>{
       const fetchUser=async ()=>{
            const User=await EditPin(id)
             console.log(User)
            setValues(User[0])
            fetchData(User[0].invoice_id)
        }
        const fetchData=async(a)=>{
             console.log(a)
            const data=await getRecord(a) 
            console.log(data)
            setRecords(data.data.list)
        }
        fetchUser()
    },[])
    function HandelChange(event)
    { 
      let name=event.target.name
      let value=event.target.value
        console.log("change")
      setValues((pre)=>{
        return{
       ...pre,
       [name]:value,  
     }
   })
   }
    

    return(
        <>
        
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Procced In </h2>
          
        <form autoComplete="off" onSubmit={HandelSubmit} method="POST">
        <div className="form-group w-full">
              <label>Lot No : <b>{records[0].lot_no}</b></label><br/> 
              <input type="hidden" name="lot_no" value={records[0].lot_no} />
                       </div>
            <div className="form-group w-full">
              <label>Invoice No : <b>{records[0].invoice_no}</b></label><br/> 
              <input type="hidden" name="invoice_no" value={records[0].invoice_no} />
               
                       </div>
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange} value={values.Date}   className="form-control mb-3 mt-2"  />
          </div>    
          <div className="form-group w-full">
              <label>Party Name : <b>{records[0].party_name}</b></label><br/> 
              <input type="hidden" name="party_id" value={records[0].party_id} />
                       </div>
 
          <div className="form-group w-full">
              <label>item Name : <b>{records[0].name}</b></label><br/> 
              <input type="hidden" name="item_id"  value={values.item_id}  />
                       </div>

          <div className="form-group">
            <label>Piece</label>
            <b> <span>Total {records[0].piece}</span> </b><br/>
            <input type="number" name="piece"  onChange={HandelChange}    className="form-control mb-3 mt-2"  value={values.piece} placeholder="pieces for proceed In" />
          </div>
          <div className="form-group">
                   <b>{records[0].category_unit}</b>
            <input type="number" name="size" onChange={HandelChange}  className="form-control mb-3 mt-2" placeholder="size" value={values.size}  />
            <input type="hidden" name="item_id" value={values.item_id} />

          </div>
          <div className="form-group">
            <label>Damage Piece</label>
            <input type="text" onChange={HandelChange}   className="form-control mb-3 mt-2" name="damage" value={values.damage} placeholder="damage" />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <input type="text" onChange={HandelChange}    className="form-control mb-3 mt-2" name="comment" value={values.comment} placeholder="comment" />
          </div>
{/* 
          <div className="form-group">
            <label>Rate : <b>{records[0].rate}</b></label><br/>
            <input type="number"  name="rate" onKeyUp={HandelChange}    className="form-control mb-3 mt-2"  placeholder="rate" />
          </div> */}
         

           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> Submit            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/pin-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>
        </>
    )
   
}
export default Update;