module.exports = function main(target) {
  switch (target.name) {
    case "help": {
      require("./targets/help")(target.options);
      break;
    }

    case "version": {
      require("./targets/version")(target.options);
      break;
    }

    case "listVersions": {
      require("./targets/listVersions")(target.options);
      break;
    }

    case "compile": {
      require("./targets/compile")(target.options);
      break;
    }

    default: {
      throw new Error(`Unsupported target: '${target}'`);
    }
  }
};
