function countVulnerabilitiesBySeverityAndType(trivyData) {
  const result = trivyData.Results;
  const countsByType = {};

  result.forEach((entry) => {
    const type = entry.Type;

    if (!countsByType[type]) {
      countsByType[type] = {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0,
      };
    }

    const vulnerabilities = entry.Vulnerabilities;
    if (vulnerabilities) {
      vulnerabilities.forEach((vulnerability) => {
        const severity = vulnerability.Severity;
        countsByType[type][severity]++;
      });
    }
  });

  return countsByType;
}

function updateTableWithCounts(countsByType) {
  const table = document.getElementById("groupSeverityBySource");

  for (const type in countsByType) {
    if (countsByType.hasOwnProperty(type)) {
      const counts = countsByType[type];
      const row = table.insertRow(1);

      const typeCell = row.insertCell(0);
      typeCell.innerHTML = type;

      const severityLevels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
      for (let i = 0; i < severityLevels.length; i++) {
        const severity = severityLevels[i];
        const countCell = row.insertCell(i + 1);
        countCell.innerHTML = counts[severity];
      }
    }
  }
}

function processTrivyData(trivyData) {
  let severityCount = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
  let affectedCount = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
  let notAffectedCount = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
  let hasFixedVersionCount = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };

  trivyData.Results.forEach((result) => {
    if (result.Vulnerabilities) {
      result.Vulnerabilities.forEach((vulnerability) => {
        if (vulnerability.Severity in severityCount) {
          severityCount[vulnerability.Severity]++;
        }

        if (vulnerability.Status === "affected") {
          affectedCount[vulnerability.Severity]++;
        } else {
          notAffectedCount[vulnerability.Severity]++;
        }

        if (vulnerability.FixedVersion) {
          hasFixedVersionCount[vulnerability.Severity]++;
        }
      });
    }
  });

  const summary = {
    SeverityCount: severityCount,
    AffectedCount: affectedCount,
    NotAffectedCount: notAffectedCount,
    HasFixedVersionCount: hasFixedVersionCount,
  };

  return summary;
}

function populateVulnerabilityMitigationsTable(data, containerId) {
  const container = document.getElementById(containerId);
  const table = document.createElement("table");
  const thead = table.createTHead();
  const tbody = table.createTBody();

  const mapKeyToHeader = {
    SeverityCount: "Total",
    AffectedCount: "Unmitigated",
    NotAffectedCount: "Mitigated",
    HasFixedVersionCount: "Fix available",
  };

  const headerRow = thead.insertRow();
  headerRow.insertCell().textContent = "Severity";
  for (const key in data) {
    headerRow.insertCell().textContent = mapKeyToHeader[key];
  }

  for (const severity in data["SeverityCount"]) {
    const dataRow = tbody.insertRow();
    dataRow.insertCell().textContent = severity;
    for (const key in data) {
      dataRow.insertCell().textContent = data[key][severity];
    }
  }

  container.appendChild(table);
}

function countVulnerabilitiesByPackage(trivyData) {
  const vulnerabilityCountByPackage = {};

  trivyData.Results.forEach((result) => {
    if (result.Vulnerabilities) {
      result.Vulnerabilities.forEach((vulnerability) => {
        const packageName = vulnerability.PkgName;

        if (vulnerabilityCountByPackage[packageName]) {
          vulnerabilityCountByPackage[packageName]++;
        } else {
          vulnerabilityCountByPackage[packageName] = 1;
        }
      });
    }
  });

  return vulnerabilityCountByPackage;
}

function createBarChart(data) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const ctx = document.getElementById("barChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Vulnerabilities found",
          data: values,
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          // borderColor: "#eb5e28",
          borderWidth: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}
