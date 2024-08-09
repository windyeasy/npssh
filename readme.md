# npssh

- A node library that pushes files the remote server via the ssh.
- The library is based on [node-ssh](https://github.com/steelbrain/node-ssh).

## Installation

```shell
pnpm add npssh -D
```

And create `.npssh.cjs | .npssh.json | .npssh.yml` in your project root:
```js
module.exports = {
  host: "localhost",
  username: "root",
  password: "123456", // or privateKeyPath: "/path/to/private/key"
  from: "./dist",
  to: "/root/dist",
  isDeleteRemoteFiles: true, // Whether to delete all the files in the remote folder. default value: false 
}
```
- if you want protect your's private information, you need to add `.npssh` to `.gitignore`.

Add script for package.json:

For example:
```json
"scripts": {
  "push": "npssh"
}
```

## License

It is [MIT]("./LICENSE").
