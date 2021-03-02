const chalk = require("chalk");
const yargsParser = require("yargs-parser");

module.exports = function parseArgv(argv) {
  const options = yargsParser(argv.slice(2), {
    boolean: ["help", "version", "h", "v", "listVersions"],
    string: ["entry", "platform", "nodeVersion", "outputDir", "name"],
  });

  if (
    options.platform &&
    !(
      options.platform === "alpine-x64" ||
      options.platform === "alpine-x86" ||
      options.platform === "linux-x64" ||
      options.platform === "linux-x86" ||
      options.platform === "mac-x64" ||
      options.platform === "windows-x64" ||
      options.platform === "windows-x86"
    )
  ) {
    console.error(
      chalk`{red Invalid platform: {yellow '${options.platform}'}. Valid platforms are: {yellow "alpine-x64"}, {yellow "alpine-x86"}, {yellow "linux-x64"}, {yellow "linux-x86"}, {yellow "mac-x64"}, {yellow "windows-x64"}, and {yellow "windows-x86"}. }`
    );
    process.exit(1);
  }

  let name;
  if (options.help || options.h) {
    name = "help";
  } else if (options.version || options.v) {
    name = "version";
  } else if (options.listVersions) {
    name = "listVersions";
  } else if (options.entry) {
    name = "compile";
  } else {
    name = "help";
  }

  return {
    name,
    options,
  };
};
