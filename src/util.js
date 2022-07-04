import DATA from "./data";


//JUST SWITCH BETWEEN THE TWO FUNCTIONS TO SWITCH BETWEEN LOCAL MODE AND API MODE



// export const mockDataFetch = (query)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(DATA.filter(item=>item.name.toLowerCase().includes(query.toLowerCase())))
//         },[2000])
//     })
// }



export const mockDataFetch =async (query)=>{
    const dataJSON = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await dataJSON.json()
    return data.filter(item=>item.name.toLowerCase().includes(query.toLowerCase()))
}