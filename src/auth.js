import { getAuth } from './api';

const auth = {
  async checkAuth(callback) {
    const response = await getAuth();
    if (response.error) {
      return callback(false);
    }
    const result = await response.json();
    if (result.error) {
      return callback(false);
    }
    callback(true);
  }
};

export default auth;
