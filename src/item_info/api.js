export const getItem=()=>fetch('http://localhost/sites/project/item/item').then(res=>res.json())
export const getCategory=()=>fetch('http://localhost/sites/project/category/category').then(res=>res.json())

export const CreateItem=(input)=>fetch('http://localhost/sites/project/item/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateItem=(id,input)=>fetch(`http://localhost/sites/project/item/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditItem=(id)=>fetch(`http://localhost/sites/project/item/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteItem=(id)=>fetch(`http://localhost/sites/project/item/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())