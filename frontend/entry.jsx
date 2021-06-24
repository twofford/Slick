import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import { updateUser } from "./actions/user_actions";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  let store;

  if (window.currentUser) {
    const preloadedState = {
      session: {
        user: { id: window.currentUser.id, channel: window.generalChannel },
      },
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    delete window.currentChannel;
  } else {
    const preloadedState = {
      session: { user: { channel: window.generalChannel } },
    };
    store = configureStore(preloadedState);
    delete window.currentChannel;
  }

  window.dispatch = store.dispatch;
  window.updateUser = updateUser;

  ReactDOM.render(<Root store={store} />, root);
});
