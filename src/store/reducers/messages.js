import { createReducer } from "@reduxjs/toolkit";
import { socketNewMessage } from "../actions/socket";
import { messagesListRequest, sendMessageRequest } from "../actions/messages";

const initialState = {
  messagesList: [],
}

const users = createReducer(initialState, builder => {
  builder
    .addCase(messagesListRequest.pending, (state, action) => {
      state.messagesList = [];
    })
    .addCase(messagesListRequest.fulfilled, (state, action) => {
      const { messages } = action.payload;
      state.messagesList = messages;
    })
    .addCase(socketNewMessage, (state, action) => {
      const { message } = action.payload;
      state.messagesList.unshift(message)
    })
    .addCase(sendMessageRequest.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.messagesList.unshift(message)
    })
})
export default users;
