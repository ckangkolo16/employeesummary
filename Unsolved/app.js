const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeesArray = [];

//async function myTeam(employees) {
// const html = await team.html(employees);
// writeFileAsync("./output/team.html", html);
//}

//const html = function (data) {
//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");
//fs.writeFile(outputPath, html, function (err) {
//if (err) throw err;
// console.log("Successfully wrote to team.html");
// });
//};

const html = function (data) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employeesArray), "utf-8");
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const engineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineername",
      },

      {
        type: "input",
        message: "What is the engineer's id?",
        name: "engineerid",
      },

      {
        type: "input",
        message: "What is the engineer's email?",
        name: "engineeremail",
      },

      {
        type: "input",
        message: "What is the engineer's github username?",
        name: "engineergithub",
      },

      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "list",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add more team members",
        ],
      },
    ])
    .then((data) => {
      //console.log(data);
      const newEngineer = new Engineer(
        data.engineername,
        data.engineerid,
        data.engineeremail,
        data.engineergithub
      );
      employeesArray.push(newEngineer);
      // console.log(data);
      if (data.list === "Engineer") {
        engineer();
      } else if (data.list === "Intern") {
        intern();
      } else {
        html();
      }
    });
};

const intern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the intern's name?",
        name: "internname",
      },

      {
        type: "input",
        message: "What is the intern's id?",
        name: "internid",
      },

      {
        type: "input",
        message: "What is the intern's email?",
        name: "internemail",
      },

      {
        type: "input",
        message: "What is the intern's school?",
        name: "internschool",
      },

      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "list",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add more team members",
        ],
      },
    ])
    .then((data) => {
      //console.log(data);
      const newIntern = new Intern(
        data.internname,
        data.internid,
        data.internemail,
        data.internschool
      );
      employeesArray.push(newIntern);
      //console.log(data);
      if (data.list === "Engineer") {
        engineer();
      } else if (data.list === "Intern") {
        intern();
      } else {
        html(data);
      }
    });
};

const manager = () => {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the manager's name?",
      name: "managername",
    },

    {
      type: "input",
      message: "What is the manager's id?",
      name: "managerid",
    },

    {
      type: "input",
      message: "What is the manager's email?",
      name: "manageremail",
    },

    {
      type: "input",
      message: "What is the manager's office number?",
      name: "manageroffice",
    },

    {
      type: "list",
      message: "Which type of team member would you like to add?",
      name: "list",
      choices: ["Engineer", "Intern", "I don't want to add more team members"],
    },
  ]);
};

manager().then((data) => {
  //console.log(data);
  const newManager = new Manager(
    data.managername,
    data.managerid,
    data.manageremail,
    data.manageroffice
  );
  employeesArray.push(newManager);
  //console.log(data);
  switch (data.list) {
    case "Engineer":
      engineer();
      break;
    case "Intern":
      intern();
      break;
    default:
      html();
  }
});

//

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
