export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }
    setAvatar(link) {
        this._avatar.src = link.avatar;
    }

    setUserInfo(data) {
        this._data = data;
        this._name.textContent = data.name;
        this._job.textContent = data.about;
    }
};