const express = require("express");
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));  

let tasks = [
    { taskNumber: 1, taskName: "Create project setup", assignedTo: "Jason" },
    { taskNumber: 2, taskName: "Design UI wireframes", assignedTo: "Emily" },
    { taskNumber: 3, taskName: "Implement login functionality", assignedTo: "Michael" }
];

app.get("/", (req, res) => {
    res.render("form", { tasks, task: null });   
});

app.post("/insertData", (req, res) => {
    const updateId = req.body.updateId;
    const taskNumber = Number(req.body.taskNumber);
    const taskName = req.body.taskName;
    const assignedTo = req.body.assignedTo;

    if (updateId) {
        tasks = tasks.map(t => {
            if (t.taskNumber == updateId) {
                return {
                    taskNumber,
                    taskName,
                    assignedTo
                };
            }
            return t;
        });
        console.log("Task Updated");
    } else {
        tasks.push({ taskNumber, taskName, assignedTo });
        console.log("Task Inserted");
    }

    return res.redirect("/");
});

app.get("/deleteData", (req, res) => {
    const id = req.query.taskNumber;
    tasks = tasks.filter(t => t.taskNumber != id);
    res.redirect("/");
});

app.get("/updateData", (req, res) => {
    const id = req.query.taskNumber;
    const foundTask = tasks.find(t => t.taskNumber == id);

    res.render("form", { tasks, task: foundTask }); 
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

