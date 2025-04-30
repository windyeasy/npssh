# npssh

- A node library that pushes files the remote server via the ssh.
- The library is based on [node-ssh](https://github.com/steelbrain/node-ssh).

## Installation

```shell
npm install npssh -D

# global
npm install npssh -g
```

## Run

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
  "push": "npssh push"
}
```

```bash
npm run push
```

- use other config file:

`npssh.config.cjs`

```json
"scripts": {
  "push": "npssh push -c ./npssh.config.cjs"
}
```

```bash
npm run push
```

- use cli

```bash
npm install npssh -g

# use npssh.cjs
npssh push

# use other config file
npssh push -c ./config.cjs
```

## License

It is [MIT]("./LICENSE").
