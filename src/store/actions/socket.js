import { io } from "socket.io-client";
import { createAction } from "@reduxjs/toolkit";
import { Toast } from "toastify-react-native";
// import newMessageAudio from '../../assets/sounds/new-message.mp3'
//
// const audio = new Audio(newMessageAudio);

const { API_URL } = process.env;

export const socketNewMessage = createAction("socket/socketNewMessage");
export const socketUserOnline = createAction("socket/socketUserOnline");
export const socketUserOffline = createAction("socket/socketUserOffline");

let socket;
export const socketConnect = (token) => {
  return (dispatch, getSate) => {
    if (socket) {
      return;
    }
    socket = io(API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("new-message", (data) => {
      const state = getSate();
      const { message, friend } = data;
      if (+state.users.friend.id === +message.from) {
        dispatch(socketNewMessage({
          message,
        }));
      } else {
        if (audio.played.length > 0) {
          audio.pause();
          audio.currentTime = 0;
        }
        // audio.play().catch(console.error)

        Toast.info(`New Message From ${friend.firstName} ${friend.lastName}`);
      }
    });
    socket.on("user-online", (userId) => {
      dispatch(socketUserOnline(userId));
    });
    socket.on("user-offline", (userId) => {
      dispatch(socketUserOffline(userId));
    });
    socket.on("connect", () => {
      console.log(socket);
    });
  };
};

export const socketDisconnect = () => {
  return () => {
    if (!socket) {
      return;
    }
    socket.disconnect();
    socket = null;
  };
};
