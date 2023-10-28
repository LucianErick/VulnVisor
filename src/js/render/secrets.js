function getSecretsTable(results) {
    let table = [];
    if (results) {
      results.forEach((result) => {
        if (result.Secrets) {
          table.push(result);
        }
      });
    }
    return table;
  }

  function fillSecretsContainer(data) {
    const secretsContainer = document.getElementById("secretsContainer");
    const severityColors = {
      LOW: "#264653",
      MEDIUM: "#e9c46a",
      HIGH: "#f4a261",
      CRITICAL: "#e76f51",
    };

    data.forEach((secretSource) => {
      if (secretSource.Secrets) {
        secretSource.Secrets.forEach((secretData) => {
          const secretDiv = document.createElement("div");
          secretDiv.className = "secret";

          const secretInfoDiv = document.createElement("div");
          secretInfoDiv.className = "secretInfo";

          const secretTitle = document.createElement("span");
          secretTitle.id = "secretTitle";
          secretTitle.textContent = secretData.Title;

          const secretSeverity = document.createElement("span");
          secretSeverity.id = "secretSeverity";
          secretSeverity.textContent = secretData.Severity;
          secretSeverity.style.color = severityColors[secretData.Severity];

          const secretTarget = document.createElement("span");
          secretTarget.id = "secretTarget";
          secretTarget.textContent = secretSource.Target;

          const secretCodeContainer = document.createElement("div");
          secretCodeContainer.className = "secretCodeContainer";

          secretData.Code?.Lines.forEach((line) => {
            const secretCodeLine = document.createElement("div");
            secretCodeLine.className = "secretCodeLine";
            secretCodeContainer.appendChild(secretCodeLine);

            const secretCodeLineNumber = document.createElement("span");
            secretCodeLineNumber.id = "secretCodeLineNumber";
            secretCodeLineNumber.textContent = `${line.Number}`;
            
            secretCodeLine.appendChild(secretCodeLineNumber);

            const secretCodeLineContent = document.createElement("span");
            secretCodeLineContent.id = "secretCodeLineContent";
            
            if (line.Content) {
              secretCodeLineContent.textContent = line.Content;
              secretCodeLine.appendChild(secretCodeLineContent);
            }

            if (line.IsCause) {
              secretCodeLineContent.style.color = "var(--link)";
            }
          });

          secretInfoDiv.appendChild(secretTitle);
          secretInfoDiv.appendChild(secretSeverity);
          secretInfoDiv.appendChild(secretTarget);
          secretDiv.appendChild(secretInfoDiv);
          secretDiv.appendChild(secretCodeContainer);

          secretsContainer.appendChild(secretDiv);
        });
      }
    });
  }