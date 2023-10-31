import ytdl from "ytdl-core"
import fs from "fs"
import { resolve } from "path"
import { rejects } from "assert"

export const download = (videoId) => new Promise ((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do video:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 90) {
        throw new Error("A duração desse vídeo é maior do que 90 segundos")
      }
    })
    .on("end", () => {
      console.log("Download do vídeo finalizado");
      resolve()
    })
    .on("error", (error) => {
        console.log("Não foi possível fazer o download do vídeo. Detalhes do erro:", error)
        reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
