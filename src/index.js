#!/usr/bin/env node
import { deploy } from "./core/deploy.js";
import { parseConfig } from "./utils/parse-config.js";

async function main(){
  const config = await parseConfig()
  deploy(config)
}
main()
