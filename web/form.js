import {server} from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#content')

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const videourl = input.value
    console.log("Dados enviados:", videourl)

    if(!videourl.includes("shorts"))    {
        console.log("O vídeo enviado não é um shorts")
        return (content.textContent = "O vídeo enviado não é um shorts")
    }

    const [_, params] = videourl.split("/shorts/")
    const [videoID] = params.split("?si")
    console.log("ID do vídeo:", videoID)

    content.textContent = "Convertendo o audio em texto..."

    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Realizando o resumo..."

    const summary = await server.post("/summary", {
        text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
})