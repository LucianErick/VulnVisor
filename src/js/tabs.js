function hideCvesTable() {
  const tables = document.getElementsByClassName("tables");
  Object.values(tables).forEach((tableElement) => {
    Object.values(tableElement.children).forEach((table) => {
      if (
        table.className !== "pkgs-table" &&
        table.className !== "dependency-tree__container"
      ) {
        table.style.display = "none";
      }
    });
  });
}

function hidePkgsTable() {
  const tables = document.getElementsByClassName("tables");
  Object.values(tables).forEach((tableElement) => {
    Object.values(tableElement.children).forEach((table) => {
      if (table.className === "pkgs-table") {
        table.style.display = "none";
      }
    });
  });
}

function getCvesTable() {
  const tables = document.getElementsByClassName("tables");
  Object.values(tables).forEach((tableElement) => {
    Object.values(tableElement.children).forEach((table) => {
      if (
        table.className !== "pkgs-table" &&
        table.className !== "dependency-tree__container"
      ) {
        table.style.display = "block";
      }
    });
  });
}

function getPkgsTable() {
  const tables = document.getElementsByClassName("tables");
  Object.values(tables).forEach((tableElement) => {
    Object.values(tableElement.children).forEach((table) => {
      if (table.className === "pkgs-table") {
        table.style.display = "block";
      }
    });
  });
}
function removeActiveClasses() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const secretsContent = document.getElementsByClassName("secret-results");
  const treeContent = document.getElementsByClassName(
    "dependency-tree__container"
  );

  tabButtons.forEach((button) => button.classList.remove("active"));

  hideCvesTable();
  hidePkgsTable();
  Object.values(secretsContent).forEach(
    (table) => (table.style.display = "none")
  );
  Object.values(treeContent).forEach((table) => (table.style.display = "none"));
}

function filterByType() {
  const cvesTab = document.getElementById("cves-tab");
  const packagesTab = document.getElementById("packages-tab");
  const secretsTab = document.getElementById("secrets-tab");
  const treeTab = document.getElementById("tree-tab");

  const secretsContent = document.getElementsByClassName("secret-results");
  const treeContent = document.getElementsByClassName(
    "dependency-tree__container"
  );

  cvesTab.addEventListener("click", () => {
    removeActiveClasses();
    cvesTab.classList.add("active");
    getCvesTable();
  });

  packagesTab.addEventListener("click", () => {
    removeActiveClasses();
    packagesTab.classList.add("active");
    getPkgsTable();
  });

  secretsTab.addEventListener("click", () => {
    removeActiveClasses();
    secretsTab.classList.add("active");
    Object.values(secretsContent).forEach(
      (table) => (table.style.display = "block")
    );
  });

  treeTab.addEventListener("click", () => {
    removeActiveClasses();
    treeTab.classList.add("active");
    Object.values(treeContent).forEach(
      (table) => (table.style.display = "block")
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  filterByType();
});
