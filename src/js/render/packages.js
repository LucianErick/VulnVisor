function createPackagesTable(results) {
  let outputPackages = [];
  if (results) {
    results.forEach((source) => {
      if (source.Packages) {
        source.Packages.forEach((pkg) => {
          pkg.Source = source.Type;
          if (!pkg.Licenses) {
            pkg.Licenses = ["none"];
          }
          outputPackages.push(pkg);
        });
      }
    });
  }

  const table = $("#packages-table").DataTable({
    pageLength: 10,
    data: outputPackages,
    columns: [
      { data: "Name" },
      { data: "Version" },
      { data: "Source" },
      { data: "Licenses" },
    ],
  });

  outputPackages.forEach((pkg) => {
    table.row
      .add({
        Name: pkg.Name ?? "",
        Version: pkg.Version ?? "",
        Licenses: pkg.Licenses ? pkg.Licenses.join(", ") : "",
        Source: pkg.Source ?? "",
      })
      .draw();
  });
}
