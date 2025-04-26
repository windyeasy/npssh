import {program} from  'commander'
import { requireJson } from '../utils/require-files.js'

export function helpOpts() {

  // 1. show version
  const packJson = requireJson("./package.json");
  const version = packJson.version;
  program
    .name(packJson.name)
    .description(packJson.description)
    .version(version, "-v --version");

  program.option("-c --config <configPath>",
    "a config file path, example：-c ./config.js");
}


