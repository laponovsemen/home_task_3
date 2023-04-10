import {app} from "./settings";
import {runDB} from "./repositiries/db";


const port = process.env.PORT || 3000

export const startApp =  async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`app started on ${port} port`)
    })
}
startApp()