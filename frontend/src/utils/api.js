class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res){
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);    
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  setUserInfo({ name, about }, token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  };
  

  addCard({ name, link }, token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  };

  removeCard(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE"
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  addLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "PUT"
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  removeLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE"
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  setUserAvatar(avatar, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }
}

const api = new Api({
  baseUrl: (process.env.NODE_ENV === "production" ? "https://react-around-server.herokuapp.com" : "http://localhost:3000")
});

export default api;
