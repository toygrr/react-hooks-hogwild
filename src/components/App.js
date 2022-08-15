import React, { useState } from "react";
import Nav from "./Nav";
import Tile from "./Tile";
import hogs from "../porkers_data";

//Need to figure out how to make drop down work with .sort().  Parent function here? callback from Nav - App - down to Tile?
// Figure out filter()

function App() {
  const [isFilterGreased, setIsFilterGreased] = useState(false); // setting default value for greased state
  const [sortType, setSortType] = useState("none"); // setting default value to first option in the dropdown box

  const toggleFilter = () => {
    setIsFilterGreased(!isFilterGreased); // toggle value of true/false greased state with bang operator
  };

  const filteredHogs = isFilterGreased //  providing a variable to take place of the <Tile /> rendering variable based on ternary (switching between greased or all)
    ? hogs.filter((hog) => hog.greased)
    : hogs;

  const sortedHogs = // if the dropdown is on the default "none" - all hogs display.  if its (!==) not "none", display either by name or weight
    sortType !== "none"
      ? [...filteredHogs].sort((a, b) => {
          // (Ask morgan later) - must use a new array with the spread operrator to not modify our new array created by .filter()
          let result; // assigning results a variable to get rid of react error
          if (sortType === "name") {
            result = a.name > b.name ? 1 : -1; // the 1 & -1 puts either variable in order before the other.  so if "apple" > "banana", flipping the numbers would flip which word is first alphabetically.
          } else if (sortType === "weight") {
            result = a.weight > b.weight ? 1 : -1;
          }
          return result;
        })
      : filteredHogs; // end of ternary, results depend on whether the hogs are filtered, and sorted.

  const hogTiles = sortedHogs.map(
    ({ name, image, specialty, weight, greased }) => {
      return (
        <Tile
          key={name}
          name={name}
          image={image}
          specialty={specialty}
          weight={weight}
          greased={greased}
        />
      );
    }
  );

  // weight={hogs.weight} name={hogs.name} greased={hogs.greased}

  return (
    <div className="App">
      <Nav />
      <label htmlFor="filterGreased">Filter Greased: </label>

      <input
        checked={isFilterGreased}
        onChange={toggleFilter}
        id="filterGreased"
        type="checkbox"
      ></input>
      <br />
      <select
        onChange={(e) => {
          console.log(e.target.value);
          setSortType(e.target.value);
        }}
        name="sort"
        id="sort"
        value={sortType}
      >
        <option value="none">Sort By...</option>
        <option value="weight">Weight</option>
        <option value="name">Name</option>
      </select>
      <br />
      {hogTiles}
    </div>
  );
}

export default App;
