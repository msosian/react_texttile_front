export const getCategory=()=>fetch('http://localhost/sites/project/category/category').then(res=>res.json())
export const getParty=()=>fetch('http://localhost/sites/project/party/party').then(res=>res.json())
           
export const getItem=(id)=>fetch(`http://localhost/sites/project/item/items/?id=${id}`).then(res=>res.json()) 
export const getItems=(id)=>fetch(`http://localhost/sites/project/item/item`).then(res=>res.json()) 
export const getInvoice=()=>fetch(`http://localhost/sites/project/invoice/invoice`).then(res=>res.json()) 
export const CreateInvoice=(input)=>fetch('http://localhost/sites/project/invoice/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

