import axios from 'axios';


const headers = {
  headers : {
      'Content-Type' : 'application/json',
  }
}


export const signUp = (requestBody) => {
    return axios.post('https://rider-food.vercel.app/users/signup',requestBody,headers).then(
        (response)=>{
            return response.data
    },
    (err)=>{
        console.log(err);
        
    }
)
}


  export const login = (requestBody) => {
    return    axios.post('https://rider-food.vercel.app/users/signin',requestBody,headers).then(
      (response)=>{
        localStorage.setItem('Token',response.data.token)
          return response.data
  },
  (err)=>{
      console.log(err);
      
  })
  };



