import {app} from "./settings";


const port = process.env.PORT || 3000

export const startApp =  () => {
    app.listen(port, () => {
        console.log(`app started on ${port} port`)
    })
}
startApp()