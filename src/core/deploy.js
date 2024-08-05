import path from "path";
import { resolveAbsolutePath } from "../utils/path-utils.js";
import { sshConnect } from "../utils/ssh-connect.js";

export async function deploy(config){
  const {from, to, ...options} = config
  const currentPath = resolveAbsolutePath(from)
  const ssh = await sshConnect(options)
  let errorCount = 0
  try {
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
