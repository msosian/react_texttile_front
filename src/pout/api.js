export const getParty=()=>fetch('http://localhost/sites/project/party/party').then(res=>res.json())
export const getRecord=(id)=>fetch(`http://localhost/sites/project/invoice/record/?id=${id}`).then(res=>res.json()) 
export const getItems=(id)=>fetch(`http://localhost/sites/project/invoice/item/?id=${id}`).then(res=>res.json()) 
export const getEntry=()=>fetch('http://localhost/sites/project/pout/pout').then(res=>res.json())

export const CreateEntry=(input)=>fetch('http://localhost/sites/project/pout/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())
export const UpdatePout=(input)=>fetch(`http://localhost/sites/project/pout/edit`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditPout=(id)=>fetch(`http://localhost/sites/project/pout/update/?id=${id}`).then(res=>res.json()) 

    export const DeletePout=(id)=>fetch(`http://localhost/sites/project/pout/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())

