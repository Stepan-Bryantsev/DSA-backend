import app from "./server.js";
import dataSource from "./database.js";
dataSource
    .initialize()
    .then()
    .catch((error) => console.log(error));
app.listen(5000, () => {
    console.log("Server is ok");
});
//# sourceMappingURL=index.js.map