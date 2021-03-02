const chalk = require("chalk");

module.exports = function help() {
  console.log(
    chalk`

{magenta Usage:} {blue nexe-build} {gray [options]}

{magenta Options:}
  {bold --platform}         Which target OS and architecture to build for. Valid values
                     are {yellow "alpine-x64"}, {yellow "alpine-x86"}, {yellow "linux-x64"}, {yellow "linux-x86"},
                     {yellow "mac-x64"}, {yellow "windows-x64"}, and {yellow "windows-x86"}.

  {bold --nodeVersion}      Which node version to base the output binary on,
                     eg. {yellow "12.9.1"}

  {bold --entry}            Which file to start bundling from, eg. {yellow "./src/index.js"}

  {bold --outputDir}        The folder to write built binaries to, eg. {yellow "./build"}

  {bold --name}             The name of the output binary, eg {yellow "my-app"}.

  {bold --listVersions}     List pre-compiled nexe node versions available for download

  {bold --help}, {bold -h}         Show instructions on how to use the program

  {bold --version}, {bold -v}      Print the program version

{magenta Examples:}
  {gray # Build a binary for ./index.js based on node 12.9.1 for mac:}
  {blue nexe-build} --name {yellow my-app} --entry {yellow ./index.js} --outputDir {yellow ./build} --platform {yellow mac-x64} --nodeVersion {yellow 12.9.1}

  {gray # List the available pre-built node versions:}
  {blue nexe-build} --listVersions

  {gray # List the available pre-built node versions for a particular platform:}
  {blue nexe-build} --listVersions --platform {yellow mac-x64}

  {gray # Show this help page:}
  {blue nexe-build} --help

  {gray # Show the program version:}
  {blue nexe-build} --version

`.trim()
  );
};
