import fs from 'fs';
import path from "path";
import {promisify} from "util";

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const commitRepoPath = path.join(repoPath, "commits");

  try{
    console.log(`\x1b[34m Reverting to commit: ${commitID} \x1b[0m `);

    const commitDir = path.join(commitRepoPath, commitID);

    const files = await readdir(commitDir).catch(err => {
      console.log(`\x1b[31m Commit not found : "${commitID}" \x1b[0m`);
      throw "commit not found";
    });

    const parentDir = path.resolve(repoPath, "..");

    for(const file of files){
      copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log("\x1b[32m Reverted successfully \x1b[0m");
  }catch(err){
    console.log("Error in reverting commit: ", err);
  }
}

export default revertRepo;