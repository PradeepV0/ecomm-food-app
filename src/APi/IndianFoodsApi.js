import axios from 'axios';



export const getIndianFoods = (searchValue: Object) => {
    return axios
      .get(
        `https://rider-food.vercel.app/indianFoods/get-all`
      )
      .then(response => {
        const respData = {
          responseCode: response.status,
          response: response.data
        };
        console.log(respData,'sssss');
        return respData;
        
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };