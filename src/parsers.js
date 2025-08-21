import { readFileSync } from "node:fs"
import path from 'node:path';


const parseFile = (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath)
    const data = readFileSync(filepath, 'utf-8')
    const extension = path.extname(absolutePath)
    switch (extension) {
        case '.json':
          return JSON.parse(data);
        default:
          throw new Error(`Unsupported file format: ${extension}`);
    }
}

export default parseFile