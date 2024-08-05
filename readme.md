# npssh

- A node library that pushes files the remote server via the ssh.
- The library is based on [node-ssh](https://github.com/steelbrain/node-ssh).

## Installation

```shell
pnpm add npssh -D
```

And create `.npssh.cjs` in your project root:
```js
module.exports = {
  host: "localhost",
  username: "root",
  password: "123456", // or privateKeyPath: "/path/to/private/key"
  from: "./dist",
  to: "/root/dist",
  isDeleteRemoteFiles: true, // default: false 
}
```

Add script for package.json:

For example:
```json
"scripts": {
  "push": "npssh"
}
```

## License

It is [MIT]("./LICENSE").
