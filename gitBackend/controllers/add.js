import {promises as fs} from "fs";
import path from "path";

async function addFile(filePath){
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const stagingPath = path.join(repoPath, "staging");

  try{
    await fs.mkdir(stagingPath, {recursive: true});
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`\x1b[34m ${fileName} staged successfully \x1b[0m`);
  }catch(err){
    console.error("An error occurred: ", err);
  }
}

export default addFile;