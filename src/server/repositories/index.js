import fs from 'fs';
import util from 'util';

class Repository {
  constructor(databasePath) {
    this.fsExistsAsync = util.promisify(fs.exists);
    this.fsAccessAsync = util.promisify(fs.access);
    this.fsStatAsync = util.promisify(fs.stat);
    this.appUrl = process.cwd();
    this.databasePath = databasePath;
  }

  save(data) {
    const options = {
      flags: 'r+',
      start: 10,
    };

    fs.appendFileSync(this.databasePath, data, options);
    console.log('data appended to file successfully');
  }

  read() {
    const contents = fs.readFileSync(this.databasePath, 'utf8');
    return contents;
  }

  truncate() {
    const options = {
      flags: 'w',
      encoding: 'utf8',
    };
    fs.writeFileSync(this.databasePath, '', options);
    console.log('content truncated');
  }

  checkFileSize() {
    const stats = fs.statSync(this.databasePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / 1000000;
    return fileSizeInMegabytes;
  }
}

export default Repository;
