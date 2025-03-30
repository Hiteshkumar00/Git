import {promises as fs} from 'fs';
import path from 'path';


async function initRepo(){
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const commitsPath = path.join(repoPath, "commits");

  try{
    await fs.mkdir(repoPath, {recursive: true});
    await fs.mkdir(commitsPath, {recursive: true});
    await fs.writeFile(path.join(repoPath, "config.json"), JSON.stringify({bucket: process.env.S3_BUCKET}));

    console.log("\x1b[32m .myGit \x1b[0m \x1b[34m initialized successfully \x1b[0m");
  }catch(err){
    console.error("An error occurred: ", err);
  }
}

export default initRepo;