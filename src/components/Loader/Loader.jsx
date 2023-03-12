import axios from 'axios';

export const Loader = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=34245251-6411f4167ae6b395d699c44eb&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
};

export default Loader;
