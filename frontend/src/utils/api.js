class Api {
  constructor(opts) {
    this._baseUrl = opts.baseUrl;
    this._headers = opts.headers;
  }

  static _checkResponse(response) {
    if (response.ok) return response.json();
    return Promise.reject(`Error: ${response.status}`);
  }

  static _setValidHeaders(headers) {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: Api._setValidHeaders(this._headers),
    }).then(Api._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: Api._setValidHeaders(this._headers),
    }).then(Api._checkResponse);
  }

  refreshUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: Api._setValidHeaders(this._headers),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(Api._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: Api._setValidHeaders(this._headers),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(Api._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: Api._setValidHeaders(this._headers),
    }).then(Api._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: Api._setValidHeaders(this._headers),
    }).then(Api._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return !isLiked ? this.unlikeCard(cardId) : this.likeCard(cardId);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: Api._setValidHeaders(this._headers),
    }).then(Api._checkResponse);
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: Api._setValidHeaders(this._headers),
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(Api._checkResponse);
  }
}

const apiOpts = {
  baseUrl: "https://api.rastvl.students.nomoredomains.xyz",
  headers: {
    //authorization: '78d500a1-0825-40b4-9b92-2b8f678f6707',
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiOpts);
