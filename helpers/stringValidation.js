const validNameRegExp = /^[^0-9]\w+$/;
const validAgeRegExp = /^(?:1[01][0-9]|120|[6-9]|1[0-9]|[2-9][0-9])$/;
const validEmailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validPasswordRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

module.exports = {
  checkIsValidLogin: (email, password) =>
    validEmailRegExp.test(email) && validPasswordRegExp.test(password),
  checkIsValidRegister: (name = '', age, email, password) =>
    validNameRegExp.test(name) &&
    validAgeRegExp.test(age) &&
    validEmailRegExp.test(email) &&
    validPasswordRegExp.test(password),
};
