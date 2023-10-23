function hideCvesTable() {
    const tables = document.getElementsByClassName("tables");
    Object.values(tables).forEach((tableElement) => {
        Object.values(tableElement.children).forEach((table) => {
        if (table.className !== "pkgs-table") {
          table.style.display = "none";
        }
      });
    })
  }

  function hidePkgsTable() {
    const tables = document.getElementsByClassName("tables");
    Object.values(tables).forEach((tableElement) => {
        Object.values(tableElement.children).forEach((table) => {
        if (table.className === "pkgs-table") {
          table.style.display = "none";
        }
      });
    })
  }

  function getCvesTable() {
    const tables = document.getElementsByClassName("tables");
    Object.values(tables).forEach((tableElement) => {
        Object.values(tableElement.children).forEach((table) => {
        if (table.className !== "pkgs-table") {
          table.style.display = "block";
        }
      });
    })
  }

  function getPkgsTable() {
    const tables = document.getElementsByClassName("tables");
    Object.values(tables).forEach((tableElement) => {
        Object.values(tableElement.children).forEach((table) => {
        if (table.className === "pkgs-table") {
          table.style.display = "block";
        }
      });
    })
  }
  function removeActiveClasses() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tables = document.querySelectorAll("tables");
    const secretsContent =
      document.getElementsByClassName("secret-results");

    tabButtons.forEach((button) => button.classList.remove("active"));

    hideCvesTable();
    hidePkgsTable();
    Object.values(secretsContent).forEach(
      (table) => (table.style.display = "none")
    );
  }

  function filterByType() {
    const cvesTab = document.getElementById("cves-tab");
    const packagesTab = document.getElementById("packages-tab");
    const secretsTab = document.getElementById("secrets-tab");
    const miscTab = document.getElementById("misc-tab");

    const secretsContent =
      document.getElementsByClassName("secret-results");
    const miscContent = document.getElementById("misc-content");

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

    miscTab.addEventListener("click", () => {
      removeActiveClasses();
      miscTab.classList.add("active");
      miscContent.style.display = "block";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    filterByType();
  });
