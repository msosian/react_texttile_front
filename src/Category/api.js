export const getCategory=()=>fetch('http://localhost/sites/project/category/category').then(res=>res.json())

export const CreateCategory=(input)=>fetch('http://localhost/sites/project/category/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateCategory=(id,input)=>fetch(`http://localhost/sites/project/category/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditCategory=(id)=>fetch(`http://localhost/sites/project/category/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteCategory=(id)=>fetch(`http://localhost/sites/project/category/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())