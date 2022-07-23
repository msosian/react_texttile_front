import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getRecord} from './api'
import {useNavigate,useParams } from"react-router-dom"


function Form(Props)
{
    let nevigate=useNavigate()
    var {id}=useParams()
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
    var[parties,setParties]=useState([])
    var [temp,setTemp]=useState([])  
    var [selects,setSelect]=useState({  
      Date:0,
      key:0,
      name:records[0].name,
      party_id:"",
      piece:0,
      size:0, 
      lot_no:records[0].lot_no,
      party_name:records[0].party_name,
      party_id:records[0].party_id,
      category_unit:records[0].category_unit,
      item_id:records[0].item_id,
      invoice_id:records[0].invoice_id,
      invoice_no:records[0].invoice_no,
      comment:"",
      damage:"",

    })
    useEffect(()=>{
        const fetchRecords=async ()=>{
            console.log(id)
             const data=await getRecord(id)
              console.log(data)
             setRecords(data.data.list)
         }
         
        
            let record= localStorage.getItem("records")
            
            
            
            console.log("printing data")
            if(record === null){
                console .log("coming from server")
                fetchRecords()
            }
            else{
              console.log("coming from localstorage")
              let data1=JSON.parse(record)
              setRecords(data1)

          }
     },[])
     function HandelChange(event)
    { 
      let name=event.target.name
      let value=event.target.value
      setSelect((pre)=>{
        selects.lot_no=records[0].lot_no
        selects.party_name=records[0].party_name
        selects.party_id=records[0].party_id
        selects.category_unit= records[0].category_unit

        selects.item_id=records[0].item_id
        selects.invoice_no=records[0].invoice_no

        selects.invoice_id=records[0].invoice_id


        return{
       ...pre,
       [name]:value,  
     }
   })
    }
    let HandelSub=(event)=>{
      event.preventDefault()
              Props.submit(selects);
         
  }
       return <>
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Procced In </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group w-full">
              <label>Lot No : <b>{records[0].lot_no}</b></label><br/> 
              <input type="hidden" name="lot_no" value={records[0].lot_no} />
                       </div>
            <div className="form-group w-full">
           z   <label>Invoice No : <b>{records[0].invoice_no}</b></label><br/> 
              <input type="hidden" name="invoice_no" value={records[0].invoice_no} />
               
                       </div>
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange}   className="form-control mb-3 mt-2" />
          </div>    
          <div className="form-group w-full">
              <label>Party Name : <b>{records[0].party_name}</b></label><br/> 
              <input type="hidden" name="party_id" value={records[0].party_id} />
                       </div>
 
          <div className="form-group w-full">
              <label>item Name : <b>{records[0].name}</b></label><br/> 
              <input type="hidden" name="item_id" value={records[0].item_id} />
                       </div>

          <div className="form-group">
            <label>Piece</label>
            <b> <span>Total {records[0].piece}</span> </b><br/>
            <input type="number" onChange={HandelChange}    className="form-control mb-3 mt-2" name="piece" placeholder="pieces for proceed In" />
          </div>
          <div className="form-group">
                   <b>{records[0].category_unit}</b>
            <input type="number" name="size" onKeyUp={HandelChange}  className="form-control mb-3 mt-2" placeholder="size"  />
            <input type="hidden" name="item_id" value={records[0].category_unit} />

          </div>
          <div className="form-group">
            <label>Damage Piece</label>
            <input type="text" onChange={HandelChange}    className="form-control mb-3 mt-2" name="damage" placeholder="damage" />
          </div>
          <div className="form-group">
            <label>Comments</label>
            <input type="text" onChange={HandelChange}    className="form-control mb-3 mt-2" name="comment" placeholder="comment" />
          </div>
{/* 
          <div className="form-group">
            <label>Rate : <b>{records[0].rate}</b></label><br/>
            <input type="number"  name="rate" onKeyUp={HandelChange}    className="form-control mb-3 mt-2"  placeholder="rate" />
          </div> */}
         

           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/pin-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form