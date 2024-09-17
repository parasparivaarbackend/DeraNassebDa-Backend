import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();


const storage = new Storage({
    keyFilename: "keys.json",
});


export async function ImageUpload(file) {
    try {
        const bucket = storage.bucket(process.env.BUCKET_NAME);
        const destination = file.filename;

        const data = await bucket.upload(file.path, {
            destination: destination,
            resumable: true,
            metadata: {
                contentType: file.mimetype,
            },
        });

        fs.unlinkSync(file.path)

        const image_url = `https://storage.googleapis.com/${data[1].bucket}/${data[1].name}`
        return { image_url, image_id: data[1].name }
    } catch (err) {
        fs.unlinkSync(file.path)
        console.log(err)
    }
}


export async function DeleteImage(fileName) {
    try {
        await storage.bucket(process.env.BUCKET_NAME).file(fileName).delete();
        console.log("deleted")
        return "deleted successfully"
    } catch (err) {
        console.log("not deleted")
        console.error('Error deleting file:', err);
        throw new Error('Failed to delete image');
    }
}