function fillVulnerabilityTable(trivyData) {
    let vulnerabilitiesArray = [];
    if (trivyData.Results) {
      trivyData.Results.forEach((source) => {
        if (source.Vulnerabilities) {
          source.Vulnerabilities.forEach((vuln) => {
            vuln.Source = source.Type;
            vulnerabilitiesArray.push(vuln);
          });
        }
      });
    }

    const table = $("#vulnerabilityTable").DataTable({
      pageLength: 10,
      data: [],
      columns: [
        { data: "Vulnerabilities.0.PkgName" },
        { data: "Vulnerabilities.0.Title" },
        { data: "Vulnerabilities.0.VulnerabilityID" },
        { data: "Vulnerabilities.0.InstalledVersion" },
        { data: "Vulnerabilities.0.FixedVersion" },
        { data: "Vulnerabilities.0.CVSS.nvd.V2Score" },
        { data: "Vulnerabilities.0.CVSS.nvd.V3Score" },
        { data: "Vulnerabilities.0.Severity" },
        { data: "Vulnerabilities.0.Source" },
      ],
    });

    const results = trivyData.Results;
    results.forEach((result) => {
      if (result.Vulnerabilities) {
        result.Vulnerabilities.forEach((vuln) => {
          table.row.add({
            Vulnerabilities: {
              0: {
                PkgName: vuln.PkgName ?? "none",
                VulnerabilityID: vuln.VulnerabilityID ?? "none",
                InstalledVersion: vuln.InstalledVersion ?? "none",
                FixedVersion: vuln.FixedVersion ?? "none",
                CVSS: {
                  nvd: {
                    V2Score: vuln.CVSS.nvd?.V2Score || "none",
                    V3Score: vuln.CVSS.nvd?.V3Score || "none",
                  },
                },
                Title: vuln.Title ?? "none",
                Severity: vuln.Severity ?? "none",
                Source: vuln.Source ?? "none",
              },
            },
          });
        });
      }
    });

    table.draw();
  }