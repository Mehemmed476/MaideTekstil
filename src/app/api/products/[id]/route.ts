// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Next.js 15 üçün Params Tipi (Promise olmalıdır)
type Props = {
  params: Promise<{ id: string }>
}

// 1. GET (Məhsulu Gətir)
export async function GET(request: Request, props: Props) {
  try {
    // 🛑 DƏYİŞİKLİK: params-ı gözləyirik (await)
    const params = await props.params
    const id = Number(params.id)

    console.log("API-yə gələn ID:", id) // Logda görək

    if (isNaN(id)) {
      return NextResponse.json({ error: "Yanlış ID" }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!product) {
      console.log("Bazada tapılmadı:", id)
      return NextResponse.json({ error: "Məhsul tapılmadı" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("GET Error:", error)
    return NextResponse.json({ error: "Server xətası" }, { status: 500 })
  }
}

// 2. PATCH (Yenilə)
export async function PATCH(request: Request, props: Props) {
  try {
    const params = await props.params // <--- await
    const id = Number(params.id)
    const body = await request.json()

    console.log("Update edilən ID:", id)

    // Kateqoriya dəyişibsə tap
    let categoryConnect = {}
    if (body.category) {
        const cat = await prisma.category.findUnique({ where: { slug: body.category } })
        if (cat) {
            categoryConnect = { category: { connect: { id: cat.id } } }
        }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        price: Number(body.price),
        image: body.image,
        specs: body.specs,
        ...categoryConnect
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Update Error:", error)
    return NextResponse.json({ error: "Yenilənmədi" }, { status: 500 })
  }
}

// 3. DELETE (Sil)
export async function DELETE(request: Request, props: Props) {
  try {
    const params = await props.params // <--- await
    await prisma.product.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Silinmədi" }, { status: 500 })
  }
}