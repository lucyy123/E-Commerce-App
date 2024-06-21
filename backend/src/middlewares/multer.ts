import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },

  filename(req, file, callback) {
    const id = uuidv4();
    const extName = file.originalname.split(".").pop();

    const uniqueFileName = `${id}.${extName}`;

    callback(null, uniqueFileName);
  },
});

export const singleUpload = multer({ storage }).single("photo");
