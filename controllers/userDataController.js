require('dotenv').config()
const User = require("../models/customerModel")
const multer = require("multer")
const fs = require("fs")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 10 },
}).single('image'); // 10mb



function userDataController() {
    return {
        getImage(req, resp) {
            resp.render("userDataPost")
        },
            // ********************************  Find List All Product *******************************//
        async getImageUrl(req, resp) {
            try {
              const user = await User.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 });
            //   const imageUrl = user?.imageUrl || ""; // use default value if user is null or imageUrl is null/undefined
            //   resp.render("home", { imageUrl });
            resp.status(201).json({ 'data': { ImageURL: user} });
            } catch (err) {
              console.error(err);
              resp.status(500).send("Internal server error");
            }
          },
        postImage(req, resp) {
            handleMultipartData(req, resp, async (err) => {

                if (err) {
                    return resp.send("Internal error")
                }

                const filePath =req.file.path;
                // const imageURL =`http://localhost:8000/${filePath}`;
                // const imageURL =`${process.env.APP_URL}/${filePath}`;
                // const imageURL =`${process.env.PORT}/${filePath}`;
                const imageURL =`https://${req.headers.host}/${filePath}`;
               
               
                console.log(req.file)
                console.log(filePath)

                const { name,dob, gender,address,accNo, email,phone } = req.body;
                console.log(name,dob, gender,address,accNo, email,phone)
                let document;
                try {
                    document = await User.create({
                        name,
                        dob,
                        gender,
                        address,
                        accNo,
                        email,
                        phone,
                        image: imageURL,
                    });
                    // resp.status(201).json({ 'data': { ImageURL: document } });
                    // document.save();
                    console.log(imageURL)
                } catch (err) {
                    resp.status(500).json(err);
                }
                resp.status(201).json({ 'data': { ImageURL: document } });
            })
        }
    }
}
module.exports = userDataController;