// src/app/api/products/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

// Keşləməni söndür (həmişə təzə məlumat)
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// GET METODU (Olduğu kimi qalır)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json([], { status: 500 })
  }
}

// POST METODU (YENİLƏNDİ - DEBUG İLƏ)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 1. Frontenddən nə gəlir? Terminala yazdıraq
    console.log("--------------------------------")
    console.log("📥 YENİ MƏHSUL SORĞUSU GƏLDİ")
    console.log("Gələn Kateqoriya (Slug):", body.category)
    console.log("Gələn Ad:", body.title.az)
    
    // 2. Slug boşdursa xəbərdarlıq et
    if (!body.category) {
      console.log("❌ XƏTA: Kateqoriya (slug) boş gəldi!")
      return NextResponse.json({ error: "Kateqoriya seçilməyib!" }, { status: 400 })
    }

    // 3. Bazada axtarış et
    const categoryDB = await prisma.category.findUnique({
      where: { slug: body.category } // <--- Slug-a görə axtarırıq
    })

    // 4. Tapıb-tapmadığını yoxla
    if (!categoryDB) {
      console.log("❌ XƏTA: Bazada belə kateqoriya tapılmadı:", body.category)
      
      // Bəlkə bazada nə var ona baxaq?
      const allCats = await prisma.category.findMany()
      console.log("🔍 Bazadakı mövcud kateqoriyalar:", allCats.map(c => c.slug))
      
      return NextResponse.json({ error: "Seçdiyiniz kateqoriya bazada tapılmadı. Səhifəni yeniləyib yoxlayın." }, { status: 400 })
    }

    console.log("✅ UĞUR: Kateqoriya tapıldı -> ID:", categoryDB.id)

    // 5. Məhsulu yarat
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,        
        description: body.description,
        price: Number(body.price),
        image: body.image,
        specs: body.specs,
        category: {
          connect: { id: categoryDB.id }
        }
      }
    })

    console.log("✅ Məhsul yaradıldı:", newProduct.id)
    return NextResponse.json(newProduct)

  } catch (error: any) {
    console.error("🔥 KRİTİK XƏTA:", error)
    return NextResponse.json({ error: "Məhsul yaradılmadı: " + error.message }, { status: 500 })
  }
}