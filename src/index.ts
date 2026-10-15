const fs = require('fs')


type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type CreatedTAsk = {
  title: string;
};

let tasks: Task[] = [{ id: 1, title: 'wash clothes ', completed: false }];

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
        if(!commandData){
           console.log("Please provide a task title")
        }else{
            if(fs.existsSync(filePath) && fs.statSync(filePath).size > 0){
              console.log("file exist and data in");
             tasks = JSON.parse(fs.readFileSync(filePath , 'utf-8')) as Task[]
             }
             
              addTask({title :commandData});
              fs.writeFileSync(filePath , JSON.stringify(tasks, null , 2))
              

              
              
        }
        console.log(tasks[0])
        break;

    case "list":
      {
        let data = ""
        
        const fileData = fs.readFileSync(filePath , 'utf-8')
        const taskss = JSON.parse(fileData) as Task[]
        taskss.forEach(( item , index ) => {data += `${index+1}. ${item.title}\n`} )

      console.log(taskss)

      console.log(data)
        break;
      }

      case "delete":
        {
         let taksNo = commandData
         tasks = JSON.parse(fs.readFileSync(filePath , 'utf-8')) as Task[]
          
        tasks = tasks.filter(item => item.id != Number(taksNo))
        fs.writeFileSync(filePath, JSON.stringify(tasks,null ,2))
         console.log(tasks)


        }

        break;

    default:
         console.log("Unknown command. Try using: 'add <title>' or 'list'");
  
        break;
}


