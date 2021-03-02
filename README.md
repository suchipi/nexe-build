# `@suchipi/nexe-build`

This is a thin wrapper around [nexe](https://github.com/nexe/nexe) that:

- Builds your app using nexe
- Copies any native dependencies in your working directory to cooresponding directories next to the binary nexe built

## Installation

```
npm install --save-dev @suchipi/nexe-build
```

## Usage

Make sure the result of calling `npm bin` is in your PATH, then:

```
Usage: nexe-build [options]

Options:
  --platform         Which target OS and architecture to build for. Valid values
                     are "alpine-x64", "alpine-x86", "linux-x64", "linux-x86",
                     "mac-x64", "windows-x64", and "windows-x86".

  --nodeVersion      Which node version to base the output binary on,
                     eg. "12.9.1"

  --entry            Which file to start bundling from, eg. "./src/index.js"

  --outputDir        The folder to write built binaries to, eg. "./build"

  --name             The name of the output binary, eg "my-app".

  --listVersions     List pre-compiled nexe node versions available for download

  --help, -h         Show instructions on how to use the program

  --version, -v      Print the program version

Examples:
  # Build a binary for ./index.js based on node 12.9.1 for mac:
  nexe-build --name my-app --entry ./index.js --outputDir ./build --platform mac-x64 --nodeVersion 12.9.1

  # List the available pre-built node versions:
  nexe-build --listVersions

  # List the available pre-built node versions for a particular platform:
  nexe-build --listVersions --platform mac-x64

  # Show this help page:
  nexe-build --help

  # Show the program version:
  nexe-build --version
```
