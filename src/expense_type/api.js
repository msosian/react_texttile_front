export const getType=()=>fetch('http://localhost/sites/project/expenseType/type').then(res=>res.json())
export const createEntry=(input)=>fetch('http://localhost/sites/project/expenseType/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateExpenses=(id,input)=>fetch(`http://localhost/sites/project/expenseType/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditExpenses=(id)=>fetch(`http://localhost/sites/project/expenseType/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteExpenses=(id)=>fetch(`http://localhost/sites/project/expenseType/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())

