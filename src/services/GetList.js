/* 
Get Buscapé Items
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
*/
import axios from 'axios';

const GetList = {
  getItems() {
  	return axios.get(`assets/json/data.json`);
  }
};
  
export default GetList;