const path = require("path");
const chalk = require("chalk");
const shelljs = require("shelljs");
const globby = require("globby");
const prebuiltNodeVersions = require("../lib/prebuiltNodeVersions");

function execWithNodeModulesPath(cmd) {
  return shelljs.exec(cmd, {
    env: Object.assign({}, process.env, {
      PATH: shelljs.exec("npm bin").trim() + ":" + process.env.PATH,
    }),
  });
}

module.exports = function compile(options) {
  const { platform, nodeVersion, entry, outputDir, name } = options;

  if (!platform) {
    console.error(
      chalk.red(
        `You must use --platform to specify a platform to build for. Valid platforms are: alpine-x64, alpine-x86, linux-x64, linux-x86, mac-x64, windows-x64, and windows-x86.`
      )
    );
    process.exitCode = 1;
    return;
  }

  if (!nodeVersion) {
    console.error(
      chalk.red(
        `You must use --nodeVersion to specify a node version to bundle, eg '12.9.1'`
      )
    );
    process.exitCode = 1;
    return;
  }

  if (!entry) {
    console.error(
      chalk.red(`You must use --entry to specify an entry file, eg 'index.js'`)
    );
    process.exitCode = 1;
    return;
  }

  if (!outputDir) {
    console.error(
      chalk.red(
        `You must use --outputDir to specify an output directory, eg './build'`
      )
    );
    process.exitCode = 1;
    return;
  }

  if (!name) {
    console.error(
      chalk.red(
        `You must use --name to specify a name for the binary, eg 'my-app'`
      )
    );
    process.exitCode = 1;
    return;
  }

  shelljs.mkdir("-p", outputDir);

  console.log(chalk.blue(`Building ${name} for ${platform}...`));

  shelljs.rm("-rf", path.join(outputDir, platform));
  shelljs.mkdir("-p", path.join(outputDir, platform));

  const canUsePrebuiltVersion = prebuiltNodeVersions.includes(
    `${platform}-${nodeVersion}`
  );
  if (!canUsePrebuiltVersion) {
    console.error(
      chalk.yellow(
        `Warning: No prebuilt version of node ${nodeVersion} for ${platform} is available, so I'm compiling node from source instead, which will take a long time.`
      )
    );
    console.error(
      `To view the list of available pre-built node versions, run this script with the '--listVersions' flag.`
    );
    console.error(`If you want to abort, hit Control+C at any time.`);
  }

  execWithNodeModulesPath(
    `nexe ${canUsePrebuiltVersion ? "" : "--build"} -i ${entry} -o ${path.join(
      outputDir,
      platform,
      name
    )} -t ${platform}-${nodeVersion}`
  );

  const nativeModules = globby.sync(["**/*.node", "!" + outputDir]);

  for (const filename of nativeModules) {
    console.log(
      chalk.magenta(
        `Copying native module '${filename}' to output directory. When you run ${name}${
          platform.startsWith("windows") ? ".exe" : ""
        }, make sure the native module is still there, or else code depending on it won't work.`
      )
    );

    shelljs.mkdir("-p", path.join(outputDir, platform, path.dirname(filename)));
    shelljs.cp(filename, path.join(outputDir, platform, filename));
  }
};
