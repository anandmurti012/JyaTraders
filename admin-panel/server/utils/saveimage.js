const fs = require('fs');
const path = require("path");
const sharp = require('sharp');

module.exports.saveimage = async (folderName, fileData) => {
    try {
        return new Promise(async (resolve, reject) => {
            const fileExtension = '.' + fileData.originalname.split('.').pop();
            const newFileName = fileData.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + fileExtension;

            const newFilePath = path.join(__dirname, `../uploads/${folderName}`, newFileName);

            // Read the file from the temporary path
            fs.readFile(fileData.path, async (err, data) => {
                try {
                    if (err) {
                        console.error('Error reading the file:', err);
                        return reject(err);
                    }

                    if (folderName === 'courses') {
                        // Compress the image using sharp
                        await sharp(data)
                            .resize({  }) // Resize the image to a width of 800px
                            .toFormat('jpeg', { quality: 70 }) // Compress the image with 80% quality
                            .toFile(newFilePath);

                       return resolve({ msg: 'File saved successfully!', newFileName: newFileName });
                    } else {
                        // Compress the image using sharp
                        await sharp(data)
                            .resize({ width: 500, height: 500 }) // Resize the image to a width of 800px
                            .toFormat('jpeg', { quality: 70 }) // Compress the image with 80% quality
                            .toFile(newFilePath);

                       return resolve({ msg: 'File saved successfully!', newFileName: newFileName });
                    }

                } catch (error) {
                    return reject(error);
                }
                // // Write the file to the new path
                // fs.writeFile(newFilePath, data, (err) => {
                //     if (err) {
                //         console.error('Error writing the file:', err);
                //         return reject({ msg: err });
                //     }

                //     console.log('File saved successfully!');
                //     resolve({ msg: 'File saved successfully!', newFileName: newFileName });
                // });
            });
        });
    } catch (error) {
        console.log(error);
    }
};
