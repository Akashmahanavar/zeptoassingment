import { useEffect, useState } from "react";
import "../Autocomplete.css";

export default function Autocomplete({ userData, setUserData }) {
  const [searchString, setSearchString] = useState("");
  const [filterData, setFilterData] = useState(userData);
  const [chipData, setChipData] = useState([]);
  const [drp, setDrp] = useState(false);
  const [backCount, setBackCount] = useState(0);
  useEffect(() => {
    let data = userData?.filter((user) =>
      user.userName.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilterData(data);
  }, [searchString, userData]);

  function handleSelected(data) {
    const user = userData.filter((d) => d.id !== data.id);
    setUserData(user);
    setChipData((prevData) => [data, ...prevData]);
  }
  function removeChipData(data) {
    const user = chipData.filter((d) => d.id !== data.id);
    setChipData(user);
    setUserData((prevData) => [data, ...prevData]);
  }
  function popChip(key) {
    if (key === "Backspace" && searchString === "" && chipData.length !== 0)
      setBackCount((prevCount) => prevCount + 1);
    if (backCount === 1 && searchString === "" && chipData.length !== 0) {
      const copyArr = chipData;
      const obj = copyArr.pop();
      setChipData(copyArr);
      setBackCount(0);
      setUserData((prevCount) => [obj, ...prevCount]);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Pick Users</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "900px",
            flexWrap: "wrap",
          }}
        >
          {chipData.map((d) => (
            <div key={d.id} className="chipContainer">
              <img
                width="30px"
                src={d.picture}
                style={{ borderRadius: "15px" }}
                alt="image_"
              ></img>
              <div style={{ marginTop: "2px" }}>{d.userName}</div>
              <div className="chipDelete" onClick={() => removeChipData(d)}>
                X
              </div>
            </div>
          ))}
          <div>
            <div style={{ borderBottom: "2px solid " }}>
              <input
                type="text"
                placeholder="search user by name...."
                onChange={(e) => {
                  setSearchString(e.target.value);
                }}
                onKeyDown={(e) => popChip(e.key)}
                className="input"
                onFocus={() => setDrp(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setDrp(false);
                  }, 300)
                }
              />
            </div>
            {drp && (
              <div className="suggestionBox">
                {filterData.map((d) => (
                  <div
                    key={d.id}
                    className="suggestion"
                    onClick={() => handleSelected(d)}
                  >
                    <img
                      width="30px"
                      src={d.picture}
                      style={{ borderRadius: "15px" }}
                      alt="image_"
                    ></img>
                    <div>
                      <div>{d.userName}</div>
                      <div style={{ color: "gray", fontSize: "small" }}>
                        {d.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
