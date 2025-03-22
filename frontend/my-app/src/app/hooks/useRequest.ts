// import axios from "axios"
// import { useState } from "react"

// export const useRequest = () => {
//     const [errors, setState] = useState<null | {message: string[]}[]>(null)
//     const doRequest = async({url,method,body,onSuccess}:{url: string, method: 'get' | 'post' | 'patch' | 'delete' | 'put', body: object, onSuccess: (data: any) => void}) => {
            
//         try {
//             setState(null)
//             const response = await axios[method](url, body)
//             if(onSuccess) {
//                 onSuccess(response.data)
//             }
//             return response.data

//         } catch (err) {
//             console.log(err,"ki");
            
//             // setState(err)
//         }
//     }
//     return {doRequest, errors}
// }