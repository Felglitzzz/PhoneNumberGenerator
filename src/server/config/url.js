import path from "path";

const url = {
  get stagingDatabaseUrl() {
    return path.resolve(__dirname, this.stagingDatabaseRelativeUrl);
  },
  get productionDatabaseUrl() {
    return path.resolve(__dirname, this.productionDatabaseRelativeUrl);
  },
  get fixturesUrl() {
    return path.resolve(__dirname, this.fixturesRelativeUrl);
  },
  stagingDatabaseRelativeUrl: "../../server/database/staging.index.txt",
  productionDatabaseRelativeUrl: "../../server/database/production.index.txt",
  fixturesRelativeUrl: "../../../tests/server/fixtures/index.txt"
};
export default url;
