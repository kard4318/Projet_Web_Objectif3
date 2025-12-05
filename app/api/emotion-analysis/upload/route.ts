import { NextResponse } from "next/server"
import { writeFile, mkdir, rm, readdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const sharedMemoryPath = join(
      process.cwd(),
      "backend",
      "emotional_classification",
      "model",
      "shared_memory"
    )

    // Clear all previous analysis data from shared_memory folders
    const foldersToClean = [
      "0_BE_input",
      "1_EC_out",
      "2_OBJ_DET_out", 
      "3_FE_out",
      "4_C_E_out",
      "5_JSON_B_out",
      "6_A_G_out",
      "7_PDFG_out"
    ]

    console.log("Cleaning previous analysis data...")
    for (const folder of foldersToClean) {
      const folderPath = join(sharedMemoryPath, folder)
      if (existsSync(folderPath)) {
        try {
          const files = await readdir(folderPath)
          for (const file of files) {
            const filePath = join(folderPath, file)
            // Use recursive: true to handle directories
            await rm(filePath, { force: true, recursive: true })
          }
          console.log(`Cleaned ${folder}`)
        } catch (err) {
          console.warn(`Warning: Could not clean ${folder}:`, err)
        }
      }
    }

    // Save to emotion classification model's input directory
    const uploadPath = join(sharedMemoryPath, "0_BE_input", "original_input.png")

    // Ensure directory exists
    const uploadDir = join(sharedMemoryPath, "0_BE_input")
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Write file
    await writeFile(uploadPath, buffer)
    console.log("New image uploaded successfully")

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully"
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    )
  }
}
