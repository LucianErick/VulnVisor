function toggleTablesVisibility() {
  const selectTypeTable = document.getElementById("selectTypeTable");
  const vulnerabilitiesTable = document.getElementById(
    "vulnerabilitiesTable"
  );
  const packagesTable = document.getElementById("packagesTable");
  const secretsContainer = document.getElementById("secretsContainer");

  const selectedValue = selectTypeTable.value;

  if (selectedValue === "vulnerabilities") {
    vulnerabilitiesTable.style.display = "block";
    packagesTable.style.display = "none";
    secretsContainer.style.display = "none";
  } else if (selectedValue === "packages") {
    vulnerabilitiesTable.style.display = "none";
    packagesTable.style.display = "block";
    secretsContainer.style.display = "none";
  } else if (selectedValue === "secrets") {
    vulnerabilitiesTable.style.display = "none";
    packagesTable.style.display = "none";
    secretsContainer.style.display = "block";
  }
}

const selectTypeTable = document.getElementById("selectTypeTable");
selectTypeTable.addEventListener("change", toggleTablesVisibility);