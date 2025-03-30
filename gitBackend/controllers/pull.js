import {promises as fs} from 'fs';
import path from 'path';
import {s3, s3Bucket} from '../config/aws-config.js';

async function pullRepo() {
  const repoPath = path.resolve(process.cwd() , ".myGit");
  const commitRepoPath = path.join(repoPath, "commits");

  try{
    const data = await s3.listObjectsV2({Bucket: s3Bucket, Prefix: "commits/"}).promise(); // List all files in the commits folder
    const objects = data.Contents;
    for(const object of objects){
      const key = object.Key;
      const commitDir = path.join(commitRepoPath, path.dirname(key).split("/").pop());

      await fs.mkdir(commitDir, {recursive: true});
      
      const params = {Bucket: s3Bucket, Key: key};
      const file = await s3.getObject(params).promise();    // Get the file from S3 in object form
      await fs.writeFile(path.join(commitDir, path.basename(key)), file.Body);

      console.log(`\x1b[34m Downloaded: ${path.basename(key)} \x1b[0m`);
    }
    console.log("\x1b[32m All commits pulled from S3 \x1b[0m");
  }catch(err){
    console.log("Error in commits: ", err);
  }
}

export default pullRepo;