var firemp = {
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
            update(ref(getDatabase(), 'gameid/' + firemp.gameid), {
                "players": players
              });
              setInterval(function() {get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(function(snapshot) {if (!snapshot.exists()) {onend()}})},2000)
          }
        })
    },
    leaveGame: function(name) {
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
    listen: function(event,y,n) {
        return setInterval(function() {
        get(child(ref(getDatabase()), "gameid/" + firemp.gameid + "/" + event)).then((snapshot) => {
            if (snapshot.exists()) {
              y(snapshot.val())
            } else {
              if(n) {n()}
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
    playerDataAdd: function(name,type,data) {
      update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(name) + "/" + type), data); 
    },
    playerDataRemove: function(name,type) {
      update(ref(getDatabase(), 'gameid/' + firemp.gameid + "/playerData/" + btoa(name) + "/" + type), {}); 
    },
    getPlayerList: function(func) {
      get(child(ref(getDatabase()), "gameid/" + firemp.gameid)).then(async function(snapshot) {
        if (snapshot.exists()) {
          var data = snapshot.val()
          func(data.players)
        }
      })
    }
};