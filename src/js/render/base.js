function generateReportTitle() {
  const reportTitleSpan = document.getElementById("reportTitle");
  reportTitleSpan.textContent = trivyData.ArtifactName;
}
function generateReportType() {
  const reportTypeSpan = document.getElementById("reportType");
  reportTypeSpan.textContent =
    trivyData.ArtifactType === "filesystem" ? "Module" : "Image";
}

function renderCreatedAt() {
  const createdAtSpan = document.getElementById("createdAt");
  createdAtSpan.textContent = `Generated at: ${new Date(
    createdAt * 1000
  ).toLocaleString()}`;
}

function base() {
  if (!trivyData) {
    return console.error("Report data not loaded");
  }
  const root = document.querySelector("#root");
  if (!root) {
    return console.error("Can't find root");
  }

  const count = countVulnerabilitiesBySeverityAndType(trivyData);
  createSeverityChart(count);

  const data = processTrivyData(trivyData);
  updatedMitigationsTable(data);

  const vulnerabilitiesByPkg = countVulnerabilitiesByPackage(trivyData);
  createPackagesChart(vulnerabilitiesByPkg);

  fillVulnerabilityTable(trivyData);

  createPackagesTable(trivyData.Results);

  toggleTablesVisibility();

  if (trivyData.Results) {
    fillSecretsContainer(getSecretsTable(trivyData.Results));
  }

  generateReportTitle();
  generateReportType();
  renderCreatedAt();
}

document.addEventListener("DOMContentLoaded", base);