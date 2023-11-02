import inquirer from "inquirer";
import fs from "node:fs";

const path_db = "DB.txt";

//Entering gender and age(optional), and adding new user to DB
function Add_User(username) {
  let regex = /[a-zA-Z]/;
  inquirer
  .prompt([
    {
      name: "gender",
      message: "Choose your Gender: ",
      type: "list",
      choices: ["male", "female"]
    },
    {
      name: "age",
      message: "Enter your age: ",
      type: "input",
      validate: (input) => {
        //check if age string contain letters 
        return input.search(regex) == -1 ? true : "Error with adding user (Incorect age)";
      }
    }
  ])
  .then((answers) => {
    if(answers.age == ''){ //Remove age if field is empty
      delete answers.age;
    }
    console.log("User added: ");
    const new_user = Object.assign(username, answers);
    //Adding to DB.txt
    fs.appendFileSync(path_db, JSON.stringify(new_user) + "\n");
    console.log(new_user);
    Start();
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`(Prompt couldn't be rendered in the current environment) ${error}`);
    } else {
      console.log(`(Something went wrong) ${error}`);
    }
  });
}

//Searching users by name in DB (case doesn't matter)
function Find_By_Name(data) {
  inquirer
  .prompt([
    {
      name: "username",
      message: "Enter user's name you wanna find in DB: ",
      type: "input",
      validate: (input) => {
        //Username can't be empty
        return input != '' ? true : "Enter user's name please";
      }
    }
  ])
  .then((answers) => {
    let result = [];
    for(const elem of data){
      //Convert usernames to lower case and compare
      if(elem.user.toLowerCase() === answers.username.toLowerCase()){
        result.push(elem);
      }
    }
    if(result.length != 0){//Print finded users
      console.log("\nSearch result:\n");
      result.forEach((res_element) => console.log(res_element));
    } else{ //There are no users
      console.log("There are no users whith Name = " + answers.username.toLowerCase());
    }
    End_Prog(); //Close program
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`(Prompt couldn't be rendered in the current environment) ${error}`);
    } else {
      console.log(`(Something went wrong) ${error}`);
    }
  });
}

//Choose Find Users Or Leave Program
function Find_Or_Exit() {
  inquirer
  .prompt([
    {
      name: "show_db",
      message: "Would you to search values in DB?",
      type: "confirm"
    }
  ])
  .then((answers) => {
    if(answers.show_db){
      let DataBase = [];
      const data = fs.readFileSync("DB.txt", { encoding: 'utf8', flag: 'r' }).split("\n");
      for(const elem of data){
        if(elem != '') DataBase.push(JSON.parse(elem));
      }
      if(DataBase.length != 0){
        console.log(DataBase);
        Find_By_Name(DataBase);
      } else{
        console.log("\nDataBase is empty!");
        End_Prog(); //Close program
      }
    } else {
      End_Prog(); //Close program
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`(Prompt couldn't be rendered in the current environment) ${error}`);
    } else {
      console.log(`(Something went wrong) ${error}`);
    }
  });
}

//Choose Add New User Or Find Existed
function Start() {
  inquirer
  .prompt([
    {
      name: "user",
      message: "Enter the user's name. To cancel press ENTER: ",
      type: "input"
    }
  ])
  .then((answers) => {
    if(answers.user != ''){//If input is empty (Only ENTER is pressed)
      //ADDING USER"
      Add_User(answers);
    } else{
      //FINDING USERS OR LEAVE PROGRAM
      Find_Or_Exit();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`(Prompt couldn't be rendered in the current environment) ${error}`);
    } else {
      console.log(`(Something went wrong) ${error}`);
    }
  });
}

//Leave the program with message
function End_Prog() {
  console.log("\nGood Bye\n");
  process.exit(0);
}

Start();