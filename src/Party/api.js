export const getParty=()=>fetch('http://localhost/sites/project/party/party').then(res=>res.json())

export const CreateParty=(input)=>fetch('http://localhost/sites/project/party/add',{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())

export const UpdateParty=(id,input)=>fetch(`http://localhost/sites/project/party/edit/${id}`,{
    method:"POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body:JSON.stringify(input)
}).then(res=>res.json())                           
export const EditParty=(id)=>fetch(`http://localhost/sites/project/party/update/?id=${id}`).then(res=>res.json()) 

    export const DeleteParty=(id)=>fetch(`http://localhost/sites/project/party/delete/?id=${id}`,{
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
 },

}).then(res=>res.json())