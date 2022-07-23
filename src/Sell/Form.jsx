import React, { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import {getParty,getCategory,getItem, EditSell} from './api'
import {useParams } from"react-router-dom"

function Form(Props)
{
  var {id}=useParams()
    var [parties,setParties]=useState([]);
    var [category,setCategory]=useState([]);
    var [items,setItmes]=useState([]);
    var [itemList,setItemList]=useState([]);

    var[unit,setUnit]=useState("")
    var[TotalAmount,setTotal]=useState("")
   var [temp,setTemp]=useState([])

    var [selects,setSelect]=useState({
        Date:Props.sellDetail?Props.sellDetail.Date:0,
        key:0,
        item_id:Props.sellDetail?Props.sellDetail.item_id:"",
        category:Props.sellDetail?Props.sellDetail.category:"",
        party:Props.sellDetail?Props.sellDetail.party:"",
        quantity:Props.sellDetail?Props.sellDetail.quantity:0,
        rate:Props.sellDetail?Props.sellDetail.rate:0,
        size:Props.sellDetail?Props.sellDetail.size:0,
        Total:Props.sellDetail?Props.sellDetail.Total:"",
        DiscountType:Props.sellDetail?Props.sellDetail.DiscountType:"",
        Discount:Props.sellDetail?Props.sellDetail.Discount:0,
        GrandTotal:Props.sellDetail?Props.sellDetail.GrandTotal:0
      })
    
  
        useEffect(()=>{
         
     const getParties=async ()=>{
      const data=await getParty()
       console.log(data)
       setParties(data.data.list)
     localStorage.setItem("Party",JSON.stringify(data.data.list))

  }
  const getCategories=async ()=>{
    const data=await getCategory()
     console.log(data)
     setCategory(data.data.list)
     localStorage.setItem("category",JSON.stringify(data.data.list))

}
const getItems=async ()=>{
    const data=await getItem()
     console.log(data) 
     setItemList(data.data.list)
     localStorage.setItem("items",JSON.stringify(data.data.list))
  
     
}
const fetchSell=async()=>{
  const data=await EditSell(id)
   console.log(data)
   setSelect(data[0])
}
let category= localStorage.getItem("category")
let party= localStorage.getItem("Party")
let items= localStorage.getItem("items")

console.log("printing data")
console.log(Props.sellDetail)
if(category === null && party === null && items === null){
    console .log("coming from server")
    getParties();
    getCategories();
    getItems();
}
else{
  console.log("coming from localstorage")
  let data1=JSON.parse(category)
  let data2=JSON.parse(party)
  let data3=JSON.parse(items)
  setCategory(data1)
  setParties(data2)
  setItemList(data3)

}
fetchSell()
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
        setItmes(test)
        // getItems();
      }
      setSelect((pre)=>{
        console.log(value)
           return{
          ...pre,
          [name]:value,  
          // selects.Total=selects.rate*selects.size   
        }
      })
      if(name === 'Discount'){

      DisCal(selects.DiscountType,value)
    }
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
      selects.Total=newBill
    }
    function DisCal(type,Amount){
        if(type === 'flat'){
            selects.GrandTotal=selects.Total-Amount
        }
         else{
            selects.GrandTotal=selects.Total*Amount/100
        }
        console.log(type)
        console.log(Amount)

    }
    let HandelSub=(event)=>{
      event.preventDefault()
              Props.submit(selects);
         
  }
       return <>
          <div className="d-flex vh-200 align-items-center justify-content-center  " style={{backgroundColor:"#0dcaf0"}}>
        <div className=" vh-50 col-md-6 col-sm-8 p-3 rounded shadow mt-5 " 
        style={{backgroundColor:"white"}}>
          <h2 style={{textAlign:"center"}} >Sales Entry </h2>
          
        <form autoComplete="off" onSubmit={HandelSub} method="POST">
        <div className="form-group">
              <label> Date </label><br/>
              <input name="Date" type="date" onChange={HandelChange} value={selects.Date}   className="form-control mb-3 mt-2" />
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
              {parties.map((elm,index)=>{
            if(elm.party_type === "5" || elm.party_type === "3"  || elm.party_type === "6" || elm.party_type === "0" ){
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
              <select name="item_id"  className="form-group"  value={selects.item_id} onChange={HandelChange}>
                      <option >Select A choice</option>
                   {items.map((item)=>{
                    return(
                      <option   value={item.item_id}>{item.name}</option>
                    
                      )
                           
          })}
                   
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label><br/>
            <input type="number" onChange={HandelChange} value={selects.quantity}   className="form-control mb-3 mt-2" name="quantity" placeholder="Quantity" />
          </div>
          <div className="form-group">
                  {unit}
            <input type="number" name="size" onChange={HandelChange} value={selects.size}  className="form-control mb-3 mt-2" placeholder="size" />
          </div>

          <div className="form-group">
            <label>Rate</label><br/>
            <input type="number"  name="rate" onChange={HandelChange} value={selects.rate} onMouseEnter={calculate}   className="form-control mb-3 mt-2"  placeholder="rate" />
          </div>
         
          <div className="form-group">
            <label  >  Total </label><br/>
            <input type="hidden"  name="Total" value={selects.Total} />
            
            <h4>{selects.Total}</h4>
          </div>
          <div className="form-group w-full">
              <label>Discount Type</label><br/> 
              <select name="DiscountType"  className="form-group"  onChange={HandelChange} value={selects.DiscountType}>
                      <option >Select A choice</option>
                      <option   value="flat">Flat</option>
                      <option   value="percentage">Percentage</option>

                    
                           
                   
            </select>
          </div>
          <div className="form-group">
            <label  > Discount Amount </label><br/>
            <input type="number"  name="Discount" placeholder="Enter Discount" onChange={HandelChange}  value={selects.Discount}/>
            
            <h4>{selects.DiscountAmount}</h4>
          </div>
          <div className="form-group">
            <label  >  Grand Total </label><br/>
            <input type="hidden"  name="GrandTotal" value={selects.GrandTotal} />
            
            <h4>{selects.GrandTotal}</h4>
          </div>
           <div className="form-group d-flex justify-content-around">
            <button type="submit"  className="btn btn-info text-light m-1">
                    <i className="fa fa-database me-1"></i> {Props.btn}
            </button>
            <button type="button" className="btn btn-info text-light m-1">
              <i className="fa fa-list-alt me-1"></i> 
              <NavLink to="/sell-list" className="text-light text-decoration-none">View All</NavLink>
            </button>      
          </div>
        </form>
        </div>
        </div>

    </>
}
export default Form