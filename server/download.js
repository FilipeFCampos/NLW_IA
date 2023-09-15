import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoid) => new Promise((resolve, reject) => {
    const videourl = "https://www.youtube.com/shorts/" + videoid
    console.log("Realizando o download do vídeo: " + videoid)
    
    ytdl(videourl, {quality: "lowestaudio", filter: "audioonly"}).on
    ("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        
        if (seconds > 60)   {
            throw new Error("A duração desse vídeo é maior do que 60")
        }
    })
    .on("end", () => {
        console.log("Download finalizado")
        resolve()
    })
    .on("error", (error) => {
        console.log("Não foi possível realizar o download:", error)
        reject(error)
    })
    .pipe(fs.createWriteStream('./tmp/audio.mp4'))
})