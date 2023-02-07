const chalk = require("chalk");
const app = require("./backend/app");

const PORT = process.env["PORT"] ?? 8080;
// const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("PUT YOUR 3D GLASSES ON")
  );
});
