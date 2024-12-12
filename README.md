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
var listener = firemp.listen(<Value Name>,function(data) {alert("Value Data: " + data)},function() {alert("Value Non-existent")})
// To stop listening
clearInterval(listener)
```

### send
Add or update a game value

Example:
```
firemp.send(<Value Name>,<Value Data>)
```

### remove
Remove a game value

Example:
```
firemp.remove(<Value Name>)
```

### playerDataAdd
Add or update player data

Example:
```
firemp.playerDataAdd(<Value Name>,<Value Data>)
```

### playerDataRemove
Remove player data

Example:
```
firemp.playerDataRemove(<Value Name>)
```

### getPlayerList
Get a list of players in the game

Example:
```
firemp.getPlayerList(function(players) {
  alert("List of Players" + players) // Outputs an array
})
```

### removePlayer
Removes a player from the game

Example:
```
firemp.removePlayer(<Player Name>)
```