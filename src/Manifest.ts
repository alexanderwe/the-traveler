import * as fs from 'fs';
import * as sqlite from 'sqlite3';

export default class Manifest {
    private filepath: string;
    private db: sqlite.Database;

    constructor(filepath: string) {
        if (fs.existsSync(filepath)) {
            this.filepath = filepath;
            this.db = new sqlite.Database(this.filepath);
        } else {
            throw new Error('The manifest file you want to refer to does not exist. Consider downloading it at first.');
        }

    }
}
