# FireMP
## A library for creating multiplayer games using Firebase Realtime Database
### Getting Started
tba
### createGame
Used to start a new game

Example: 
```
firemp.createGame(function(gameid) {
  alert("Game ID: " + gameid)
})
```

### endGame
Used to end the game

Example:
```
firemp.endGame()
```

### joinGame
Allows players to join the game

Example:
```
var playerName = prompt("Player Name")
firemp.joinGame(playerName,function() {alert("Game Over")})
```

### leaveGame
Allows a player to leave the game

Example:
```
firemp.leaveGame()
```

### listen
Listens for changes in a specified value

Example:
```
var listener = firemp.listen(<Your Value (string)>,function(data) {alert("Value Data: " + data)},function() {alert("Value Non-existent")})
// To stop listening
clearInterval(listener)
```

