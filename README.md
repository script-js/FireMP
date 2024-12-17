# FireMP
## A JavaScript library for creating multiplayer games using a Firebase Realtime Database
### Demo
(Client)[https://script-js.github.io/FireMP/demo/client] | (Host)[https://script-js.github.io/FireMP/demo/host]
### Getting Started

**1. Create your database**

1. Create a Firebase Project
Go to console.firebase.google.com and click Create a project.
2. Add an app
Click the small </> icon on the home page and set up your app. Make sure you save the firebase config variable it gives you.
3. Create a Realtime Database
Under the build tab in the sidebar, click Realtime Database. Click create database and go through the setup.
4. Add this code to your game (make sure to replace the firebaseConfig variable with the one from step 1):
```
<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
    import { firemp } from "https://script-js.github.io/FireMP/main.js";

        const firebaseConfig = <Your Firebase Config Variable>
    // Initialize Firebase
    const app = initializeApp(firebaseConfig); 
    firemp.registerFunctions(getDatabase, ref, set, get, child, onValue)
</script>
```

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
var gameId = prompt("Game ID")
firemp.joinGame(gameId,playerName,function() {alert("Game Started")},function() {alert("Game Over")})
```

### startGame
Starts the game

Example:
```
firemp.startGame()
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
firemp.listen(<Value Name>,function(data) {alert("Value Data: " + data)},function() {alert("Value Non-existent")})
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
Fires every time the player list changes

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