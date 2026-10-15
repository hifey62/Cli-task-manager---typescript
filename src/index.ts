const fs = require("fs");

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type CreatedTAsk = {
  title: string;
};

let tasks: Task[] = [{ id: 1, title: "wash clothes ", completed: false }];

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

const filePath = "src/indexs.js";
switch (command) {
  case "add":
    if (!commandData) {
      console.log("Please provide a task title");
    } else {
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        console.log("file exist and data in");
        tasks = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Task[];
      }

      addTask({ title: commandData });
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    }
    console.log(tasks[0]);
    break;

  case "list": {
    let data = "";

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      const fileData = fs.readFileSync(filePath, "utf-8");

      const taskss = JSON.parse(fileData) as Task[];
      taskss.forEach((item, index) => {
        data += `${index + 1}. ${item.title}\n`;
      });
      console.log(taskss);
    } else {
      console.log("No item yet ");
    }

    console.log(data);
    break;
  }

  case "delete":
    {
      let taksNo = commandData;
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        tasks = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Task[];
        let available = tasks.find((item) => item.id === Number(commandData));
        if (!available) {
          console.log("item is not available");
          break;
        }
        tasks = tasks.filter((item) => item.id != Number(taksNo));
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log(tasks);
      }
    }
    break;

  case "update":
    const newTaks = args[2];
    console.log(newTaks);
    tasks = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Task[];

    if(!commandData || !newTaks){
      console.log("provide both tasks and id to update")
      break ;
    }
    tasks = tasks.map((item) => {
      if (item.id === Number(commandData)) {
        console.log(newTaks);
        return {
          ...item,
          title: newTaks,
        };
      }

      return item;
    });
    console.log(tasks);

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    break;

  default:
    console.log("Unknown command. Try using: 'add <title>' or 'list'");

    break;
}
