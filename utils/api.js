import axios from "axios";
const {API_URL} = require("../config");


const theoryTestApi = axios.create({
  baseURL: {API_URL},
});

export const getQuestionByID = (id) => {
  return theoryTestApi.get(`/question/${id}`).then(({ data }) => {
    return data;
  });
};  
