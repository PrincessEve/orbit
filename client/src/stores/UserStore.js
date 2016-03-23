'use strict';

import Reflux from 'reflux';
import Actions from 'actions/UIActions';
import UserActions from 'actions/UserActions';
import NetworkActions from 'actions/NetworkActions';
import SocketActions from 'actions/SocketActions';

var UserStore = Reflux.createStore({
  listenables: [UserActions, NetworkActions, SocketActions],
  init: function() {
    this.user = null;
  },
  onUpdateUser: function(user) {
    console.log("--> received user:", user);
    if(user) {
      this.user = user;
    } else {
      console.log("Not logged in");
    }
    this.trigger(this.user);
  },
  onSocketConnected: function(socket) {
    console.log("UserStore connected");
  },
  onSocketDisconnected: function() {
    this.user = null;
    this.trigger(this.user);
  },
  onDisconnect: function() {
    this.user = null;
    this.trigger(this.user);
  },
  onGetUser: function(callback) {
    callback(this.user);
  }
});

export default UserStore;
