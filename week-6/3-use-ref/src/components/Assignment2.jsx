// Create a component that tracks and displays the number of times it has been rendered.
// Use useRef to create a variable that persists across renders without causing additional renders
// when it changes.

import React, { useState, useRef } from "react";

export function Assignment2() {
  const number_of_re_render_ref = useRef(0);
  const [, forceRender] = useState(0);

  const handleReRender = () => {
    // Update state to force re-render
    forceRender(Math.random()); // This will cause a re-render
    number_of_re_render_ref.current++; // This will increment the count without causing a re-render
  };

  return (
    <div>
      <p>This component has rendered {number_of_re_render_ref.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
