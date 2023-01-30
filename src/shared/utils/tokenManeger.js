const ACCESS_TOKEN = "access-token";

export const tokenManager = {
  get token() {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  set token(value) {
    this._token = value.split(" ")[1];
    localStorage.setItem(ACCESS_TOKEN, this._token);
  },
};
