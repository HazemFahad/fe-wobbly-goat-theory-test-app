import axios from "axios";
const { API_URL } = require("../config");

const theoryTestApi = axios.create({
  baseURL: API_URL,
});

const auth = {};


auth.signInWithEmailAndPassword = (email, password) => {
  return theoryTestApi
    .post(`/user/signin`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
        return data;
    })
    .catch((err) => {
      console.log(err, "<==========");
    });
};

auth.createUserWithEmailAndPassword = (
  name,
  email,
  password,
  password_confirmation
) => {
  return theoryTestApi
    .post(`/user/signup`, {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    })
    .then(({ data }) => {
      return data;
    });
};

auth.sendPasswordResetEmail = (email) => {
  return theoryTestApi
    .post(`/user/forget`, {
      email: email,
    })
    .then(({ data }) => {
      return data;
    });
};

auth.getAuth = () => {
  let user = {
    user_id: auth.user_id,
    name: auth.name,
    email: auth.email,
    password: auth.password,
    isLogged: auth.isLogged,
  };
  return user;
};


module.exports = auth;
