const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
const { uploadFileWithFolderName } = require("./Public_Function");

async function createRoute(req, file, folderName){ 
  const { en_title } = req.body;
  const date = new Date();
  const year = date.getFullYear().toString();
  // const month = date.getMonth().toString();
  // const day = date.getDate().toString();
  if(en_title){
    const directory = path.join(__dirname, "..", "..", "Public", "Uploads", folderName, file, year, `${en_title}`)
    req.body.fileUploadPath = path.join("Uploads", folderName, file, year, `${en_title}`);
    fs.mkdirSync(directory, {recursive: true});
    return directory  
} else {
    const fileName = await uploadFileWithFolderName(req.params, folderName);
    const directory = path.join(__dirname, "..", "..", "Public", "Uploads", folderName, file, year, `${fileName}`)
    req.body.fileUploadPath = path.join("Uploads", folderName, file, year, `${fileName}`);
    fs.mkdirSync(directory, {recursive: true});
    return directory
  }
}
const uploadFile = (folderName) => {
    return imageUpload = multer({
      storage: multer.diskStorage({
        destination: async(req, file, cb) => {
          if(file?.originalname){
            const filePath  = await createRoute(req, file.fieldname, folderName);
            return cb(null, filePath);
          } cb(null, null)
        },
  
        // By default, multer removes file extensions so let's add them back
        filename: (req, file, cb) => {
            if(file?.originalname){
                const ext = path.extname(file.originalname)
                const fileName = String(new Date().getTime()) + ext;
                req.body.filename = fileName;
                return cb(null, fileName);
            } cb(null, null)       
        }
      }),
      limits: { fileSize: 10000000 },
      fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const mimetypes = [".jpeg", ".jpg", ".png", ".webp", ".gif", ".jfif", ".avif", ".svg", ".ico"];
        if(mimetypes.includes(ext)){
        return cb(null, true)
     } 
     return cb(createHttpError.BadRequest("فرمت تصویر ارسالی صحیح نمیباشد"))       
      }
    })
}

module.exports = {
    uploadFile
}
