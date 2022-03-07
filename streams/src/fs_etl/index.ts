import { pipeline, Readable, Transform} from 'stream';
import { promisify } from 'util';
import { createWriteStream } from 'fs';

const pipelineAsync = promisify(pipeline)

const readableStream = new Readable({
  read () {
    for(let index = 0; index < 1e5; index++) {
      const person = {id: index, name: `rectus-${index}-ringer`}
      this.push(JSON.stringify(person))
    }
    this.push(null)
  }
})

const transformMapToCSV = new Transform({
  transform(chunk, _, cb) {
    const data = JSON.parse(chunk)
    const alteredData = { ...data, name: data.name.toUpperCase()}
    const result = JSON.stringify(alteredData)

    cb(null, result)
  }
})

const setHeader = new Transform({
  transform(chunk, _, cb) {
    const parsedChunk = JSON.parse(chunk)
    const finalString = `${parsedChunk.id},${parsedChunk.name}\n`
    if (parsedChunk.id == 0) {
      return cb(null, 'index,name\n'.concat(finalString))
    } 
    cb(null, finalString)
  }
})

const runPipe = async () => {
  await pipelineAsync(
    readableStream,
    transformMapToCSV,
    setHeader,
    createWriteStream('file.csv')
  )
}

runPipe()

