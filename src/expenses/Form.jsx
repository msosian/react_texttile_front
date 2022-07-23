import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getType,getMode,EditExpenses} from './api'
import {useParams } from"react-router-dom"

function Form(Props)
{
  var {id}=useParams()

    var[type,setType]=useState([])
    var[mode,setMode]=useState([])
    var [selects,setSelect]=useState({
      Date:Props.expensesDetail?Props.expensesDetail.Date:"",
      Amount:Props.expensesDetail?Props.expensesDetail.Amount:"",
      expenses_type:Props.expensesDetail?Props.expensesDetail.expenses_type:"",
      expenses_tittle:Props.expensesDetail?Props.expensesDetail.expenses_tittle:"",
      expenses_detail:Props.expensesDetail?Props.expensesDetail.expenses_detail:"",
      payment_mode:Props.expensesDetail?Props.expensesDetail.payment_mode:"",
     
    })
    useEffect(()=>{
      const getTypes=async()=>{
        let data=await getType()  
          setType(data.data.list)
          localStorage.setItem("Type",JSON.stringify(data.data.list))
          
     }      
     const fetchexpenses=async ()=>{
      const data=await EditExpenses(id)
       console.log(data)
       setSelect(data[0])
  }
  const getModes=async()=>{
    let data=await getMode()  
    setMode(data.data.list)
    localStorage.setItem("Mode",JSON.stringify(data.data.list))
    
  }
  
  let Type= localStorage.getItem("Type")
  let Mode= localStorage.getItem("Mode")
  
  console.log("printing data")
  if(Type === null && Mode === null){
    console .log("coming from server")
    getTypes()
    getModes()
     }
     else{
      console.log("coming from localstorage")
      let data1=JSON.parse(Type)
      let data2=JSON.parse(Mode)
      setType(data1)
      setMode(data2)
  }
  fetchexpenses() 
    },[])
    function HandelChange(event)
    { 
      
      let name=event.target.name
      let value=event.target.value
      console.log(value)
     setSelect((pre)=>{
        return {
            ...pre,
            [name]:value
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
          <h2 style={{textAlign:"center"}} >Expenses  </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange} value={selects.Date}  className="form-control mb-3 mt-2" />
          </div>    
        

          <div className="form-group w-full">
              <label>expenses Type</label><br/> 
              <select name="expenses_type"   className="form-group"  value={selects.expenses_type} onChange={HandelChange}>
              <option >Select A choice</option>
                   
                   {type.map((item)=>{
                     return(
                       <option id={item.expense_id} value={item.expense_id}>{item.expense_name}</option>
                       
                       )
                           
          })}
                   
            </select>
          </div>

          {/* <div className="form-group">
              <label>Party Name</label><br/>
              <select name="party_id" value={selects.party} onChange={HandelChange}>
              <option >Select A choice</option>
              {party.map((elm,index)=>{
            if(elm.party_type === "1" || elm.party_type === "3" || elm.party_type === "0" ){
              temp[index]=elm
            }

         })}
              {temp.map((item)=>{
                    return(
                      <option value={item.party_id}>{item.party_name}</option>
                    )
                   })}

              </select>
          </div>  */}
         
          <div className="form-group">
            <label>Amount</label><br/>
            <input type="number" onChange={HandelChange} value={selects.Amount}    className="form-control mb-3 mt-2" name="Amount" placeholder="Amount" />
          </div>
          <div className="form-group">
                tittle
            <input type="text" name="expenses_tittle" value={selects.expenses_tittle} onChange={HandelChange}  className="form-control mb-3 mt-2" placeholder="tittle" />
          </div>

          <div className="form-group">
            <label>Detail</label><br/>
            <input type="text"  name="expenses_detail" value={selects.expenses_detail} onChange={HandelChange}   className="form-control mb-3 mt-2"  placeholder="detail" />
          </div>
         
         
          <div className="form-group w-full">
              <label>Payment Mode</label><br/> 
              <select name="payment_mode"   className="form-group"  value={selects.payment_mode} onChange={HandelChange}>
              <option >Select A choice</option>
                   
                   {mode.map((item)=>{
                     return(
                       <option id={item.payment_mode_id} value={item.payment_mode_id}>{item.payment_mode}</option>
                       
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
              <NavLink to="/expenses-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form