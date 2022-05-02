import axios from "axios";

const theoryTestApi = axios.create({
  baseURL: "https://theory.sajjel.info/api",
});

export const getQuestionByID = (id) => {
  return theoryTestApi.get(`/question/${id}`).then(({ data }) => {
    return data;
  });
};
