Package.describe({
  name: "infra",
  version: "0.0.3",
  summary: "provides infra related components"
});

Package.onUse(function (api) {
  api.versionsFrom("2.7");
  api.use(["ecmascript", "react-meteor-data"]);

  api.addFiles(["server/CustomError.js"], "server");

  api.export(["CustomError", "server"]);
});
