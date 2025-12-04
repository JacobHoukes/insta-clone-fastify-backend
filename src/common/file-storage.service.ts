import path from "path"
import fs from "fs/promises"
import { randomUUID } from "crypto"

export const fileStorageService = {
    async saveImage(
        imageBuffer: Buffer,
        original_filename: string
    ): Promise<string> {
        const uploadDir = path.join(process.cwd(), "public", "uploads") //does the upload dir exist?
        await fs.mkdir(uploadDir, { recursive: true }) // if it doesn't, create the upload directory
        const filename = `${randomUUID()}-${original_filename}` // unique filename is generated using randomUUID()
        const filepath = path.join(uploadDir, filename) // unique filename is generated based on the original filename
        await fs.writeFile(filepath, imageBuffer) // Save the image to the file system

        return `/uploads/${filename}`
    },
}
