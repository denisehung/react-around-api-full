// export const BASE_URL = 'https://register.nomoreparties.co';
export const BASE_URL = 'https://api.dhung.students.nomoreparties.site';

function checkResponse(res){
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);    
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return checkResponse(res);
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(((res) => {
    return checkResponse(res);
  }))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      console.log(data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    return checkResponse(res);
  })
  .then(data => data)
}