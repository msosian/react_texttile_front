import Form from "./Form";
import {UpdatePout,EditPout,getRecord,getParty} from './api'
import React, { useEffect, useState } from "react"
import {useNavigate,useParams } from"react-router-dom"
import {NavLink} from "react-router-dom"

function Update()
{
    let nevigate=useNavigate()
    var {id}=useParams()
    var[parties,setParties]=useState([])
    var [temp,setTemp]=useState([])
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
        var responce=await UpdatePout(values)
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
            const User=await EditPout(id)
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
        const fetchParties=async ()=>{
            const data=await getParty()
            console.log(data)
            setParties(data.data.list)
        }

        fetchUser()
        fetchParties()
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
          <h2 style={{textAlign:"center"}} >Procced Out </h2>
          
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
          <div className="form-group">
              <label>Party Name</label><br/>
              <select name="party_id" value={values.party_id} onChange={HandelChange}>
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
              <input type="hidden" name="item"  value={values.item_id}  />
                       </div>

          <div className="form-group">
            <label>Piece</label>
            <b> <span>Total {records[0].piece}</span> </b><br/>
            <input type="number" name="piece"  onChange={HandelChange}    className="form-control mb-3 mt-2"  value={values.piece} placeholder="pieces for proceed In" />
          </div>
          <div className="form-group">
                   <b>{records[0].category_unit}</b>
            <input type="number" name="size" onChange={HandelChange}  className="form-control mb-3 mt-2" placeholder="size" value={values.size}  />
            <input type="hidden" name="categosry_unit" value={records[0].category_unit} />

          </div>
          
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