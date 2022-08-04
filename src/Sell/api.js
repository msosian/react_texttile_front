export const getParty=()=>fetch('http://localhost/sites/project/party/party').then(res=>res.json())
export const getCategory=()=>fetch('http://localhost/sites/project/category/category').then(res=>res.json())
export const getItem=()=>fetch('http://localhost/sites/project/item/item').then(res=>res.json())
export const getReport=(input)=>fetch(`http://localhost/sites/project/sell/report`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)  
}).then(res=>res.json()) 

export const getReportM=()=>fetch(`http://localhost/sites/project/sell/reportm`).then(res=>res.json())

export const getSell=()=>fetch(`http://localhost/sites/project/sell/sell`).then(res=>res.json()) 
export const createSell=(input)=>fetch('http://localhost/sites/project/sell/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateSell=(id,input)=>fetch(`http://localhost/sites/project/sell/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditSell=(id)=>fetch(`http://localhost/sites/project/sell/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteSell=(id)=>fetch(`http://localhost/sites/project/sell/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())

