Package.describe({
  name: "transactions",
  version: "0.0.3",
  // Brief, one-line summary of the package.
  summary: "provides transaction related components",
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use([
    "ecmascript",
    "mongo",
    "react-meteor-data",
    "shared",
    "aldeed:collection2",
    "matb33:collection-hooks",
    "wallets"
  ]);

  api.addFiles(
    ["lib/collections/TransactionsCollections.js"],
    ["client", "server"]
  );
  api.addFiles(["server/TransactionsMethods.js"], ["server"]);

  api.export("TransactionsCollections", ["client", "server"]);
  api.export("TransactionsMethods", ["server"]);
});
