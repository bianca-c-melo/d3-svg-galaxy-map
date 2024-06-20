import React from "react";
import InteractiveMap from "./InteractiveMap";

const peopleData = [
  { id: 1, radius: 15 },
  { id: 2, radius: 17 },
  { id: 3, radius: 16 },
  { id: 4, radius: 18 },
  { id: 5, radius: 14 },
  { id: 6, radius: 16 },
  { id: 7, radius: 18 },
  { id: 8, radius: 14 },
  { id: 9, radius: 16 },
  { id: 10, radius: 18 }
];

const App = () => {
  return (
    <div className="App">
      <InteractiveMap people={peopleData} />
    </div>
  );
};

export default App;
