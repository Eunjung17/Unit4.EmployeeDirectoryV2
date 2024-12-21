const express = require("express");
const router = express.Router();
let employees = require("../data/employees");
const { v4: uuidv4 } = require("uuid");


  router.get("/", (req, res) => {
    res.send("Hello employees!");
  });
  
  router.get("/employees", (req, res) => {
    res.json(employees);
  });
  
  router.get("/employees/random", (req, res) => {
    const i = Math.floor(Math.random() * employees.length);
    res.json(employees[i]);
  });
  
  router.get("/employees/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find((e) => e.id === +id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send(`There is no employee with id ${id}.`);
    }
  });

  
  router.post("/employee", (req, res) => {
    const {name} = req.body;
    //employees.push({id:employees.length + 1, name});
    employees.push({id:uuidv4(), name});
    if (name) res.send(employees);
    else res.status(400).send("Name is not correctly provided");
  });

  router.put("/employee/:id", (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    console.log(id, ":" ,name);
    employees.forEach((element)=>{
      if(element.id === Number(id)) element.name = name;
    });

    res.status(200).send(employees);
  });

  router.delete("/employee/:id", (req, res) => {
    const id = req.params.id;
    const employee = employees.filter((element)=>element.id !== Number(id));
    if(employee) res.status(200).json(employee);
    else res.status(404).send("Not found");
  });


  module.exports = router //router 객체를 반환