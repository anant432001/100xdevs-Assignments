const fs = require("fs");

// Function to remove extra spaces from a string
function removeExtraSpaces(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Read the file
fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Remove extra spaces
  const cleanedData = removeExtraSpaces(data);

  // Write the cleaned data back to the same file
  fs.writeFile("a.txt", cleanedData, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    console.log("File has been cleaned and saved.");
  });
});
