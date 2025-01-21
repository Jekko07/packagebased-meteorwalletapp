Package.describe({
  name: "wallets",
  version: "0.0.1",
  // Brief, one-line summary of the package.
  summary: ""
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use("ecmascript");
  // api.mainModule('wallets.js');

  api.addFiles(["lib/collections/WalletsCollection.js"], ["client", "server"]);

  api.export("WalletsCollection", ["client", "server"]);
});
