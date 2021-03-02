#!/usr/bin/env node
const parseArgv = require("./lib/parseArgv");
const main = require("./index");

const target = parseArgv(process.argv);
main(target);
