const chalk = require("chalk");
const app = require("./app");

const { PORT = 8080 } = process.env;

app.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("PUT YOUR 3D GLASSES ON")
  );
});
