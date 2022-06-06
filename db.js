const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs');
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) return reject(err)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', err => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = db