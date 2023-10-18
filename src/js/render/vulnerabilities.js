function getEmptyResult() {
	const resultTable = tableTemplate.content.cloneNode(true);
	const resultTableBody = resultTable.querySelector("tbody");
	const emptyVulns = emptyVulnsTemplate.content.cloneNode(true);
	resultTableBody.append(emptyVulns);
	return resultTable;
}

function getResultTablesByResults(resultsData) {
	const resultTables = [];
	const secretsTables = [];
	for (const result of resultsData) {
		if (result.Vulnerabilities && result.Vulnerabilities.length) {
			// Vulnerabilities field is not empty
			const resultTable = fillResults(result);
			resultTables.push(resultTable);
		} else if (result.Secrets && result.Secrets.length) {
			// Secrets field is not empty
			const secret = fillSecrets(result);
			secretsTables.push(secret);
		} else {
			// on empty/unhandled
			const emptyResult = getEmptyResult();
			resultTables.push(emptyResult);
		}
	}
	return { resultTables, secretsTables };
}

function fillVulnerabilitiesTable(result) {
	const vulnerabilitiesTable = tableTemplate.content.cloneNode(true);
	const vulnerabilitiesTableHeader =
		vulnerabilitiesTable.querySelector(".header__title");
	const vulnerabilitiesTableBody = vulnerabilitiesTable.querySelector("tbody");
	result.Vulnerabilities.forEach((vuln) => {
		const resultTableRow = tableRowTemplate.content.cloneNode(true);
		
		const pkgName = resultTableRow.querySelector(".pkg-name");
		pkgName.textContent = vuln.PkgName;
		
		const vulnerability = resultTableRow.querySelector(".vuln");
		vulnerability.textContent = vuln.VulnerabilityID;
		
		const v2Score = resultTableRow.querySelector(".v2-score");
		v2Score.textContent = vuln.CVSS.nvd.V2Score;

		if (vuln.CVSS.nvd.V2Score || vuln.CVSS.redhat.V2Score) {
			const v2Score = resultTableRow.querySelector(".v2-score");
			v2Score.textContent = vuln.CVSS.nvd.V2Score ? vuln.CVSS.nvd.V2Score : vuln.CVSS.redhat.V2Score;
		}
		
		if (vuln.CVSS.nvd.V3Score || vuln.CVSS.redhat.V3Score) {
			const v3Score = resultTableRow.querySelector(".v3-score");
			v3Score.textContent = vuln.CVSS.nvd.V3Score ? vuln.CVSS.nvd.V3Score : vuln.CVSS.redhat.V3Score;
		}

		const vulnTitle = resultTableRow.querySelector(".vuln-title");
		vulnTitle.textContent = vuln.Title;
		
		const severity = resultTableRow.querySelector(".severity");
		severity.textContent = vuln.Severity;
		
		const pkgVersion = resultTableRow.querySelector(".pkg-version");
		pkgVersion.textContent = vuln.InstalledVersion;
		
		const links = resultTableRow.querySelector(".links");
		if (vuln.References) {
			vuln.References.forEach((ref) => {
				const vulnLink = vulnLinkTemplate.content.cloneNode(true);
				const linkElement = vulnLink.querySelector("a");
				linkElement.href = ref;
				linkElement.textContent = ref;
				links.append(linkElement);
			});
		}
		vulnerabilitiesTableBody.append(resultTableRow);
	});
	vulnerabilitiesTableHeader.textContent = result.Type;
	return vulnerabilitiesTable;
}