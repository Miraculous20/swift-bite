import cloudinary from '../config/cloudinary.js';

const uploadImageClodinary = async (fileBuffer, folderName = "swift-bite") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

export default uploadImageClodinary;