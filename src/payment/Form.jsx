import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {get,getParty,getItems} from './api'

function Form(Props)
{
    var [item,setItem]=useState([]);
    var [itemList,setItemList]=useState([]);

     var [category,setCategory]=useState([]);
     var [party,setParty]=useState([])
     var[unit,setUnit]=useState("")
     var[Total,setTotal]=useState("")
    var [temp,setTemp]=useState([])

    var [selects,setSelect]=useState({
      Date:0,
      key:0,
      item_id:"",
      category,
      party,
      piece:0,
      rate:0,
      size:0,
      TotalBill:""
    })
    useEffect(()=>{
      const getItemss=async()=>{
        let data=await getItems()  
          setItemList(data.data.list)
          localStorage.setItem("items",JSON.stringify(data.data.list))
          
     }      
     const getType=async()=>{
        let data=await getCategory()  
          setCategory(data.data.list)
          localStorage.setItem("category",JSON.stringify(data.data.list))
          
     }
     const getParties=async()=>{
      let data=await getParty();
      console.log(data.data.list[0])
      setParty(data.data.list)
      localStorage.setItem("party",JSON.stringify(data.data.list))
      

     }
     let category= localStorage.getItem("category")
     let party= localStorage.getItem("party")
     let items= localStorage.getItem("items")
   
     

     console.log("printing data")
     if(category === null && party === null && items === null){
        console .log("coming from server")
      getItemss()
      getType()
      getParties()
     }
     else{
      console.log("coming from localstorage")
      let data1=JSON.parse(category)
      let data2=JSON.parse(party)
      let data3=JSON.parse(items)
      setCategory(data1)
      setParty(data2)
      setItemList(data3)
  }


    },[])
    function HandelChange(event)
    { 
      
      let name=event.target.name
      let value=event.target.value
      if(name === 'category_id'){

        console.log(value)
        // category.findIndex(value)
        let ci=category.findIndex((item) => item.category_id == value);
        console.log(ci)
        console.log(category[ci].category_unit)
        setUnit(category[ci].category_unit)
     
        let test= itemList.filter((elm)=> elm.item_type == value)
        console.log(test)
        setItem(test)
        // getItems();
      }
      setSelect((pre)=>{
           return{
          ...pre,
          [name]:value,  
          // selects.Total=selects.rate*selects.size   
        }
      })
      if(name === 'size'){

        calculate(value,selects.rate)
      }
      if(name === 'rate'){

        calculate(selects.size,value)
      }
     


    
    }
   
    function calculate(s,r){
      console.log(" in function:"+s+"--"+r)
    
      let newBill=s*r
      setTotal(newBill)
      selects.TotalBill=newBill
    }
    let HandelSub=(event)=>{
      event.preventDefault()
              Props.submit(selects,Total);
         
  }
       return <>
        <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Invoice </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange}   className="form-control mb-3 mt-2" />
          </div>    
        

          <div className="form-group w-full">
              <label>Category Type</label><br/> 
              <select name="category_id"   className="form-group"  value={selects.category} onChange={HandelChange}>
              <option >Select A choice</option>
                   
                   {category.map((item)=>{
                     return(
                       <option id={item.category_unit} value={item.category_id}>{item.category_name}</option>
                       
                       )
                           
          })}
                   
            </select>
          </div>
          <div className="form-group">
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
          </div> 
          <div className="form-group w-full">
              <label>item</label><br/> 
              <select name="item_id"  className="form-group"  value={selects.item} onChange={HandelChange}>
                      <option >Select A choice</option>
                   {item.map((item)=>{
                    return(
                      <option   value={item.item_id}>{item.name}</option>
                    
                      )
                           
          })}
                   
            </select>
          </div>

          <div className="form-group">
            <label>piece</label><br/>
            <input type="number" onChange={HandelChange}    className="form-control mb-3 mt-2" name="piece" placeholder="piece" />
          </div>
          <div className="form-group">
                  {unit}
            <input type="number" name="size" onKeyUp={HandelChange}  className="form-control mb-3 mt-2" placeholder="size" />
          </div>

          <div className="form-group">
            <label>Rate</label><br/>
            <input type="number"  name="rate" onKeyUp={HandelChange} onMouseEnter={calculate}   className="form-control mb-3 mt-2"  placeholder="rate" />
          </div>
         
          <div className="form-group">
            <label  > View Grand Total </label><br/>
            <input type="hidden"  name="Total" value={selects.TotalBill} />
            
            <h4>{selects.TotalBill}</h4>
          </div>

           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form