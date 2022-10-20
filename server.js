const http = require("http");
const app = require("./app");
var httpServer = http.createServer(app);

const server = httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
