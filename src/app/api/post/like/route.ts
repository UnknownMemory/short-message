import { headers } from "next/headers"
import { NextRequest } from "next/server"




export async function PUT(request: NextRequest) {
    const headersList = headers()
    const userID: number = Number(<string>headersList.get('userID'))
}
