export const firemp = {
    listeners: {},
    registerFunctions: function(getDatabase, ref, set, get, child, onValue) {
        firemp.firebase = {
          "getDatabase": getDatabase,
          "ref": ref,
          "set": set,
          "get": get,
          "child": child,
          "onValue": onValue
        }  
    },
    createGame: function(oncomplete) {
        firemp.gameid = Math.ceil(Math.random() * (20000000 - 10000000) + 10000000);
        firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid)).then(async function(snapshot) {
            if (snapshot.exists()) {firemp.createGame(oncomplete)} else {
            await firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid), {
              "started": false
            }).then(function() {oncomplete(firemp.gameid)}).catch((err) => alert("Game Creation Error\n" + err))
            }
          })
    },
    endGame: function() {
        firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid), {});
    },
    startGame: function() {
      firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/started"),true);
    },
    joinGame: function(gameid,name,onstart,onend) {
        firemp.gameid = gameid;
        firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
          if (snapshot.exists()) {
            var data = snapshot.val();
            if (data.players) {
              var players = data.players;
            } else {
                var players = []
            }
            players.push(name);
            firemp.playerName = name
            firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/players"),players);
              setInterval(function() {firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {if (!snapshot.exists()) {onend()} else if (snapshot.val().started == true) {onstart()}})},2000)
          }
        })
    },
    leaveGame: function() {
        firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
            if (snapshot.exists()) {
              var data = snapshot.val();
              var players = data.players;
              delete players[firemp.playerName];
              firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/players"),players);
            }
          })
    },
    listen: function(event,y,n) {
      firemp.firebase.onValue(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid + "/" + event), (snapshot) => {
        if (snapshot.exists()) {
          y(snapshot.val())
        } else {
          if(n) {n()}
        }
      })
        /*
        firemp.listeners[event] = false
        return setInterval(function() {
        firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid + "/" + event)).then((snapshot) => {
            if (snapshot.exists()) {
              if (firemp.listeners[event] == false) {
                y(snapshot.val())
                firemp.listeners[event] = true
              }
            } else {
              if (firemp.listeners[event] == true) {
                if(n) {n()}
                firemp.listeners[event] == false
              }
            }
          })
        },500)
        */
    },
    send: function(event,value) {
        firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/" + event), value);
    },
    remove: function(event) {
        firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/" + event), {});
    },
    playerDataAdd: function(type,data) {
      firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(firemp.playerName) + "/" + type), data); 
    },
    playerDataRemove: function(type) {
      firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(firemp.playerName) + "/" + type), {}); 
    },
    getPlayerList: function(func) {
      firemp.firebase.onValue(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid + "/players"),function(snapshot) {
        if (snapshot.exists()) {
          var data = snapshot.val()
          func(data)
        } else {
          console.log("No players")
        }
      })
    },
    removePlayer: function(name) {
      firemp.firebase.get(firemp.firebase.child(firemp.firebase.ref(firemp.firebase.getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
          if (snapshot.exists()) {
            var data = snapshot.val();
            var players = data.players;
            delete players[name];
            firemp.firebase.set(firemp.firebase.ref(firemp.firebase.getDatabase(), 'gameid/' + firemp.gameid + "/players"),players);
          }
        })
  },
  onstarted: function(func) {
      firemp.listen("started",function(data) {
          if (data == true) {
              func()
          }
      })
  }
};
