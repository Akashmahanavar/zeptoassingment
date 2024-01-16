import Autocomplete from "./components/Autocomplete";
import { useState } from "react";
import data from "./data.json";

function App() {
  const [userData, setUserData] = useState(data);
  return (
    <>
      <Autocomplete userData={userData} setUserData={setUserData} />
    </>
  );
}

export default App;
