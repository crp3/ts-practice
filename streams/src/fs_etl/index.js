import { pipeline, Readable, Transform} from 'stream';
import { promisify } from 'util';
import { createWriteStream } from 'fs';

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
  read () {
    for(let index = 0; index < 1e5; index++) {
      const person = {id: Date.now() + index, name: `At-${index}`}
      this.push(JSON.stringify(person))
    }
    this.push(null)
  }
})

const transformMapToCSV = Transform({
  transform(chunk, _, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`

    cb(null, result)
  }
})

const setHeader = Transform({
  transform(chunk, _, cb) {
    this.counter = this.counter ?? 0
    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter += 1

    cb(null, "id,name\n".concat(chunk))
  }
})

await pipelineAsync(
  readableStream,
  transformMapToCSV,
  setHeader,
  createWriteStream('file.csv')
)

