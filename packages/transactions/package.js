Package.describe({
  name: "transactions",
  version: "0.0.1",
  // Brief, one-line summary of the package.
  summary: "",
  documentation: "README.md"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use("ecmascript");
  // api.mainModule('transactions.js');

  api.addFiles(
    ["lib/collections/TransactionsCollections.js"],
    ["client", "server"]
  );

  api.export("TransactionsCollections", ["client", "server"]);
});
