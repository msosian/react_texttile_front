import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getRecord,getParty,getItems,getItem} from './api'
import {useNavigate,useParams } from"react-router-dom"


function Form(Props)
{
    let nevigate=useNavigate()
    var {id}=useParams()
    var [records,setRecords]=useState([{name:"",piece:"",size:"",item_id:"",invoice_id:"",category_unit:""}])
    var[parties,setParties]=useState([])
    var [temp,setTemp]=useState([])
    var [selects,setSelect]=useState({
      Date:0,
      key:0,
      name:"",
      party_id:"",
      piece:0,
      size:0, 
      category_unit:records[0].category_unit,
      item_id:records[0].item_id,
      invoice_id:records[0].invoice_id
    })
    useEffect(()=>{
        const fetchRecords=async ()=>{
            console.log(id)
             const data=await getRecord(id)
              console.log(data)
             setRecords(data.data.list)
         }
         const fetchParties=async ()=>{
             const data=await getParty()
             console.log(data)
             setParties(data.data.list)
         }
        
            let record= localStorage.getItem("records")
            let party= localStorage.getItem("party")
            let items= localStorage.getItem("items")
            
            
            
            console.log("printing data")
            if(record === null && party === null && items === null){
                console .log("coming from server")
                fetchRecords()
                fetchParties()
            }
            else{
              console.log("coming from localstorage")
              let data1=JSON.parse(record)
              let data2=JSON.parse(party)
              let data3=JSON.parse(items)
              setRecords(data1)
              setParties(data2)

          }
     },[])
     function HandelChange(event)
    { 
      let name=event.target.name
      let value=event.target.value
      setSelect((pre)=>{
     selects.category_unit= records[0].category_unit

        selects.item_id=records[0].item_id
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
          <h2 style={{textAlign:"center"}} >Procced Out </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange}   className="form-control mb-3 mt-2" />
          </div>    
          <div className="form-group">
              <label>Party Name</label><br/>
              <select name="party_id" value={selects.party} onChange={HandelChange}>
              <option >Select A choice</option>
         {parties.map((elm,index)=>{
           console.log(elm)
            if(elm.party_type === "5" || elm.party_type === "4" || elm.party_type === "0" ){
              temp[index]=elm
            }

         })}
              {temp.map((item)=>{
                    return(
                      <option value={item.party_id}>{item.party_name}</option>
                    )
                   })}
              </select>
          </div>

                
          <div className="form-group w-full">
              <label>item Name : <b>{records[0].name}</b></label><br/> 
              <input type="hidden" name="item" value={records[0].item_id} />
                       </div>

          <div className="form-group">
            <label>Piece</label>
            <b> <span>Total {records[0].piece}</span> </b><br/>
            <input type="number" onChange={HandelChange}    className="form-control mb-3 mt-2" name="piece" placeholder="pieces for proceed out" />
          </div>
          <div className="form-group">
                   <b>{records[0].category_unit}</b>
            <input type="number" name="size" onKeyUp={HandelChange}  className="form-control mb-3 mt-2" placeholder="size"  />
            
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
              <NavLink to="/list-entries" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form