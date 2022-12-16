export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkServer(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkServer)
    }

    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkServer)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkServer)

    }
};
// другие методы работы с API