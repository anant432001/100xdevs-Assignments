const fs = require("fs");
const filePath = "a.txt";

fs.open(filePath, "r", (err, fd) => {
  if (err) {
    console.error("Error opening file:", err);
    return;
  }

  const buffer = Buffer.alloc(1024); // Allocate a buffer of 1024 bytes

  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buffer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    console.log("Bytes read:", bytesRead);
    console.log(
      "Data read from file:\n",
      buffer.toString("utf8", 0, bytesRead)
    );

    fs.close(fd, (err) => {
      if (err) {
        console.error("Error closing file:", err);
      }
    });
  });
});

console.log("Hello");

for(let i = 0;i<10000000000;i++){
// As fs.read is async, the js pointer will move ahead and Hello will be printed,
// the this loop will take time.
// Finally after the loop the js pointer will be free, it will complete the async task
}
