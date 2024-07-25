const connection = require("../database/db");
const dotenv = require('dotenv');
const { saveimage } = require("../utils/saveimage");
const fs = require('fs');
const path = require("path");
dotenv.config();


module.exports.courseController = {
    addCourses: async (req, res) => {
        try {
            // console.log(req.rootUser.adminId);

            connection.query("SELECT * FROM courses", async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    if (results.length > 0) {
                        return res.status(409).json({ msg: "Course Already Exist, You can add lectures." });
                    } else {
                        const file = await saveimage('courses', req.file);
                        const { title, price, description, validity } = req.body;
                        const newData = {
                            title: title,
                            price: price,
                            addedBy: req.rootUser.adminId,
                            description: description,
                            validity: validity,
                            image: file.newFileName,
                            createdAt: new Date()
                        }

                        connection.query("INSERT INTO courses SET?", newData, async (error, results) => {
                            if (error) {
                                // console.log(error);
                                return res.status(500).json({ msg: error.sqlMessage });
                            } else {
                                console.log("1 record inserted");
                                return res.status(201).json({ msg: "Course Successfully Created" });
                            }
                        });
                    }
                }
            });


        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    viewCourses: async (req, res) => {
        try {
            connection.query("SELECT * FROM courses", async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results, msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateCourses: async (req, res) => {
        try {
            const { id } = req.query;
            const { title, description, price, oldimage } = req.body

            // console.log(title, description, price, oldimage);


            if (req.file) {
                const file = await saveimage('courses', req.file);
                connection.query(`UPDATE courses SET title='${title}', description='${description}', price='${price}', image='${file?.newFileName}' WHERE id='${id}'`, async (error, results) => {
                    if (error) {
                        // console.log(error);
                        return res.status(500).json({ msg: error.sqlMessage });
                    } else {
                        const fullPath = path.join(__dirname, `../uploads/courses/${oldimage}`);
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
            } else {
                connection.query(`UPDATE courses SET title='${title}', description='${description}', price='${price}' WHERE id='${id}'`, async (error, results) => {
                    if (error) {
                        // console.log(error);
                        return res.status(500).json({ msg: error.sqlMessage });
                    } else {
                        return res.status(200).json({ results: results, msg: "success" });
                    }
                });
            }


        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    viewSingleCourses: async (req, res) => {
        try {
            const { id } = req.query
            connection.query(`SELECT * FROM courses LIMIT 1`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results[0], msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    deleteCourses: async (req, res) => {
        try {
            const { id, image } = req.query

            connection.query(`DELETE FROM courses WHERE id=${id}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {

                    // Make sure to set the COURSE_IMAGE_PATH environment variable correctly
                    const courseImagePath = path.join(__dirname, `../uploads/courses/${image}`);
                    fs.unlink(courseImagePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:');
                        } else {
                            console.log('File deleted successfully:', image);
                        }
                    });

                    connection.query(`SELECT image,attachment FROM lectures WHERE courseId=${id}`, async (error, results) => {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            let images = [];
                            let attachments = [];

                            // Process each item in the data array
                            results.forEach(item => {
                                // Add image to images array
                                images.push(item.image);

                                // Parse attachments if it's an array
                                if (item.attachment) {
                                    let parsedAttachments = [];
                                    try {
                                        parsedAttachments = JSON.parse(item.attachment);
                                    } catch (error) {
                                        console.error('Error parsing attachments:', error);
                                    }
                                    // Add parsed attachments to attachments array
                                    if (Array.isArray(parsedAttachments)) {
                                        attachments.push(...parsedAttachments);
                                    }
                                }
                            });

                            // Function to delete files
                            function deleteFiles(fileList) {
                                fileList.forEach(file => {
                                    const filePath = path.join(__dirname, `../uploads/lectures/${file}`);
                                    fs.unlink(filePath, (err) => {
                                        if (err) {
                                            console.error('Error deleting file:')//err.message);
                                        } else {
                                            console.log('File deleted successfully:'); //file
                                        }
                                    });
                                });
                            }

                            // console.log('Images:', images);
                            // console.log('Attachments:', attachments);


                            // Delete all images
                            deleteFiles(images);

                            // Delete all attachments
                            deleteFiles(attachments);


                            connection.query(`DELETE FROM lectures WHERE courseId =${id}`, async (error, results) => {
                                if (error) {
                                    // console.log(error);
                                    return res.status(500).json({ msg: error.sqlMessage });
                                } else {
                                    return res.status(200).json({ msg: "Successfully Deleted" });
                                }
                            });
                        }
                    });

                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    addLectures: async (req, res) => {
        try {
            const { courseId, title, videolink, description } = req.body;

            const files = req.files
            let attachements = []

            // Check if there are more than one file
            if (files.length > 1) {


                // Skip the first file and save the rest
                for (let i = 1; i < files.length; i++) {
                    const file = files[i];
                    const tempPath = file.path;
                    const fileExtension = '.' + file.originalname.split('.').pop();
                    const newFileName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + fileExtension;
                    attachements.push(newFileName);

                    const targetPath = path.join(__dirname, '../uploads/lectures/', newFileName);

                    fs.readFile(tempPath, async (err, data) => {
                        try {
                            if (err) {
                                console.error('Error reading the file:', err);
                            }
                            // Write the file to the new path
                            fs.writeFile(targetPath, data, (err) => {
                                if (err) {
                                    console.error('Error writing the file:', err);
                                }
                                console.log('File saved successfully!');
                            });
                        } catch (error) {
                            console.log('Read file error:', error)
                        }
                    })
                }

            }
            const image = await saveimage('lectures', req?.files[0]);
            const newData = {
                courseId: courseId,
                title: title,
                videoLink: videolink,
                attachment: JSON.stringify(attachements),
                description: description,
                image: image.newFileName,
                addedBy: req.rootUser.adminId,
                createdAt: new Date()
            }

            connection.query("INSERT INTO lectures SET?", newData, async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    console.log("1 record inserted");
                    return res.status(201).json({ msg: 'Successfully Added' })
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getLectures: async (req, res) => {
        try {
            const { courseId } = req.query;
            connection.query(`SELECT * FROM lectures WHERE courseId=${courseId}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ results: results, msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getSingleLectures: async (req, res) => {
        try {
            const { id } = req.query;
            connection.query(`SELECT * FROM lectures WHERE id=${id}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    // console.log(results)
                    return res.status(200).json({ results: results[0], msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    deleteLectures: async (req, res) => {
        try {
            const { id } = req.query

            connection.query(`SELECT image,attachment FROM lectures WHERE id=${id}`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    let images = [];
                    let attachments = [];

                    // Process each item in the data array
                    results.forEach(item => {
                        // Add image to images array
                        images.push(item.image);

                        // Parse attachments if it's an array
                        if (item.attachment) {
                            let parsedAttachments = [];
                            try {
                                parsedAttachments = JSON.parse(item.attachment);
                            } catch (error) {
                                console.error('Error parsing attachments:', error);
                            }
                            // Add parsed attachments to attachments array
                            if (Array.isArray(parsedAttachments)) {
                                attachments.push(...parsedAttachments);
                            }
                        }
                    });

                    // Function to delete files
                    function deleteFiles(fileList) {
                        fileList.forEach(file => {
                            const filePath = path.join(__dirname, `../uploads/lectures/${file}`);
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Error deleting file:')//err.message);
                                } else {
                                    console.log('File deleted successfully:'); //file
                                }
                            });
                        });
                    }

                    // console.log('Images:', images);
                    // console.log('Attachments:', attachments);


                    // Delete all images
                    deleteFiles(images);

                    // Delete all attachments
                    deleteFiles(attachments);


                    connection.query(`DELETE FROM lectures WHERE id =${id}`, async (error, results) => {
                        if (error) {
                            // console.log(error);
                            return res.status(500).json({ msg: error.sqlMessage });
                        } else {
                            return res.status(200).json({ msg: "Successfully Deleted" });
                        }
                    });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getSubscribeCourses: async (req, res) => {
        try {
            // console.log(req.rootUser);
            const { email } = req.rootUser;

            connection.query(`SELECT * FROM purchase_courses WHERE email='${email}'`, async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {

                    return res.status(200).json({ results: results, msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    getSingleSubscribeCourses: async (req, res) => {
        try {
            const { email } = req.rootUser;
            const { courseId } = req.query;

            connection.query(`SELECT * FROM purchase_courses WHERE courseId='${courseId}' AND email='${email}'`, async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    // console.log(results)
                    return res.status(200).json({ results: results, msg: "success" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    updateLectures: async (req, res) => {
        try {
            const { id, title, pre_img, videoLink, description } = req.body;
            const files = req.files
            let imageFile = ''

            // Check if there are more than one file
            if (files.length > 0) {
                const image = await saveimage('lectures', req?.files[0]);
                imageFile = image.newFileName;

                const fullPath = path.join(__dirname, `../uploads/lectures/${pre_img}`);
                fs.unlink(fullPath, async (err) => {
                    if (err) {
                        console.error('Error deleting file:');
                    } else {
                        console.log('File deleted successfully:', fullPath);
                    }
                });
            } else {
                imageFile = pre_img
            }

            connection.query(`UPDATE lectures SET title='${title}', description='${description}', videoLink='${videoLink}', image='${imageFile}' WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully Updated" });
                }
            });


        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

    updateAttachments: async (req, res) => {
        try {
            const { id, prev_file } = req.body;
            const files = req.files
            let attachements = []

            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const tempPath = file.path;
                    const fileExtension = '.' + file.originalname.split('.').pop();
                    const newFileName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + fileExtension;
                    attachements.push(newFileName);

                    const targetPath = path.join(__dirname, '../uploads/lectures/', newFileName);

                    fs.readFile(tempPath, async (err, data) => {
                        try {
                            if (err) {
                                console.error('Error reading the file:', err);
                            }
                            // Write the file to the new path
                            fs.writeFile(targetPath, data, (err) => {
                                if (err) {
                                    console.error('Error writing the file:', err);
                                }
                                console.log('File saved successfully!');
                            });
                        } catch (error) {
                            console.log('Read file error:', error)
                        }
                    })
                }

            }

            const preFile = JSON.parse(prev_file);
            const newArray = [...preFile, ...attachements];
            const newFiles = JSON.stringify(newArray)

            connection.query(`UPDATE lectures SET attachment='${newFiles}' WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    return res.status(200).json({ msg: "Successfully Updated" });
                }
            });


        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },
    deleteAttachments: async (req, res) => {
        try {
            const { id, files, attachments } = req.body;

            const updatedAttachments = attachments.filter(attachment => attachment !== files);
            const newFile = JSON.stringify(updatedAttachments)

            connection.query(`UPDATE lectures SET attachment='${newFile}' WHERE id='${id}'`, async (error, results) => {
                if (error) {
                    // console.log(error);
                    return res.status(500).json({ msg: error.sqlMessage });
                } else {
                    const fullPath = path.join(__dirname, `../uploads/lectures/${files}`);
                    fs.unlink(fullPath, async (err) => {
                        if (err) {
                            console.error('Error deleting file:');
                        } else {
                            console.log('File deleted successfully:', fullPath);
                        }
                    });
                    return res.status(200).json({ msg: "Successfully Updated" });
                }
            });
        } catch (error) {
            console.log('Backend Server Error', error);
            return res.status(500).json({ msg: "Backend Server Error" });
        }
    },

}