import React from "react";
import GameBoard from "./components/Gameboard";

class App extends React.Component {
  render() {
    return (
      <div style={{ paddingLeft: "50px" }}>
        <GameBoard />
      </div>
    );
  }
}

export default App;
