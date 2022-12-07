
import { FileContentChecker } from "./FileContentChecker";

const fs = require("fs");

type JsonObject = Record<string, unknown>

export class CsvToJson {
    
    constructor(private headers: string[], private content: string[][]) {
    }

    generateJson(): string{
        const json = this.content.reduce<JsonObject[]>((acc, row, idx) => {
            const object = row.reduce<JsonObject>((acc, cur, idx) => {
                acc[this.headers[idx]] = cur;
                return acc;
            }, {});
            return [...acc, object];
        }, []); 
        return JSON.stringify(json)
    }

    generateFile(jsonDirectoryPath: string, fileName: string) {
        const json = this.generateJson();
        fs.writeFileSync(`${jsonDirectoryPath}/${fileName}.json`, json)
    }
}