import path from "path";
import { resolveAbsolutePath } from "../utils/path-utils.js";
import { sshConnect } from "../utils/ssh-connect.js";

export async function deleteDirectoryBySsh(ssh, path){
  try {
    const command = `rm -rf ${path}`
    const result = await ssh.execCommand(command);

    if (result.code === 0) {
      console.log('Directory deleted successfully.');
    } else {
      console.error('Error deleting directory:', result.stderr);
    }
  } catch (error) {
    console.error('Error connecting to server or executing command:', error);
  }
}

/**
 * Deploy files to remote server
 * @param {object} config 
 * @param {string} config.from 
 * @param {string} config.to 
 * @param {boolean} config.isDeleteRemoteFiles 
 * @returns 
 */
export async function deploy(config){
  const {from, to, isDeleteRemoteFiles = false, ...options} = config

  const currentPath = resolveAbsolutePath(from)
  const ssh = await sshConnect(options)
  let errorCount = 0
  try {
    if(isDeleteRemoteFiles){
      await deleteDirectoryBySsh(ssh, to)
    }
    await ssh.putDirectory(currentPath, to, {
      recursive: true,
      concurrency: 10,
      validate: function(itemPath) {
        const baseName = path.basename(itemPath)
        return baseName.indexOf(".") !== 0 && baseName !== "node_modules"
      },
      tick: function(localPath, _, error) {
        if (error) {
          console.error("upload error: ", error)
          errorCount += 1
        } else {
         console.log("upload success: ", localPath)
        }
      }
    }).finally(() => {
      ssh.dispose()
    })
    //
    if (errorCount > 0) {
      throw new Error(`${errorCount} files failed to upload`)
    }else {
      console.log('push was successful')
    }
  }catch(err) {
    console.error(err)
  }
}
