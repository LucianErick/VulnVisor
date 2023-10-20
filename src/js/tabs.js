function removeActiveClasses() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const cvesContent = document.getElementsByClassName("tables");
  const secretsContent = document.getElementsByClassName("secret-results");

  tabButtons.forEach((button) => button.classList.remove("active"));
  Object.values(cvesContent).forEach((table) => (table.style.display = "none"));
  Object.values(secretsContent).forEach(
    (table) => (table.style.display = "none")
  );
}

function filterByType() {
  const cvesTab = document.getElementById("cves-tab");
  const packagesTab = document.getElementById("packages-tab");
  const secretsTab = document.getElementById("secrets-tab");
  const miscTab = document.getElementById("misc-tab");

  const cvesContent = document.getElementsByClassName("tables");
  const packagesContent = document.getElementById("pkgs-table");
  const secretsContent = document.getElementsByClassName("secret-results");
  const miscContent = document.getElementById("misc-content");

  cvesTab.addEventListener("click", () => {
    removeActiveClasses();
    cvesTab.classList.add("active");
    Object.values(cvesContent).forEach(
      (table) => (table.style.display = "block")
    );
  });

  packagesTab.addEventListener("click", () => {
    removeActiveClasses();
    packagesTab.classList.add("active");
    packagesContent.style.display = "block";
  });

  secretsTab.addEventListener("click", () => {
    removeActiveClasses();
    secretsTab.classList.add("active");
    Object.values(secretsContent).forEach(
      (table) => (table.style.display = "block")
    );
  });

  miscTab.addEventListener("click", () => {
    removeActiveClasses();
    miscTab.classList.add("active");
    miscContent.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  filterByType();
});
