import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data (optional - comment out in production)
  await prisma.serviceResponse.deleteMany()
  await prisma.serviceRequest.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.review.deleteMany()
  await prisma.providerAnalytics.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.service.deleteMany()
  await prisma.providerGallery.deleteMany()
  await prisma.provider.deleteMany()
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  await prisma.city.deleteMany()
  await prisma.district.deleteMany()
  await prisma.province.deleteMany()

  console.log('Cleared existing data')

  // ==== PROVINCES ====
  const provinces = [
    { name: 'Western', nameEn: 'Western', nameSi: 'බස්නාහිර', nameTa: 'மேல்', code: 'WP', latitude: 6.9271, longitude: 79.8612 },
    { name: 'Central', nameEn: 'Central', nameSi: 'මධ්‍යම', nameTa: 'மத்திய', code: 'CP', latitude: 7.2906, longitude: 80.6337 },
    { name: 'Southern', nameEn: 'Southern', nameSi: 'දකුණු', nameTa: 'தென்', code: 'SP', latitude: 6.0535, longitude: 80.2210 },
    { name: 'Northern', nameEn: 'Northern', nameSi: 'උතුරු', nameTa: 'வடக்கு', code: 'NP', latitude: 9.6615, longitude: 80.0255 },
    { name: 'Eastern', nameEn: 'Eastern', nameSi: 'නැගෙනහිර', nameTa: 'கிழக்கு', code: 'EP', latitude: 7.7186, longitude: 81.6976 },
    { name: 'North Western', nameEn: 'North Western', nameSi: 'වයඹ', nameTa: 'வடமேல்', code: 'NWP', latitude: 7.7615, longitude: 80.0155 },
    { name: 'North Central', nameEn: 'North Central', nameSi: 'උතුරු මැද', nameTa: 'வட மத்திய', code: 'NCP', latitude: 8.3355, longitude: 80.4036 },
    { name: 'Uva', nameEn: 'Uva', nameSi: 'ඌව', nameTa: 'ஊவா', code: 'UP', latitude: 6.9821, longitude: 81.0524 },
    { name: 'Sabaragamuwa', nameEn: 'Sabaragamuwa', nameSi: 'සබරගමුව', nameTa: 'சப்ரகமுவ', code: 'SG', latitude: 6.7103, longitude: 80.3803 },
  ]

  const createdProvinces = []
  for (const province of provinces) {
    const p = await prisma.province.create({ data: province })
    createdProvinces.push(p)
    console.log(`Created province: ${p.name}`)
  }

  // ==== DISTRICTS ====
  const districtsData = [
    // Western Province
    { name: 'Colombo', nameEn: 'Colombo', code: 'CO', provinceName: 'Western', latitude: 6.9271, longitude: 79.8612 },
    { name: 'Gampaha', nameEn: 'Gampaha', code: 'GA', provinceName: 'Western', latitude: 7.0873, longitude: 80.0098 },
    { name: 'Kalutara', nameEn: 'Kalutara', code: 'KA', provinceName: 'Western', latitude: 6.5854, longitude: 79.9607 },
    
    // Central Province
    { name: 'Kandy', nameEn: 'Kandy', code: 'KY', provinceName: 'Central', latitude: 7.2906, longitude: 80.6337 },
    { name: 'Matale', nameEn: 'Matale', code: 'MT', provinceName: 'Central', latitude: 7.4675, longitude: 80.6234 },
    { name: 'Nuwara Eliya', nameEn: 'Nuwara Eliya', code: 'NE', provinceName: 'Central', latitude: 6.9497, longitude: 80.7891 },
    
    // Southern Province
    { name: 'Galle', nameEn: 'Galle', code: 'GL', provinceName: 'Southern', latitude: 6.0535, longitude: 80.2210 },
    { name: 'Matara', nameEn: 'Matara', code: 'MH', provinceName: 'Southern', latitude: 5.9549, longitude: 80.5550 },
    { name: 'Hambantota', nameEn: 'Hambantota', code: 'HB', provinceName: 'Southern', latitude: 6.1429, longitude: 81.1212 },
  ]

  const createdDistricts = []
  for (const districtData of districtsData) {
    const province = createdProvinces.find(p => p.name === districtData.provinceName)
    if (province) {
      const d = await prisma.district.create({
        data: {
          name: districtData.name,
          nameEn: districtData.nameEn,
          code: districtData.code,
          provinceId: province.id,
          latitude: districtData.latitude,
          longitude: districtData.longitude,
        }
      })
      createdDistricts.push(d)
      console.log(`Created district: ${d.name}`)
    }
  }

  // ==== CITIES ====
  const citiesData = [
    { name: 'Colombo', nameEn: 'Colombo', districtName: 'Colombo', isMajor: true, population: 752993 },
    { name: 'Dehiwala-Mount Lavinia', nameEn: 'Dehiwala-Mount Lavinia', districtName: 'Colombo', isMajor: true },
    { name: 'Moratuwa', nameEn: 'Moratuwa', districtName: 'Colombo', isMajor: true },
    { name: 'Negombo', nameEn: 'Negombo', districtName: 'Gampaha', isMajor: true },
    { name: 'Gampaha', nameEn: 'Gampaha', districtName: 'Gampaha', isMajor: true },
    { name: 'Kalutara', nameEn: 'Kalutara', districtName: 'Kalutara', isMajor: true },
    { name: 'Kandy', nameEn: 'Kandy', districtName: 'Kandy', isMajor: true, population: 125400 },
    { name: 'Galle', nameEn: 'Galle', districtName: 'Galle', isMajor: true, population: 99478 },
    { name: 'Matara', nameEn: 'Matara', districtName: 'Matara', isMajor: true },
  ]

  for (const cityData of citiesData) {
    const district = createdDistricts.find(d => d.name === cityData.districtName)
    if (district) {
      const c = await prisma.city.create({
        data: {
          name: cityData.name,
          nameEn: cityData.nameEn,
          districtId: district.id,
          provinceId: district.provinceId,
          isMajor: cityData.isMajor || false,
          population: cityData.population,
        }
      })
      console.log(`Created city: ${c.name}`)
    }
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  // ==== CATEGORIES ====
  const categoriesData = [
    // HOME SERVICES
    { name: 'Home Services', slug: 'home-services', description: 'Professional home maintenance and repair services', icon: '🏠', featured: true },
    { name: 'Electrician', slug: 'electrician', description: 'Electrical installation, repair, and maintenance', parent: 'Home Services', featured: true },
    { name: 'Plumber', slug: 'plumber', description: 'Plumbing installation and repair services', parent: 'Home Services', featured: true },
    { name: 'Carpenter', slug: 'carpenter', description: 'Woodwork and furniture services', parent: 'Home Services' },
    { name: 'Mason', slug: 'mason', description: 'Construction and masonry work', parent: 'Home Services' },
    { name: 'Painter', slug: 'painter', description: 'Interior and exterior painting services', parent: 'Home Services' },
    { name: 'Welder', slug: 'welder', description: 'Metal welding and fabrication', parent: 'Home Services' },
    { name: 'CCTV Installation', slug: 'cctv-installation', description: 'Security camera installation and setup', parent: 'Home Services' },
    { name: 'Solar Installation', slug: 'solar-installation', description: 'Solar panel installation and maintenance', parent: 'Home Services' },
    
    // CLEANING SERVICES
    { name: 'Cleaning Services', slug: 'cleaning-services', description: 'Professional cleaning services', icon: '🧹', featured: true },
    { name: 'House Cleaning', slug: 'house-cleaning', description: 'Residential cleaning services', parent: 'Cleaning Services' },
    { name: 'Office Cleaning', slug: 'office-cleaning', description: 'Commercial office cleaning', parent: 'Cleaning Services' },
    { name: 'Deep Cleaning', slug: 'deep-cleaning', description: 'Thorough deep cleaning services', parent: 'Cleaning Services' },
    { name: 'Pest Control', slug: 'pest-control', description: 'Pest extermination services', parent: 'Cleaning Services' },
    
    // VEHICLE SERVICES
    { name: 'Vehicle Services', slug: 'vehicle-services', description: 'Vehicle repair and maintenance', icon: '🚗', featured: true },
    { name: 'Car Mechanic', slug: 'car-mechanic', description: 'Car repair and maintenance', parent: 'Vehicle Services', featured: true },
    { name: 'Bike Mechanic', slug: 'bike-mechanic', description: 'Motorcycle repair services', parent: 'Vehicle Services' },
    { name: 'Vehicle Electrical', slug: 'vehicle-electrical', description: 'Auto electrical repairs', parent: 'Vehicle Services' },
    { name: 'Towing', slug: 'towing', description: 'Vehicle towing services', parent: 'Vehicle Services' },
    
    // EDUCATION
    { name: 'Education', slug: 'education', description: 'Tutoring and educational services', icon: '📚', featured: true },
    { name: 'Home Tutor', slug: 'home-tutor', description: 'Private home tutoring', parent: 'Education', featured: true },
    { name: 'Mathematics Tutor', slug: 'mathematics-tutor', description: 'Math tutoring services', parent: 'Education' },
    { name: 'English Tutor', slug: 'english-tutor', description: 'English language tutoring', parent: 'Education' },
    { name: 'Science Tutor', slug: 'science-tutor', description: 'Science subject tutoring', parent: 'Education' },
    
    // BEAUTY
    { name: 'Beauty', slug: 'beauty', description: 'Beauty and personal care services', icon: '💄', featured: true },
    { name: 'Salon', slug: 'salon', description: 'Beauty salon services', parent: 'Beauty' },
    { name: 'Bridal Dressing', slug: 'bridal-dressing', description: 'Bridal makeup and styling', parent: 'Beauty', featured: true },
    
    // IT & DIGITAL
    { name: 'IT & Digital', slug: 'it-digital', description: 'Technology and digital services', icon: '💻', featured: true },
    { name: 'Web Development', slug: 'web-development', description: 'Website development services', parent: 'IT & Digital' },
    { name: 'Graphic Design', slug: 'graphic-design', description: 'Graphic design services', parent: 'IT & Digital' },
  ]

  const createdCategories: { [key: string]: any } = {}
  
  // First pass: Create parent categories
  for (const catData of categoriesData.filter(c => !c.parent)) {
    const cat = await prisma.category.create({
      data: {
        name: catData.name,
        slug: catData.slug,
        description: catData.description,
        icon: catData.icon,
        featured: catData.featured || false,
      }
    })
    createdCategories[catData.name] = cat
    console.log(`Created category: ${cat.name}`)
  }
  
  // Second pass: Create child categories
  for (const catData of categoriesData.filter(c => c.parent)) {
    const parent = createdCategories[catData.parent]
    if (parent) {
      const cat = await prisma.category.create({
        data: {
          name: catData.name,
          slug: catData.slug,
          description: catData.description,
          parentId: parent.id,
          featured: catData.featured || false,
        }
      })
      console.log(`Created subcategory: ${cat.name}`)
    }
  }

  // ==== DEMO USERS & PROVIDERS ====
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  // Admin User
  await prisma.user.create({
    data: {
      email: 'admin@servicehub.lk',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    }
  })
  console.log('Created admin user')

  // Demo Customer
  await prisma.user.create({
    data: {
      email: 'customer@test.lk',
      password: hashedPassword,
      name: 'Test Customer',
      role: 'CUSTOMER',
    }
  })
  console.log('Created demo customer')

