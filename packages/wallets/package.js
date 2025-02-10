Package.describe({
  name: "wallets",
  version: "0.0.2",
  // Brief, one-line summary of the package.
  summary: "provides wallets related components"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use([
    "ecmascript",
    "mongo",
    "react-meteor-data",
    "shared",
    "aldeed:collection2"
  ]);
  api.mainModule("client/Wallet.jsx", "client");

  api.addFiles(["lib/collections/WalletsCollection.js"], ["client", "server"]);
  api.addFiles(["client/Modal.jsx", "client/SelectContact.jsx"], ["client"]);
  api.addFiles(["server/WalletsPublications.js"], ["server"]);

  api.export("WalletsCollection", ["client", "server"]);
  api.export(["Wallet", "Modal", "SelectContact", "client"]);
  api.export(["WalletsPublications", "server"]);
});
