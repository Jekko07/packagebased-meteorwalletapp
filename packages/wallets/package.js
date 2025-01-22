Package.describe({
  name: "wallets",
  version: "0.0.1",
  // Brief, one-line summary of the package.
  summary: ""
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use("ecmascript");
  api.mainModule("client/Wallet.jsx", "client");

  api.addFiles(["lib/collections/WalletsCollection.js"], ["client", "server"]);
  api.addFiles(["client/Modal.jsx"], ["client"]);

  api.export("WalletsCollection", ["client", "server"]);
  api.export(["Wallet", "Modal", "client"]);
});
