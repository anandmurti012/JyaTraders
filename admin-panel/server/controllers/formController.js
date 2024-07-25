const connection = require("../database/db");
const fs = require('fs');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();


module.exports.formController = {
    createSection: async (req, res) => {
        try {
            const { title } = req.body;

            const newData = {
                name: title,
                createdAt: new Date()
            }

            connection.query("INSERT INTO form_sections SET?", newData, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: "Section Successfully Created" });
                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getSection: async (req, res) => {
        try {
            connection.query("SELECT * FROM  form_sections", async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results, msg: "Section Successfully Created" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    deleteSection: async (req, res) => {
        try {
            const { id } = req.body
            connection.query(`DELETE FROM form_sections WHERE id=${id}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results, msg: "Section Successfully Deleted" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    createForm: async (req, res) => {
        try {
            const { title, sectionId } = req.body
            const file = req.file;

            const tempPath = file.path;
            const fileExtension = '.' + file.originalname.split('.').pop();
            const newFileName = title + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + fileExtension;

            const targetPath = path.join(__dirname, '../uploads/forms/', newFileName);

            fs.readFile(tempPath, async (err, data) => {
                try {
                    if (err) {
                        console.error('Error reading the file:', err);
                    }
                    // Write the file to the new path
                    fs.writeFile(targetPath, data, (err) => {
                        if (err) {
                            console.error('Error writing the file:', err);
                            return res.status(500).json({ msg: 'Error writing the file' })
                        }

                        const newData = {
                            name: title,
                            sectionId: sectionId,
                            file: newFileName,
                            createdAt: new Date()
                        }

                        connection.query("INSERT INTO forms SET?", newData, async (error, results) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ msg: error.sqlMessage });
                            } else {
                                console.log("1 record inserted");
                                return res.status(201).json({ msg: 'Successfully Added' })
                            }
                        });
                    });
                } catch (error) {
                    console.log('Read file error:', error)
                }
            })
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getForms: async (req, res) => {
        try {
            const { id } = req.query
            connection.query(`SELECT * FROM  forms WHERE sectionId=${id}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results, msg: "Section Successfully Created" });
                }
            });

        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    deleteForms: async (req, res) => {
        try {
            const { id, fileName } = req.body

            connection.query(`DELETE FROM forms WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const fullPath = path.join(__dirname, `../uploads/forms/${fileName}`);
                    fs.unlink(fullPath, async (err) => {
                        if (err) {
                            console.error('Error deleting file:');
                        } else {
                            console.log('File deleted successfully:', fullPath);
                        }
                    });
                    return res.status(200).json({ results: results, msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

}