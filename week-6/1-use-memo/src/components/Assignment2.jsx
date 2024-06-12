// In this assignment, you will create a component that renders a large list of
// sentences and includes an input field for filtering these items.
// The goal is to use useMemo to optimize the filtering process, ensuring the list
// is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than
// one value in the dependency array

import React, { useMemo, useState } from "react";
import ALL_WORDS from "../All_sentences";

export function Assignment2() {
  const [sentences, setSentences] = useState(ALL_WORDS);
  const [filter, setFilter] = useState("");
  const [count, setCounter] = useState(0);

    const filteredSentences = useMemo(() => {
      console.log("Running Expensive operation");
      const filtered = sentences.filter((x) => x.includes(filter));
      return filtered;
    }, [filter, sentences]);

  return (
    <div>
      <button
        onClick={() => {
          setCounter(count + 1);
        }}>
        Counter : {count}
      </button>
      <br></br>
      <br></br>
      <input
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}></input>
      {filteredSentences.map((word) => (
        <div>{word}</div>
      ))}
    </div>
  );
}
