const express = require('express');
const app = express();
const mysql = require('mysql2');

app.listen(90, () => {
    console.log("Listening to port number 90");
});

app.use(express.static("sf"));

let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'sumit',
    port: 3306
}

const conn = mysql.createConnection(dbparams);

app.get("/getdetails", (req, resp) => {
    console.log("inside get details");
    let empno = req.query.empno;
    console.log(empno);

    console.log("connection Successful");

    let output = {status: false, empdetails: {empno: 0, empname: "", mobileno: 0}}
    conn.query('select * from employee where empno = ?', [empno], 
            (error, rows) => {
                if(error){
                    console.log("Some Error"+error);
                }
                else{
                    if(rows.length > 0){
                        output.status = true;
                        output.empdetails = rows[0];
                    }
                    else{
                        console.log("Employee not found");
                    }
                }
                resp.send(output);
            });
});

app.get("/insertemp", (req, resp) => {
    console.log("Inside insertemp function");

    let empdetails = {empno: req.query.empno, empname: req.query.empname, mobileno: req.query.mobileno}
    let output = {status: false}

    conn.query('insert into employee(empno, empname, mobileno) values (?,?,?)', 
            [empdetails.empno, empdetails.empname, empdetails.mobileno],
            (error, res) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(res.affectedRows > 0){
                        console.log("Insert Successful");
                        output.status = true;
                    }
                    else{
                        console.log("Insert failed");
                    }
                }
                resp.send(output);
            });
});

app.get("/updateemp", (req, resp) => {
    console.log("Inside Updateemp function");

    let empdetails = {empno: req.query.empno, empname: req.query.empname, mobileno: req.query.mobileno}
    let output = {status: false}

    conn.query('update employee set empno = ?, empname = ?, mobileno = ?', 
            [empdetails.empno, empdetails.empname, empdetails.mobileno],
            (error, res) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(res.affectedRows > 0){
                        console.log("Update Successful");
                        output.status = true;
                    }
                    else{
                        console.log("Update failed");
                    }
                }
                resp.send(output);
            });
});

app.get("/deleteemp", (req, resp) => {
    console.log("Inside deleteemp function");

    let empdetails = {empno: req.query.empno}
    let output = {status: false}

    conn.query('delete from employee where empno = ?', 
            [empdetails.empno],
            (error, res) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(res.affectedRows > 0){
                        console.log("Delete Successful");
                        output.status = true;
                    }
                    else{
                        console.log("Delete failed");
                    }
                }
                resp.send(output);
            });
});