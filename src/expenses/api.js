
export const getType=()=>fetch('http://localhost/sites/project/expenseType/type').then(res=>res.json())
export const getMode=()=>fetch('http://localhost/sites/project/payment/payment').then(res=>res.json())
           
export const getexpense=()=>fetch(`http://localhost/sites/project/expenses/expenses`).then(res=>res.json()) 
export const createEntry=(input)=>fetch('http://localhost/sites/project/expenses/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateExpenses=(id,input)=>fetch(`http://localhost/sites/project/expenses/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditExpenses=(id)=>fetch(`http://localhost/sites/project/expenses/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteExpenses=(id)=>fetch(`http://localhost/sites/project/expenses/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())

