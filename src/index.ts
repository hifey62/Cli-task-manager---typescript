type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type CreatedTAsk = {
  title: string;
};

let tasks: Task[] = [];

function addTask(task: CreatedTAsk): Task {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask: Task = {
    id: nextId,
    title: task.title,
    completed: false,
  };

  tasks.push(newTask);
  return newTask;
}

// this will help get the comand from the terminal
const args = process.argv.slice(2);
console.log(args);

const command = args[0];
const commandData = args[1];

switch (command) {
    case "add":
        if(!commandData){
           console.log("Please provide a task title")
        }else
        addTask({title :commandData})
        console.log(tasks)
        break;

    default:
         console.log("Unknown command. Try using: 'add <title>' or 'list'");
  
        break;
}


