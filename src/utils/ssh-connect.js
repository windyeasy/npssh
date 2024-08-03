import { NodeSSH } from "node-ssh";
export async function sshConnect(config){
  const ssh = new NodeSSH()
  try {
    await ssh.connect(config)
    console.log('ssh connect success')
  }catch(error){
    console.log('ssh connect error')
    throw error
  }
  return ssh
}
