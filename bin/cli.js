#!/usr/bin/env node
import { program } from "commander";

import { deploy } from "../src/core/deploy.js";
import {  parseConfigByConfigPath, parseConfigByWorkDir } from "../src/utils/parse-config.js";
import {helpOpts} from "../src/core/help-options.js"

helpOpts()

program.command("push [...others]")
.description("push files to remote server")
.action(async () => {
  let config = {}
  if (program.opts().config) {
    config = await parseConfigByConfigPath(program.opts().config);
  } else {
     config = await parseConfigByWorkDir();
  }
  deploy(config);
});

program.parse(process.argv);
