const fs = require('fs')
const File = require('../models/File')
const config = require('config')

class FileService {

   getPath(file) {
      return config.get('filePath') + '\\' + file.user + '\\' + file.path
   }

   createDir(file) {
      const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
      return new Promise(((resolve, reject) => {
         try {
            if (!fs.existsSync(filePath)) {
               fs.mkdirSync(filePath)
               return resolve({ message: 'File was created' })
            } else {
               return reject({ message: 'File already exists' })
            }
         } catch (e) {
            return reject({ message: 'File error' })
         }
      }))
   }

   deleteFile(file) {
      const path = this.getPath(file)
      if (file.type === 'dir') {
         fs.rmdirSync(path)
      } else {
         fs.unlinkSync(path)
      }
   }

}

module.exports = new FileService()