import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    })
    return Response.json(users)
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json()
    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 })
    }
    const user = await prisma.user.update({ where: { id }, data })
    return Response.json(user)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 })
    return Response.json({ error: error?.message || "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 })
    }
    await prisma.user.update({ where: { id }, data: { isActive: false } })
    return Response.json({ success: true })
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 })
    return Response.json({ error: error?.message || "Failed to deactivate user" }, { status: 500 })
  }
}
