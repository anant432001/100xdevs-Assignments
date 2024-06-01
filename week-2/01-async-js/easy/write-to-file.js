const fs = require("fs");
const filePath = "a.txt";
const dataToWrite =
  "Hello, world! This is written from a js file, using the fs functionality";

// Step 1: Open the file
fs.open(filePath, "w", (err, fd) => {
  if (err) {
    return console.error(`Error opening file: ${err.message}`);
  }

  // Step 2: Write to the file
  fs.write(fd, dataToWrite, 0, "utf8", (err, written, string) => {
    if (err) {
      console.error(`Error writing to file: ${err.message}`);
    } else {
      console.log(`Bytes written: ${written}`);
      console.log(`Data written: ${string}`);
    }

    // Step 3: Close the file
    fs.close(fd, (err) => {
      if (err) {
        console.error(`Error closing file: ${err.message}`);
      }
    });
  });
});

console.log("Hello Ji");
for (let i = 0; i < 10000000000; i++) {
  // As fs.write is async, the js pointer will move ahead and Hello Ji will be printed,
  // the this loop will take time.
  // Finally after the loop the js pointer will be free, it will complete the async task
}
