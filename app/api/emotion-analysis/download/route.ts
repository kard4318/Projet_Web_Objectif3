import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET() {
  try {
    const pdfPath = join(
      process.cwd(),
      "backend",
      "emotional_classification",
      "model",
      "shared_memory",
      "7_PDFG_out",
      "full_analysis_report.pdf"
    )

    if (!existsSync(pdfPath)) {
      return NextResponse.json(
        { success: false, error: "Report not found" },
        { status: 404 }
      )
    }

    const pdfBuffer = await readFile(pdfPath)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="emotional_analysis_report.pdf"'
      }
    })
  } catch (error) {
    console.error("Error downloading report:", error)
    return NextResponse.json(
      { success: false, error: "Failed to download report" },
      { status: 500 }
    )
  }
}
