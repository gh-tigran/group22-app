import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";

export const sendMessageRequest = createAsyncThunk('messages/sendMessageRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.sendMessage(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data)
  }
});
export const messagesListRequest = createAsyncThunk('messages/messagesListRequest', async (payload, thunkAPI) => {
  try {
    const { friendId, ...params } = payload;
    const { data } = await Api.messagesList(friendId, params);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data)
  }
})
