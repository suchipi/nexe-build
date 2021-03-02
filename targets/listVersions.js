const chalk = require("chalk");
const prebuiltNodeVersions = require("../lib/prebuiltNodeVersions");

module.exports = function listVersions(options) {
  if (options.platform) {
    const filteredPlatforms = prebuiltNodeVersions
      .filter((version) => version.startsWith(options.platform))
      .map((version) => version.replace(options.platform + "-", ""));

    console.error(
      chalk`{blue Pre-built node versions for {yellow '${options.platform}'} available for download: }`
    );

    for (const version of filteredPlatforms) {
      console.log(version);
    }
  } else {
    console.error(
      chalk`{blue Pre-built node versions available for download:}`
    );

    for (const version of prebuiltNodeVersions) {
      console.log(version);
    }
  }
};
