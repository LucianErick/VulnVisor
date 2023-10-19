function removeActiveClasses() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => button.classList.remove("active"));
  tabContents.forEach((content) => (content.style.display = "none"));
}

function filterByType() {
  const cvesTab = document.getElementById("cves-tab");
  const packagesTab = document.getElementById("packages-tab");
  const secretsTab = document.getElementById("secrets-tab");

  const cvesContent = document.getElementById("cves-content");
  const packagesContent = document.getElementById("packages-content");
  const secretsContent = document.getElementById("secrets-content");

  cvesTab.addEventListener("click", () => {
    removeActiveClasses();
    cvesTab.classList.add("active");
    cvesContent.style.display = "block";
  });

  packagesTab.addEventListener("click", () => {
    removeActiveClasses();
    packagesTab.classList.add("active");
    packagesContent.style.display = "block";
  });

  secretsTab.addEventListener("click", () => {
    removeActiveClasses();
    secretsTab.classList.add("active");
    secretsContent.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  filterByType();
});
