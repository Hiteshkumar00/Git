import 'dotenv/config';

import yargs from "yargs";
import {hideBin} from "yargs/helpers";

//import all functions for perticular command
import initRepo from "./controllers/init.js";
import addFile from "./controllers/add.js";
import commitFiles from "./controllers/commit.js";
import pushRepo from "./controllers/push.js";
import pullRepo from "./controllers/pull.js";
import revertRepo from "./controllers/revert.js";

yargs(hideBin(process.argv))
  .command("init", "Initialize a new Repository", {}, initRepo)
  .command("add <file>", "Add a file to the Repository", (yargs) => {
    yargs.positional("file", {
      describe: "File to add to the staging area",
      type: "string",
    });
  }, argv => addFile(argv.file))
  .command("commit <message>", "Commit the staged files", (yargs)=>{
    yargs.positional("message", {
      describe: "Commit message",
      type: "string",
    });
  }, args =>  commitFiles(args.message))
  .command("push", "Push commits to s3", {}, pushRepo)
  .command("pull", "Pull commis from s3", {}, pullRepo)
  .command("revert <commitID>", "Revert to a specific commit", (yargs)=>{
    yargs.positional("commitID", {
      describe: "Commit ID to revert to",
      type: "string",
    })
  }, args => revertRepo(args.commitID))
  .demandCommand(1, "You need at least one command before moving on")
  .argv;