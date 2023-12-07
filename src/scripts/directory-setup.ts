import fs from "fs";
import tree from "tree-node-cli";
import { fetchInput } from "./fetch-input";
const Handlebars = require("handlebars");

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

function generateFile(templatePath, data, outputPath) {
  // Read the template file
  fs.readFile(templatePath, "utf8", (err, source) => {
    if (err) throw err;
    // Compile the template
    const template = Handlebars.compile(source);

    // Generate HTML
    const html = template(data);

    // Write the HTML to a file
    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log(`File has been created at ${outputPath}`);
    });
  });
}

export const setupNewDay = async (
  basePath: string,
  year: string,
  day: string
) => {
  const path = `${basePath}/${year}/day${day}`;
  console.log("Setting up new day for year", year, "day", day, "at", path);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  fetchInput(year, parseInt(day).toString()).then((input) => {
    const templates = [
      "src/templates/problemSolver.ts.hbs",
      "src/templates/problemSolver.test.ts.hbs",
      "src/templates/data.ts.hbs",
    ];

    templates.forEach((template: string) => {
      generateFile(
        template,
        { year, day, input },
        `${path}/${template.split("/").pop().replace(".hbs", "")}`
      );
    });

    const fileTree = tree(path, { trailingSlash: true });
    console.log(fileTree);
  });
};

// Function to generate HTML from a template

// // Example usage
// const data = {
//     title: "Hello World",
//     message: "This is a message from Handlebars template."
// };

// generateHTML('path/to/template.handlebars', data, 'path/to/output.html');
