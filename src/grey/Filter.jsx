import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getParty,getCategory} from './api'
function Filter(Props)
{
    var [party,setParty]=useState([])
    var [category,setCategory]=useState([])

    var [values,setValues]=useState({
      from:null,
      to:null,
      party_id:null,
      category_id:null,
      invoice_no:null

    })
    var [list,setList]=useState([])
    useEffect(()=>{
        const getParties=async()=>{
           let data=await getParty()
           console.log(data)
           setParty(data.data.list)
        }
        const getCategories=async()=>{
          let data=await getCategory()
          console.log(data)
          setCategory(data.data.list)
       }
        getParties()
        getCategories()
      },[])
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
  var  data=JSON.parse(localStorage.getItem('invoice'))
  if(values.party_id !=null && values.invoice_no !=null && values.category_id){
    alert('please All Fileds')
  }
// if(values.party_id !=null){
//   let newData=data.filter((listt,index)=>{
//     console.log(listt.party_id)
//     return listt.party_id === values.party_id
//   })
//   console.log(newData)
//   setList(newData)
// }
// if(values.invoice_no !=null){
//   let newData=data.filter((listt,index)=>{
//     console.log(listt.party_id)
//     return listt.invoice_sno === values.invoice_no
//   })
//   console.log(newData)
//   setList(newData)
// }
// if(values.from && values.to && values.party_id && values.invoice_no  === null){}
// {console.log("gerr")

// }}

      if(values.party_id !=null){
          let newData=data.filter((listt)=>{
            console.log(listt.party_id)
            return listt.party_id === values.party_id
          })
          console.log(newData)
          setList(newData)
        }
        if(values.category_id !=null){
          let newData=data.filter((listt)=>{
            console.log(listt.category_id)
            return listt.category_id === values.category_id
          })
          console.log(newData)
          setList(newData)
        }
        if(values.invoice_no !=null){
          let newData=data.filter((listt)=>{
            console.log(listt.invoice_no)
            return listt.invoice_no === values.invoice_no
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
              <label> From Date </label><br/>
              <input name="from" type="date" onChange={HandelChange}   className="form-control mb-3 mt-2" />
          </div>    
          <div className="form-group">
              <label> TO Date </label><br/>
              <input name="to" type="date" onChange={HandelChange}   className="form-control mb-3 mt-2" />
          </div>

          <div className="form-group">
              <label>Party Name</label><br/>
              <select name="party_id" value={values.party_id} onChange={HandelChange}>
              <option >Select A choice</option>
              {party.map((item)=>{
                     return(
                       <option value={item.party_id}>{item.party_name}</option>
                       
                          )
 
                 })}
                    

              </select>
          </div> 
          <div className="form-group w-full">
              <label>Category Type</label><br/> 
              <select name="category_id"   className="form-group"  value={values.category_id} onChange={HandelChange}>
              <option >Select A choice</option>
                   
                   {category.map((item)=>{
                     return(
                       <option id={item.category_unit} value={item.category_id}>{item.category_name}</option>
                       
                       )
                           
          })}
                   
            </select>
          </div>

          <div className="form-group">
            <label>Invoice NO</label><br/>
            <input type="number" onChange={HandelChange}    className="form-control mb-3 mt-2" name="invoice_no" placeholder="invoice_no" />
          </div>
          
          <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> Filter  
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/invoice-filter-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

        <div id="list" className="d-flex vh-100 align-items-center justify-content-center" >
        <div className="col-md-10 col-sm-6 p-4 rounded shadow m-3" style={{backgroundColor: "#fff;"}}>
        <div className="mb-3 row d-flex align-items-center"><NavLink className="btn btn-secondary col-md-6 mb-3 m-auto" to="/invoice-create"><i className="fa fa-plus me-1"></i> Create New Invoice</NavLink> <h3 className="col-md-6 mb-3 text-center">Invoice List</h3>
          </div>
          <table className="table table-striped" >
          <tr>
        <th>Invoice NO</th>
         <th>Date</th>
        <th>Category</th>
        <th>Party Name</th>
        <th>Total</th>
        <th>Action</th>
        


         </tr>
          {list.map((item)=>
               <tr>
               <td>{item.invoice_no}</td>

               <td>{item.Date}</td>
               <td>{item.category_name}</td>
               <td>{item.party_name}</td>
               <td>{item.Total}</td>


                  <td>
                    <NavLink  to={`/proceed_out/${item.invoice_id}`} > <button className="btn btn-primary "> Procced Out</button>  </NavLink>
                    <NavLink  to={`/proceed_in/${item.invoice_id}`} > <button className="btn btn-primary "> Procced in</button>  </NavLink>
                    
                    
                    </td> 
      
           </tr>
        
          )}
            
            
         </table>

      </div>
            </div>

        

    </>
}
export default Filter