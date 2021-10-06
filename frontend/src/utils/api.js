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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  setUserInfo({ name, about }, token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE"
    })
    .then((res) => { 
      return this._checkResponse(res);      
    })
  }

  setUserAvatar({ avatar }, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
  baseUrl: "https://api.dhung.students.nomoreparties.site",
});

export default api;
