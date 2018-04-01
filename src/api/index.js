const BASE_URL = 'http://neat-mvp-api.herokuapp.com/v1';
const API_KEY = 'bae0a624b0054330eedbeff6663fc734';

export function login(data) {
  return fetch(`${BASE_URL}/auth`, {
    method: 'post',
    body: data
  });
}

export function getAuth() {
  const user = JSON.parse(localStorage.getItem('user'));

  return fetch(`${BASE_URL}/users/${user ? user.id : undefined}`);
}

export function fetchUsers() {
  // TO DO: Will use this if the API is not returned 500 again
  // return fetch(`${BASE_URL}/users`);

  // Mock Data
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 500, {
      json: () =>
        new Promise((resolve, reject) => {
          resolve({
            object: 'list',
            data: [
              {
                id: 'user_uhH0uchR3O8862zR',
                created_at: 1522426995,
                email: 'sujonochen91@gmail.com',
                first_name: 'Su',
                last_name: 'Jono',
                admin: true
              },
              {
                id: 'user_zJVG10WJFJMKD9',
                created_at: 1522426995,
                email: 'sujono@bluejack.binus.ac.id',
                first_name: 'Sujono',
                last_name: 'Sujono',
                admin: true
              }
            ]
          });
        })
    });
  });
}

export function fetchUser(id) {
  return fetch(`${BASE_URL}/users/${id}`);
}

export function addUser(data) {
  return fetch(`${BASE_URL}/users`, {
    method: 'post',
    body: data
  });
}

export function fetchForex() {
  return fetch(
    `http://api.fixer.io/latest?base=HKD&access_key=${API_KEY}&format=json&symbols=USD,EUR,SGD,JPY,CNY`
  );
}
