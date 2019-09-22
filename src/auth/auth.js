class Auth {
  constructor() {
    this.authenticated = false;
  }
  login(cb) {
    cb();
    this.authenticated = true;
  }
  logout(cb) {
    cb();
    this.authenticated = false;
  }
  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
