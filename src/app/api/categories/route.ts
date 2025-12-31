// src/app/api/categories/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

// Keşləməni söndürürük (hər dəfə təzə məlumat)
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

// 1. KATEQORİYALARI GƏTİR (GET)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: 'asc' },
      include: { _count: { select: { products: true } } }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("GET Xətası:", error)
    return NextResponse.json([], { status: 500 })
  }
}

// 2. YENİ KATEQORİYA YARAT (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Frontenddən gələn məlumat:", body) // <--- Terminalda bunu yoxla!

    // Validasiya: Heç olmasa bir ad olmalıdır
    if (!body.title_az && !body.title_en) {
        return NextResponse.json({ error: "Zəhmət olmasa ən azı bir dildə ad yazın" }, { status: 400 })
    }

    // Slug yaratma məntiqi (Daha güclü)
    let slug = body.slug

    if (!slug) {
       // Əgər İngilis adı varsa, ondan düzəlt
       if (body.title_en) {
         slug = body.title_en.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
       } 
       // İngilis yoxdursa, Azərbaycandan düzəlt (hərfləri dəyişərək)
       else if (body.title_az) {
         slug = body.title_az.toLowerCase().trim()
            .replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
            .replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
            .replace(/ /g, '-').replace(/[^\w-]+/g, '')
       }
    }

    // Əgər hələ də slug boşdursa (qəribə simvollar varsa), təsadüfi bir şey qoy
    if (!slug || slug.length === 0) {
        slug = `cat-${Date.now()}`
    }

    console.log("Yaranan Slug:", slug)

    const newCategory = await prisma.category.create({
      data: {
        slug: slug,
        title: {
          az: body.title_az || body.title_en, // Boşdursa digərini işlət
          en: body.title_en || body.title_az,
          ru: body.title_ru || body.title_en
        }
      }
    })

    return NextResponse.json(newCategory)

  } catch (error: any) {
    console.error("POST Xətası:", error)

    // Əgər xəta həqiqətən "Unikal Slug" xətasıdırsa (Prisma kodu: P2002)
    if (error.code === 'P2002') {
        return NextResponse.json({ error: "Bu adda kateqoriya (slug) artıq mövcuddur!" }, { status: 400 })
    }

    // Başqa xətadırsa, real səbəbi de
    return NextResponse.json({ error: "Xəta oldu: " + error.message }, { status: 500 })
  }
}

// 3. SİL (DELETE)
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: { _count: { select: { products: true } } }
    })

    if (category && category._count.products > 0) {
        return NextResponse.json(
            { error: `Bu kateqoriyada ${category._count.products} məhsul var. Silmək olmaz!` }, 
            { status: 400 }
        )
    }

    await prisma.category.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Silinmədi" }, { status: 500 })
  }
}