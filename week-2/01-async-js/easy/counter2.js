let counter = 0;

function incrementCounter() {
  console.log(counter);
  counter++;
  setTimeout(incrementCounter, 1000);
}

// Start the counter
incrementCounter();
