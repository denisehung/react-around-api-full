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
  
    getInitialCards() {
      return fetch(this._baseUrl + '/cards', {
          headers: this._headers
      })
      .then((res) => { 
        return this._checkResponse(res);      
      })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then((res) => { 
            return this._checkResponse(res);      
          })
    }

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
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
    

    addCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
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

    removeCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            headers: this._headers,
            method: "DELETE"
        })
        .then((res) => { 
            return this._checkResponse(res);      
          })
    }

    /*changeLikeCardStatus(cardId, isLiked){
        if(isLiked) {
            return fetch(this._baseUrl + '/cards/likes/' + cardId, {
                method: "DELETE",
                headers: this._headers
            })
            .then((res) => { 
                return this._checkResponse(res);      
              })
        } else {
            return fetch(this._baseUrl + '/cards/likes/' + cardId, {
                method: "PUT",
                headers: this._headers
            })
            .then((res) => { 
                return this._checkResponse(res);      
              })
        }
    }*/

    addLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: "PUT",
            headers: this._headers
        })
        .then((res) => { 
            return this._checkResponse(res);      
          })
    }

    removeLike(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: "DELETE",
            headers: this._headers
        })
        .then((res) => { 
            return this._checkResponse(res);      
          })
    }

    setUserAvatar({ avatar }) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            headers: this._headers,
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
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "75ee1925-b4bb-487f-88d2-d6f873f1ed28",
      "Content-Type": "application/json"
    }
  });

export default api;
  
