export const getRecord=(id)=>fetch(`http://localhost/sites/project/invoice/record/?id=${id}`).then(res=>res.json()) 
export const getEntry=()=>fetch('http://localhost/sites/project/pin/pin').then(res=>res.json())

export const CreateEntry=(input)=>fetch('http://localhost/sites/project/pin/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())
export const UpdatePin=(input)=>fetch(`http://localhost/sites/project/pin/edit`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditPin=(id)=>fetch(`http://localhost/sites/project/pin/update/?id=${id}`).then(res=>res.json()) 

    export const DeletePin=(id)=>fetch(`http://localhost/sites/project/pin/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())

