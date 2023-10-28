function saveReportToLocalStorage() {
  if (typeof trivyData === "object" && trivyData !== null) {
    const key = "trivyData-" + trivyData.ArtifactName + "-" + createdAt;
    const dataToSave = JSON.stringify(trivyData);
    localStorage.setItem(key, dataToSave);
    alert("Report saved to localStorage with key: " + key);
  } else {
    alert("No valid trivyData object to save.");
  }
}

function exportToCSV() {
  const table = document.getElementById("vulnerabilityTable");

  const csvData = [];

  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      rowData.push(cell.innerText);
    });
    csvData.push(rowData.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `vulnerability_table_${trivyData.ArtifactName}.csv`
  );

  link.click();
}

function exportToCSV2() {
  const table = document.getElementById("packagesTable");

  const csvData = [];

  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      rowData.push(cell.innerText);
    });
    csvData.push(rowData.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `packages_table_${trivyData.ArtifactName}.csv`);

  link.click();
}

document
  .getElementById("export-csv-button")
  .addEventListener("click", exportToCSV);

document
  .getElementById("export-csv-button2")
  .addEventListener("click", exportToCSV2);

document
  .getElementById("save-report-button")
  .addEventListener("click", saveReportToLocalStorage);
