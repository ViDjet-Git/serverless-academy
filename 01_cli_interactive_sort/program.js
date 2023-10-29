const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
  
const rl = readline.createInterface({ input, output });
var input_data;
const regexLetters = /[A-Za-z]/g; //Filter Words
const regexNumbers = /[0-9]/g; //Filter Numbers

//1. Sort words alphabetically
function Sort_Words() {
  var sorted = [];
  for(const index in input_data){
    if(!input_data[index].match(regexNumbers) && input_data[index] != ''){
      sorted.push(input_data[index]);
    }
  }
  return sorted.length != 0 ? sorted.sort() : "There are no words in the input";
}

//2. Show numbers from lesser to greater
function Sort_Numbers_From_Lesser() {
  var sorted = [];
  for(const index in input_data){
    if(!input_data[index].match(regexLetters) && input_data[index] != ''){
      sorted.push(input_data[index]);
    }
  }
  return sorted.length != 0 ? sorted.sort(function(a, b){return a-b}) : "There are no numbers in the input";
}

//3. Show numbers from bigger to smaller
function Sort_Numbers_From_Bigger() {
  var sorted = [];
  for(const index in input_data){
    if(!input_data[index].match(regexLetters) && input_data[index] != ''){
      sorted.push(input_data[index]);
    }
  }
  return (sorted.length != 0 && sorted[0] != '') ? sorted.sort((a, b) => {return b-a}) : "There are no numbers in the input";
}

//4. Display words in ascending order by number of letters in the word
function Sort_Words_Length() {
  var sorted = [];
  for(const index in input_data){
    if(!input_data[index].match(regexNumbers)){
      sorted.push(input_data[index]);
    }
  }
  return (sorted.length != 0 && sorted[0] != '') ? sorted.sort((a, b) => {return a.length-b.length}) : "There are no words in the input";
}

//5. Show only unique words
function Show_Unique_Words() {
  const sorted = new Set(input_data);
  for(const index of sorted){
    if(index.match(regexNumbers)){
      sorted.delete(index);
    }
  }
  sorted.delete('');
  return sorted.size != 0 ? Array.from(sorted) : "There are no words in the input";
}

//6. Display only unique values from the set of words and numbers entered by the user
function Show_Unique_All() {
  const sorted = new Set(input_data);
  sorted.delete('');
  return sorted.size != 0 ? Array.from(sorted) : "There are no words/numbers in the input";
}

//Input of initial data
async function Start_input() {
  var answer = await rl.question("\nEnter few words/numbers:");
  input_data = answer.split(' ');
  Menu();
}

//Show Menu, Check the answer, Start data processing
async function Menu() {
  const answer = await rl.question("\n---------MENU---------\n1. Sort words alphabetically\n2. Show numbers from lesser to greater\n3. Show numbers from bigger to smaller\n4. Display words in ascending order by number of letters in the word\n5. Show only unique words\n6. Display only unique values from the set of words and numbers entered by the user\nYour choice:")
    switch(answer){
      case "1": //
        console.log(Sort_Words());
        Start_input();
        break;
      case "2":
        console.log(Sort_Numbers_From_Lesser());
        Start_input();
        break;
      case "3":
        console.log(Sort_Numbers_From_Bigger());
        Start_input();
        break;
      case "4":
        console.log(Sort_Words_Length());
        Start_input();
        break;
      case "5":
        console.log(Show_Unique_Words());
        Start_input();
        break;
      case "6":
        console.log(Show_Unique_All());
        Start_input();
        break;
      case "exit":
        console.log(`\nGood Bye\n`);
        process.exit();
      default:
        console.log(`\nERROR: Incorect input. Try more.\n`);
        Menu();
    }
}

Start_input(); //Show Menu to start communication with the user

