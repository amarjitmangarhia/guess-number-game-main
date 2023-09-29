import React, { useRef, useReducer, useState } from "react";

import "./App.css";

function App() {
  const [notAllowed, setAllowed] = useState(false);
  const [win, setWin] = useState(false);
  const input = useRef();

  const reducerFunction = (state, action) => {
    if (action.type === "SCORE") {
      return {
        ...state,
        score: state.score - 1,
      };
    }

    if (action.type === "INCREASE") {
      return {
        ...state,
        score: state.score + 1,
      };
    }

    if (action.type === "RESET") {
      return {
        hiddenNumber: "?",
        startGuessing: "Start Guessing...",
        score: 20,
        highScore: state.highScore,
      };
    }

    if (action.type === "HIGHSCORE") {
      return {
        ...state,
        score: state.score,
        highScore: state.highScore + 1,
      };
    }

    if (action.type === "SUCCESS") {
      return {
        score: state.score,
        highScore: state.highScore,
        hiddenNumber: state.randomNumber,
      };
    }

    if (action.type === "LOW") {
      return {
        ...state,
        startGuessing: "Too Low!",
      };
    }

    if (action.type === "HIGH") {
      return {
        ...state,
        startGuessing: "Too High!",
      };
    }

    if (action.type === "LOST") {
      return {
        ...state,
        startGuessing: "You Have Lost The Game!",
      };
    }

    if (action.type === "MATCHED") {
      return {
        ...state,
        startGuessing: "Matched!",
      };
    }

    if (action.type === "RESETTODEFAULT") {
      return {
        score: state.score,
        highScore: state.highScore,
        hiddenNumber: "?",
        startGuessing: "Start Guessing...",
      };
    }

    if (action.type === "MATCHED") {
      return {
        ...state,
        startGuessing: "Matched!",
      };
    }

    if (action.type === "GENERATENUMBER") {
      return {
        ...state,
        randomNumber: Math.floor(Math.random() * (20 - 1) + 1),
      };
    } else {
      return;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    score: 20,
    highScore: 0,
    hiddenNumber: "?",
    startGuessing: "Start Guessing...",
    randomNumber: Math.floor(Math.random() * (10 - 1) + 1),
  });

  // Use Reducer Ends

  const resetGame = () => {
    input.current.value = "";
    setWin(false);
    dispatch({
      type: "RESETTODEFAULT",
    });

    dispatch({
      type: "GENERATENUMBER",
    });

    if (state.score === 0) {
      dispatch({
        type: "RESET",
      });
    }
  };

  const onClickHandler = () => {
    let inputValue = input.current.value;
    if (inputValue > 20 || inputValue < 1) {
      setAllowed(true);
      return;
    }
    let convertToInt = parseInt(inputValue);

    if (state.randomNumber === convertToInt) {
      setAllowed(false);
      setWin(true);
      dispatch({
        type: "SUCCESS",
      });

      dispatch({
        type: "MATCHED",
      });

      dispatch({
        type: "INCREASE",
      });

      dispatch({
        type: "HIGHSCORE",
      });

      input.current.value = "";
    } else if (state.randomNumber < convertToInt) {
      setAllowed(false);

      dispatch({
        type: "HIGH",
      });
      // console.log(state.randomNumber);

      if (state.score > 0) {
        dispatch({
          type: "SCORE",
        });
      } else {
        dispatch({
          type: "LOST",
        });
      }
    } else if (state.randomNumber > convertToInt) {
      setAllowed(false);

      dispatch({
        type: "LOW",
      });

      if (state.score > 0) {
        dispatch({
          type: "SCORE",
        });
      } else {
        dispatch({
          type: "LOST",
        });
      }
    }
  };
  const borderFunction = () => {
    if (win) {
      return "5px solid #50f255";
    } else {
      return "5px solid white";
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#404041", border: borderFunction() }}
    >
      <div className="header">
        <div className="button-between">
          <button onClick={resetGame} className="again-button">
            Again!
          </button>
          <p
            className="between"
            style={{ color: notAllowed ? "#f52f2f" : "white" }}
          >
            "Between 1 and 20"
          </p>
        </div>
        <div className="title">
          <h1 className="guess-h1">Guess My Number!</h1>
        </div>
        <div className="guess-number">
          <div className="border"></div>
          <div className="number">{state.hiddenNumber}</div>
        </div>
      </div>

      <div className="main">
        <div className="main-section">
          <div className="main-left">
            <input
              style={{ backgroundColor: "#404041" }}
              ref={input}
              type="number"
              placeholder="1 to 20"
              // defaultValue="0"
              max="20"
              min="1"
              className="input"
            />
            <button onClick={onClickHandler} className="main-button">
              Check!
            </button>
          </div>
          <div className="main-right">
            <div className="content">
              <div className="start-guessing-text">
                <p className="main-guess">{state.startGuessing}</p>
              </div>
              <div className="main-score">
                <div className="score">
                  <p>Score: {state.score}</p>
                </div>
                <div className="high-score">
                  <p>Highscore: {state.highScore}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//

// start

// const [data, setData] = useState([
//   {
//     number: 1,
//     id: 1,
//   },
//   {
//     number: 2,
//     id: 2,
//   },
//   {
//     number: 3,
//     id: 3,
//   },
//   {
//     number: 4,
//     id: 4,
//   },
//   {
//     number: 5,
//     id: 5,
//   },
//   {
//     number: 6,
//     id: 6,
//   },
//   {
//     number: 7,
//     id: 7,
//   },
//   {
//     number: 8,
//     id: 8,
//   },
//   {
//     number: 9,
//     id: 9,
//   },
//   {
//     number: 10,
//     id: 10,
//   },
// ]);

// const changeColorFunction = (event) => {
//   event.target.style.background = "green";
// };

// const [check, setCheck] = useState(false);

// const deleteItem = (id, event) => {
//   let ranNum = state.randomNumber;
//   console.log(ranNum);
//   if (ranNum === id) {
//     changeColorFunction(event);
//     dispatch({
//       type: "SUCCESS",
//     });
//     setData(data);
//     setCheck(true);
//     return;
//   } else if (!check) {
//     const removeItem = data.filter((item) => {
//       return item.id !== id;
//     });
//     setData(removeItem);
//   }
// };

// end
