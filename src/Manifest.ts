import * as fs from 'fs';
import * as sqlite from 'sqlite3';

/**
 * Class for accessing the manifest file
 */
export default class Manifest {
    private filepath: string;
    private db: sqlite.Database;

    constructor(filepath: string) {
        if (fs.existsSync(filepath)) {
            this.filepath = filepath;
            this.db = new sqlite.Database(filepath);
        } else {
            throw new Error('The manifest file you want to refer to does not exist. Consider downloading it at first.');
        }
    }

    /**
     * Query the manifest file with a valid SQlite query
     * @async
     * @param sqlLiteQuery SQlite valid query
     * @return {Promise<object>} When fulfilled returns an object containing the result of the query
     */
    public queryManifest(sqlLiteQuery: string): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sqlLiteQuery, (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }

                });
            });
        });
    }
}
