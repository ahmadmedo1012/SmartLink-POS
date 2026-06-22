import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateInvoicePDF } from "@/lib/pdf"

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } },
      customer: { select: { name: true, phone: true } },
      items: { include: { product: { select: { name: true, nameAr: true } } } },
    },
  })
  if (!invoice) return NextResponse.json({ error: "not found" }, { status: 404 })

  const doc = generateInvoicePDF(invoice as any)
  const buffer = Buffer.from(doc.output("arraybuffer"))

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${invoice.invoiceNo}.pdf"`,
    },
  })
}
