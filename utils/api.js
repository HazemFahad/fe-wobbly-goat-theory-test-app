import axios from "axios";
const { API_URL } = require("../config");

const theoryTestApi = axios.create({
  baseURL: API_URL,
});

export const getQuestionByID = (id) => {
  return theoryTestApi.get(`/question/${id}`).then(({ data }) => {
    return data;
  });
};

export const getNewTest = (email, password, type_id, categories) => {
  return theoryTestApi
    .post("/test/create", {
      email: email,
      password: password,
      type_id: type_id,
      categories: categories,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCategories = () => {
  return theoryTestApi.get(`/categories`).then(({ data }) => {
    return data;
  });
};

export const sendAnswer = (
  test_question_id,
  email,
  password,
  user_answer_number
) => {
  return theoryTestApi
    .post(`/test/update/${test_question_id}`, {
      email: email,
      password: password,
      user_answer_number: user_answer_number,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getTestsByUser = (email, password) => {
  return theoryTestApi
    .post(`/tests`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getResults = (email, password, test_id) => {
  return theoryTestApi
    .post(`/test/get/${test_id}`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCenters = (postcode) => {
  return theoryTestApi
    .post(`/centers`, {
      postcode: postcode,
    })
    .then(({ data }) => {
      return data;
    });
};

export const getStats = (email, password) => {
  return theoryTestApi
    .post(`/stats`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
    });
};
