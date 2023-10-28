function countVulnerabilitiesBySeverityAndType(trivyData) {
  const result = trivyData.Results;
  const countsByType = {};
  let total = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0,
  };

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
        total[severity]++;
      });
    }
  });

  return { ...countsByType, total };
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
  let hasFixedVersionCount = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0,
  };

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

function sumObjValues(obj) {
  let total = 0;
  Object.values(obj).forEach((item) => {
    total += item;
  });
  return total;
}

function updateSpanValue(spanId, value) {
  const span = document.getElementById(spanId);
  if (span) {
    span.textContent = value.toString();
  }
}

function updatedMitigationsTable(responseData) {
  const objProps = [
    "SeverityCount",
    "NotAffectedCount",
    "AffectedCount",
    "HasFixedVersionCount",
  ];
  objProps.forEach((item, index) => {
    updateSpanValue(
      `value${index + 1}`,
      sumObjValues(responseData[item])
    );
  });
}

function createSeverityChart(countsByType) {
  const ctx = document
    .getElementById("vulnerabilityChart")
    .getContext("2d");

  let chart;

  const sourceSelector = document.getElementById("sourceSelector");
  for (const source in countsByType) {
    if (source === "total") {
      sourceSelector.innerHTML += `<option value="${source}" selected>${source}</option>`;
    } else if (source != "undefined") {
      sourceSelector.innerHTML += `<option value="${source}">${source}</option>`;
    }
  }

  createDoughnutChart("total");

  sourceSelector.addEventListener("change", (event) => {
    createDoughnutChart(event.target.value);
  });

  function createDoughnutChart(source) {
    if (chart) {
      chart.destroy();
    }

    const data = countsByType[source];
    const labels = Object.keys(data);
    const values = Object.values(data);

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "rgba(38, 70, 83, 0.9)",
              "rgba(233, 196, 106, 0.9)",
              "rgba(244, 162, 97, 0.9)",
              "rgba(231, 111, 81, 0.9)",
            ],
          },
        ],
      },
      options: {
        cutout: 40,
        title: {
          display: true,
        },
        plugins: {
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              boxHeight: 8,
              font: {
                size: 10,
              },
            },
          },
        },
      },
    });
  }
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

function sortAndFilterTop6(data) {
  const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return sortedData.slice(0, 6);
}

function createPackagesChart(countsByPkg) {
  const ctx = document.getElementById("packagesChart").getContext("2d");

  let chart;
  let labels = [];
  let values = [];

  const sortedData = sortAndFilterTop6(countsByPkg);

  sortedData.forEach((item) => {
    labels.push(item[0]);
    values.push(item[1]);
  });

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(255, 89, 94, 0.9)",
            "rgba(255, 202, 58, 0.9)",
            "rgba(138, 201, 38, 0.9)",
            "rgba(25, 130, 196, 0.9)",
            "rgba(106, 76, 147, 0.9)",
            "rgba(255, 219, 150, 0.9)",
          ],
        },
      ],
    },
    options: {
      cutout: 30,
      title: {
        display: true,
      },
      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            boxHeight: 8,
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}