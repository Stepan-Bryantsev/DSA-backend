import { DataSource } from "typeorm";
import User from "./models/User.js";
import Project from "./models/Project.js";
const dataSource = new DataSource({
    type: "postgres",
    host: "84.201.175.11",
    port: 5432,
    username: "udsa01",
    password: "HSEP@ssword2022",
    database: "dsa01",
    entities: [User, Project],
});
export default dataSource;
//# sourceMappingURL=database.js.map