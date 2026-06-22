import jsPDF from "jspdf"
import "jspdf-autotable"

interface InvoiceData {
  invoiceNo: number
  createdAt: Date
  user: { name: string }
  customer?: { name: string; phone?: string }
  items: { product: { name: string; nameAr?: string }; quantity: number; price: number; total: number }[]
  total: number
  discount: number
  tax: number
  grandTotal: number
  paid: number
}

export function generateInvoicePDF(invoice: InvoiceData): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const rtl = true
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("منظومتي", pageWidth - 20, 25, { align: "right" })
  doc.setFontSize(8)
  doc.text("نظام إدارة المبيعات والمخزون", pageWidth - 20, 31, { align: "right" })

  // Divider
  doc.setDrawColor(200)
  doc.setLineWidth(0.5)
  doc.line(20, 35, pageWidth - 20, 35)

  // Invoice details
  doc.setFontSize(10)
  doc.setTextColor(100)
  const details = [
    ["رقم الفاتورة", `#${invoice.invoiceNo}`],
    ["التاريخ", new Date(invoice.createdAt).toLocaleDateString("ar-SA")],
    ["المستخدم", invoice.user.name],
    ["العميل", invoice.customer?.name || "نقدي"],
    ["الحالة", "مكتملة"],
  ]
  let y = 42
  details.forEach(([k, v]) => {
    doc.text(v, pageWidth - 20, y, { align: "right" })
    doc.text(k, 20, y, { align: "left" })
    y += 6
  })

  // Table header
  doc.setFontSize(9)
  const tableHead = [
    { header: "#", dataKey: "index" },
    { header: "المنتج", dataKey: "name" },
    { header: "الكمية", dataKey: "qty" },
    { header: "السعر", dataKey: "price" },
    { header: "الإجمالي", dataKey: "total" },
  ]

  const tableBody = invoice.items.map((item, i) => [
    i + 1,
    item.product.nameAr || item.product.name,
    item.quantity,
    `${Number(item.price).toLocaleString()} ل.د`,
    `${Number(item.total).toLocaleString()} ل.د`,
  ])

  ;(doc as any).autoTable({
    head: [["#", "المنتج", "الكمية", "السعر", "الإجمالي"]],
    body: tableBody,
    startY: y + 5,
    styles: { fontSize: 8, halign: "right" as any, cellPadding: 2 },
    headStyles: { fillColor: [41, 112, 255], halign: "right", fontSize: 9 },
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.1,
    margin: { left: 20, right: 20 },
  })

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10
  doc.setFontSize(11)
  const totals = [
    ["الإجمالي", `${Number(invoice.total).toLocaleString()} ل.د`],
    ["الخصم", `${Number(invoice.discount).toLocaleString()} ل.د`],
    ["الضريبة", `${Number(invoice.tax).toLocaleString()} ل.د`],
    ["الصافي", `${Number(invoice.grandTotal).toLocaleString()} ل.د`],
    ["المدفوع", `${Number(invoice.paid).toLocaleString()} ل.د`],
    ["المتبقي", `${(Number(invoice.grandTotal) - Number(invoice.paid)).toLocaleString()} ل.د`],
  ]
  totals.forEach(([k, v]) => {
    doc.text(v, pageWidth - 20, finalY, { align: "right" })
    doc.text(k, 20, finalY, { align: "left" })
    finalY + 7
  })

  const finalY2 = finalY + totals.length * 7 + 10
  doc.setFontSize(7)
  doc.setTextColor(150)
  doc.text("تم إنشاء هذه الفاتورة بواسطة منظومتي", pageWidth / 2, finalY2, { align: "center" })

  return doc
}
