// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
require('dotenv').config() 

const prisma = new PrismaClient()

async function main() {
  // Təmizlik
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.siteSetting.deleteMany()
  await prisma.user.deleteMany()

  // 1. Admin Yarat
  await prisma.user.create({
    data: { email: 'admin@maidetekstil.com', password: 'admin' },
  })

  // 2. Kateqoriyaları Yarat
  const silk = await prisma.category.create({
    data: { slug: 'silk', title: { az: 'İpək', en: 'Silk', ru: 'Шелк' } }
  })
  const cotton = await prisma.category.create({
    data: { slug: 'cotton', title: { az: 'Pambıq', en: 'Cotton', ru: 'Хлопок' } }
  })
  
  // 3. Sayt Ayarlarını Yarat (Boş qalmasın)
  await prisma.siteSetting.create({
    data: {
      aboutTitle: { az: "Hekayəmiz", en: "Our Story", ru: "Наша История" },
      aboutText: { az: "Bizim haqqımızda...", en: "About us...", ru: "О нас..." },
      aboutStats: { stat1: "15", stat2: "500", stat3: "100" },
      email: "info@maide.az",
      phone: "+994501234567",
      address: { az: "Bakı", en: "Baku", ru: "Баку" }
    }
  })

  console.log("✅ Baza hazırdır: Admin, Kateqoriyalar və Ayarlar yükləndi.")
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })