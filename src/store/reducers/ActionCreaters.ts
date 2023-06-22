import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IComment, ResponseData } from "../../types/Icomment";


const { REACT_APP_URL } = process.env;




export const getComments = createAsyncThunk("comments/getAll", async () => {
  const response = await axios.get<Promise<ResponseData>>(
    `${REACT_APP_URL}?skip=0&limit=5`
  );

  return (await response.data).comments;
});

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: string) => {
    const response = await axios.delete<Promise<IComment>>(
      `${REACT_APP_URL}/${id}`
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComments",
  async (contact: object) => {
    const response = await axios.post<Promise<IComment>>(
      `${REACT_APP_URL}/add`,
      contact
    );
    return response.data;
  }
);


