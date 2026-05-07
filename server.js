const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());


// ====================================================
//               MongoDB Connection
// ====================================================

mongoose.connect("mongodb://127.0.0.1:27017/collegeAdmission")
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});


// ====================================================
//                    Student Schema
// ====================================================

const studentSchema = new mongoose.Schema({

    name: String,
    email: String,
    course: String,
    percentage: Number,
    city: String

});


// ====================================================
//                    Student Model
// ====================================================

const Student = mongoose.model("Student", studentSchema);



// ====================================================
//                    GET API
// ====================================================

app.get('/students', async (req, res) => {

    try {

        let students = await Student.find();

        res.send(students);

    } catch (error) {

        res.send(error);

    }

});



// ====================================================
//                    POST API
// ====================================================

app.post('/students', async (req, res) => {

    try {

        let newStudent = new Student({

            name: req.body.name,
            email: req.body.email,
            course: req.body.course,
            percentage: req.body.percentage,
            city: req.body.city

        });

        await newStudent.save();

        res.send({

            message: "Student added successfully",
            data: newStudent

        });

    } catch (error) {

        res.send(error);

    }

});



// ====================================================
//                    PUT API
// ====================================================

app.put('/students/:id', async (req, res) => {

    try {

        let updatedStudent = await Student.findByIdAndUpdate(

            req.params.id,

            {

                name: req.body.name,
                email: req.body.email,
                course: req.body.course,
                percentage: req.body.percentage,
                city: req.body.city

            },

            { new: true }

        );

        // If student not found
        if (!updatedStudent) {

            return res.send("Student not found");

        }

        res.send({

            message: "Student updated successfully",
            updatedData: updatedStudent

        });

    } catch (error) {

        res.send(error);

    }

});



// ====================================================
//                    DELETE API
// ====================================================

app.delete('/students/:id', async (req, res) => {

    try {

        let deletedStudent = await Student.findByIdAndDelete(req.params.id);

        // If student not found
        if (!deletedStudent) {

            return res.send("Student not found");

        }

        res.send({

            message: "Student deleted successfully",
            deletedData: deletedStudent

        });

    } catch (error) {

        res.send(error);

    }

});



// ====================================================
//                    START SERVER
// ====================================================

app.listen(3000, () => {

    console.log("Server running on port 3000");

});