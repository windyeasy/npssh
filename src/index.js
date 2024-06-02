import fs from "fs";
import path from "path";
import { NodeSSH } from "node-ssh";

async function sshConnect(config){
  const ssh = new NodeSSH()
  try {
    await ssh.connect(config)
    console.log('ssh连接成功')
  }catch(error){
    console.log('ssh连接失败')
    throw error
  }
  return ssh
}


const config = {
  host: "192.168.116.24",
  username: "root",
  password: "123456"
}


const ssh = await sshConnect(config)
ssh.putDirectory()

