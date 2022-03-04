import http from 'http'
import { createReadStream } from 'fs'

http.createServer((_, res) => {
  createReadStream("big.file")
  .pipe(res)
}).listen(3000, () => console.log('running at 3000'))
