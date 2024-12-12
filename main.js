var firemp = {
    listeners: {},
    createGame: function(oncomplete) {
        firemp.gameid = Math.ceil(Math.random() * (20000000 - 10000000) + 10000000);
        get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(async function(snapshot) {
            if (snapshot.exists()) {firemp.createGame(oncomplete)} else {
            await update(ref(getDatabase(), 'gameid/' + firemp.gameid), {
              "players": []
            });
            get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then((snapshot) => {
                if (snapshot.exists()) {
                  oncomplete(firemp.gameid)
                } else {
                    alert("Game Creation Error")
                }
            })
            }})
    },
    endGame: function() {
        update(ref(getDatabase(), 'gameid/' + firemp.gameid), {});
    },
    joinGame: function(name,onend) {
        get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
          if (snapshot.exists()) {
            var data = snapshot.val();
            var players = data.players;
            players.push(name);
            firemp.playerName = name
            update(ref(getDatabase(), 'gameid/' + firemp.gameid), {
                "players": players
              });
              setInterval(function() {get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {if (!snapshot.exists()) {onend()}})},2000)
          }
        })
    },
    leaveGame: function() {
        get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
            if (snapshot.exists()) {
              var data = snapshot.val();
              var players = data.players;
              delete players[firemp.playerName];
              update(ref(getDatabase(), 'gameid/' + firemp.gameid), {
                  "players": players
                });
            }
          })
    },
    listen: function(event,y,n) {
        firemp.listeners[event] = false
        return setInterval(function() {
        get(child(ref(getDatabase()), "gameid/" + firemp.gameid + "/" + event)).then((snapshot) => {
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
    },
    send: function(event,value) {
        update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/" + event), value);
    },
    remove: function(event) {
        update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/" + event), {});
    },
    playerDataAdd: function(type,data) {
      update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(firemp.playerName) + "/" + type), data); 
    },
    playerDataRemove: function(type) {
      update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(firemp.playerName) + "/" + type), {}); 
    },
    getPlayerList: function(func) {
      get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(async function(snapshot) {
        if (snapshot.exists()) {
          var data = snapshot.val()
          func(data.players)
        }
      })
    },
    removePlayer: function(name) {
      get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {
          if (snapshot.exists()) {
            var data = snapshot.val();
            var players = data.players;
            delete players[name];
            update(ref(getDatabase(), 'gameid/' + firemp.gameid), {
                "players": players
              });
          }
        })
  },
};