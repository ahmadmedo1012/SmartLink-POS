import { prisma } from "@/lib/prisma"
import { requireRole } from "@/lib/auth"

export async function GET() {
  const session = await requireRole("admin")
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })
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
  const session = await requireRole("admin")
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { id, ...data } = await req.json()
    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 })
    }
    const user = await prisma.user.update({ where: { id }, data })
    return Response.json(user)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 })
    console.error("Failed to update user:", error)
    return Response.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await requireRole("admin")
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { id } = await req.json()
    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 })
    }
    await prisma.user.update({ where: { id }, data: { isActive: false } })
    return Response.json({ success: true })
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "User not found" }, { status: 404 })
    console.error("Failed to deactivate user:", error)
    return Response.json({ error: "Failed to deactivate user" }, { status: 500 })
  }
}
