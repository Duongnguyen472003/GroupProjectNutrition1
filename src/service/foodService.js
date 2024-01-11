import axios from '../setup/axios';

const fetchFood = async (name, lang) => {
    try {
      return await axios.get(`apiFood.php`, {params: { name, lang}});
    } catch (error) {
      console.log(error);
    }
  };

  export {
    fetchFood,
  }