import {promises as fs} from "fs";
import path from "path";
import {v4 as uuid} from "uuid";

async function commitFiles(message) {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const stagingPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");
  const commitID = uuid();

  try{
    const commitID = uuid();
    const commitDir = path.join(commitPath, commitID);

    await fs.mkdir(commitDir, {recursive: true});

    const files = await fs.readdir(stagingPath);

    for(const file of files){
      await fs.copyFile(path.join(stagingPath, file), path.join(commitDir, file));
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"), 
      JSON.stringify({
        message, 
        date: new Date().toISOString()
      })
    );
    console.log(`\x1b[32m Commit ${commitID} created with message: ${message} \x1b[0m`);
  }catch(err){
    console.error("An error occurred: ", err);
  }
}

export default commitFiles;