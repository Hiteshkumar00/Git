import {promises as fs} from 'fs';
import path from 'path';
import {s3, s3Bucket} from '../config/aws-config.js';

async function pushRepo(params) {
  const repoPath = path.resolve(process.cwd() , ".myGit");
  const commitRepoPath = path.join(repoPath, "commits");

  try{
    const commitDirs = await fs.readdir(commitRepoPath);
    for(const commitDir of commitDirs){
      const commitPath = path.join(commitRepoPath, commitDir);
      const files = await fs.readdir(commitPath);
      console.log(`\x1b[34m Pushing commit: ${path.basename(commitDir)} \x1b[0m`);
      for(const file of files){
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        
        const s3Params ={
          Bucket: s3Bucket,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent
        }

        await s3.upload(s3Params).promise();
        console.log(`\x1b[32m Pushed: ${file} \x1b[0m`);
      }
    }

    console.log("All commits pushed to S3");
  }catch(err){
    console.log("Error in push commit: ", err);
  }
}

export default pushRepo;