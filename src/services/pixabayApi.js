import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35169134-caa93ad6ede5d1a85710c58b2';

export const getSearchImage = async (query, page) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${query}`,
      per_page: '12',
      page,
    },
  });
  return response.data;
};
