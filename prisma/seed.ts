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

  // ==== DISTRICTS ==== (All 25 Districts)
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
    
    // Northern Province
    { name: 'Jaffna', nameEn: 'Jaffna', code: 'JA', provinceName: 'Northern', latitude: 9.6615, longitude: 80.0255 },
    { name: 'Kilinochchi', nameEn: 'Kilinochchi', code: 'KL', provinceName: 'Northern', latitude: 9.3964, longitude: 80.3981 },
    { name: 'Mannar', nameEn: 'Mannar', code: 'MN', provinceName: 'Northern', latitude: 8.9810, longitude: 79.9044 },
    { name: 'Mullaitivu', nameEn: 'Mullaitivu', code: 'MU', provinceName: 'Northern', latitude: 9.2671, longitude: 80.8142 },
    { name: 'Vavuniya', nameEn: 'Vavuniya', code: 'VA', provinceName: 'Northern', latitude: 8.7542, longitude: 80.4982 },
    
    // Eastern Province
    { name: 'Ampara', nameEn: 'Ampara', code: 'AM', provinceName: 'Eastern', latitude: 7.2916, longitude: 81.6724 },
    { name: 'Batticaloa', nameEn: 'Batticaloa', code: 'BA', provinceName: 'Eastern', latitude: 7.7310, longitude: 81.6924 },
    { name: 'Trincomalee', nameEn: 'Trincomalee', code: 'TR', provinceName: 'Eastern', latitude: 8.5874, longitude: 81.2152 },
    
    // North Western Province
    { name: 'Kurunegala', nameEn: 'Kurunegala', code: 'KU', provinceName: 'North Western', latitude: 7.4867, longitude: 80.3623 },
    { name: 'Puttalam', nameEn: 'Puttalam', code: 'PU', provinceName: 'North Western', latitude: 8.0362, longitude: 79.8283 },
    
    // North Central Province
    { name: 'Anuradhapura', nameEn: 'Anuradhapura', code: 'AN', provinceName: 'North Central', latitude: 8.3114, longitude: 80.4037 },
    { name: 'Polonnaruwa', nameEn: 'Polonnaruwa', code: 'PO', provinceName: 'North Central', latitude: 7.9403, longitude: 81.0188 },
    
    // Uva Province
    { name: 'Badulla', nameEn: 'Badulla', code: 'BD', provinceName: 'Uva', latitude: 6.9934, longitude: 81.0550 },
    { name: 'Monaragala', nameEn: 'Monaragala', code: 'MG', provinceName: 'Uva', latitude: 6.8728, longitude: 81.3507 },
    
    // Sabaragamuwa Province
    { name: 'Ratnapura', nameEn: 'Ratnapura', code: 'RA', provinceName: 'Sabaragamuwa', latitude: 6.7056, longitude: 80.3847 },
    { name: 'Kegalle', nameEn: 'Kegalle', code: 'KE', provinceName: 'Sabaragamuwa', latitude: 7.2513, longitude: 80.3464 },
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

  // ==== CITIES ==== (100+ Major Cities & Towns)
  const citiesData = [
    // Colombo District
    { name: 'Colombo', nameEn: 'Colombo', districtName: 'Colombo', isMajor: true, population: 752993 },
    { name: 'Dehiwala-Mount Lavinia', nameEn: 'Dehiwala-Mount Lavinia', districtName: 'Colombo', isMajor: true, population: 245974 },
    { name: 'Moratuwa', nameEn: 'Moratuwa', districtName: 'Colombo', isMajor: true, population: 185031 },
    { name: 'Sri Jayawardenepura Kotte', nameEn: 'Sri Jayawardenepura Kotte', districtName: 'Colombo', isMajor: true, population: 115826 },
    { name: 'Kolonnawa', nameEn: 'Kolonnawa', districtName: 'Colombo', isMajor: false },
    { name: 'Maharagama', nameEn: 'Maharagama', districtName: 'Colombo', isMajor: false },
    { name: 'Homagama', nameEn: 'Homagama', districtName: 'Colombo', isMajor: false },
    { name: 'Kaduwela', nameEn: 'Kaduwela', districtName: 'Colombo', isMajor: false },
    { name: 'Battaramulla', nameEn: 'Battaramulla', districtName: 'Colombo', isMajor: false },
    { name: 'Nugegoda', nameEn: 'Nugegoda', districtName: 'Colombo', isMajor: false },
    
    // Gampaha District
    { name: 'Negombo', nameEn: 'Negombo', districtName: 'Gampaha', isMajor: true, population: 142136 },
    { name: 'Gampaha', nameEn: 'Gampaha', districtName: 'Gampaha', isMajor: true, population: 84775 },
    { name: 'Katunayake', nameEn: 'Katunayake', districtName: 'Gampaha', isMajor: false },
    { name: 'Wattala', nameEn: 'Wattala', districtName: 'Gampaha', isMajor: false },
    { name: 'Ja-Ela', nameEn: 'Ja-Ela', districtName: 'Gampaha', isMajor: false },
    { name: 'Minuwangoda', nameEn: 'Minuwangoda', districtName: 'Gampaha', isMajor: false },
    { name: 'Kelaniya', nameEn: 'Kelaniya', districtName: 'Gampaha', isMajor: false },
    { name: 'Peliyagoda', nameEn: 'Peliyagoda', districtName: 'Gampaha', isMajor: false },
    { name: 'Veyangoda', nameEn: 'Veyangoda', districtName: 'Gampaha', isMajor: false },
    { name: 'Divulapitiya', nameEn: 'Divulapitiya', districtName: 'Gampaha', isMajor: false },
    
    // Kalutara District
    { name: 'Kalutara', nameEn: 'Kalutara', districtName: 'Kalutara', isMajor: true, population: 43000 },
    { name: 'Panadura', nameEn: 'Panadura', districtName: 'Kalutara', isMajor: false },
    { name: 'Horana', nameEn: 'Horana', districtName: 'Kalutara', isMajor: false },
    { name: 'Beruwala', nameEn: 'Beruwala', districtName: 'Kalutara', isMajor: false },
    { name: 'Bandaragama', nameEn: 'Bandaragama', districtName: 'Kalutara', isMajor: false },
    { name: 'Mathugama', nameEn: 'Mathugama', districtName: 'Kalutara', isMajor: false },
    
    // Kandy District
    { name: 'Kandy', nameEn: 'Kandy', districtName: 'Kandy', isMajor: true, population: 125400 },
    { name: 'Katugastota', nameEn: 'Katugastota', districtName: 'Kandy', isMajor: false },
    { name: 'Gampola', nameEn: 'Gampola', districtName: 'Kandy', isMajor: false },
    { name: 'Kadugannawa', nameEn: 'Kadugannawa', districtName: 'Kandy', isMajor: false },
    { name: 'Peradeniya', nameEn: 'Peradeniya', districtName: 'Kandy', isMajor: false },
    
    // Matale District
    { name: 'Matale', nameEn: 'Matale', districtName: 'Matale', isMajor: true, population: 36462 },
    { name: 'Dambulla', nameEn: 'Dambulla', districtName: 'Matale', isMajor: false },
    { name: 'Ukuwela', nameEn: 'Ukuwela', districtName: 'Matale', isMajor: false },
    
    // Nuwara Eliya District
    { name: 'Nuwara Eliya', nameEn: 'Nuwara Eliya', districtName: 'Nuwara Eliya', isMajor: true, population: 30000 },
    { name: 'Hatton', nameEn: 'Hatton', districtName: 'Nuwara Eliya', isMajor: false },
    { name: 'Talawakele', nameEn: 'Talawakele', districtName: 'Nuwara Eliya', isMajor: false },
    
    // Galle District
    { name: 'Galle', nameEn: 'Galle', districtName: 'Galle', isMajor: true, population: 99478 },
    { name: 'Hikkaduwa', nameEn: 'Hikkaduwa', districtName: 'Galle', isMajor: false },
    { name: 'Ambalangoda', nameEn: 'Ambalangoda', districtName: 'Galle', isMajor: false },
    { name: 'Bentota', nameEn: 'Bentota', districtName: 'Galle', isMajor: false },
    { name: 'Elpitiya', nameEn: 'Elpitiya', districtName: 'Galle', isMajor: false },
    
    // Matara District
    { name: 'Matara', nameEn: 'Matara', districtName: 'Matara', isMajor: true, population: 52996 },
    { name: 'Weligama', nameEn: 'Weligama', districtName: 'Matara', isMajor: false },
    { name: 'Mirissa', nameEn: 'Mirissa', districtName: 'Matara', isMajor: false },
    { name: 'Dikwella', nameEn: 'Dikwella', districtName: 'Matara', isMajor: false },
    
    // Hambantota District
    { name: 'Hambantota', nameEn: 'Hambantota', districtName: 'Hambantota', isMajor: true, population: 20000 },
    { name: 'Tangalle', nameEn: 'Tangalle', districtName: 'Hambantota', isMajor: false },
    { name: 'Tissamaharama', nameEn: 'Tissamaharama', districtName: 'Hambantota', isMajor: false },
    
    // Jaffna District
    { name: 'Jaffna', nameEn: 'Jaffna', districtName: 'Jaffna', isMajor: true, population: 88138 },
    { name: 'Nallur', nameEn: 'Nallur', districtName: 'Jaffna', isMajor: false },
    { name: 'Chavakachcheri', nameEn: 'Chavakachcheri', districtName: 'Jaffna', isMajor: false },
    
    // Kilinochchi District
    { name: 'Kilinochchi', nameEn: 'Kilinochchi', districtName: 'Kilinochchi', isMajor: true },
    
    // Mannar District
    { name: 'Mannar', nameEn: 'Mannar', districtName: 'Mannar', isMajor: true },
    
    // Mullaitivu District
    { name: 'Mullaitivu', nameEn: 'Mullaitivu', districtName: 'Mullaitivu', isMajor: true },
    
    // Vavuniya District
    { name: 'Vavuniya', nameEn: 'Vavuniya', districtName: 'Vavuniya', isMajor: true, population: 16000 },
    
    // Ampara District
    { name: 'Ampara', nameEn: 'Ampara', districtName: 'Ampara', isMajor: true },
    { name: 'Kalmunai', nameEn: 'Kalmunai', districtName: 'Ampara', isMajor: false },
    { name: 'Sainthamaruthu', nameEn: 'Sainthamaruthu', districtName: 'Ampara', isMajor: false },
    
    // Batticaloa District
    { name: 'Batticaloa', nameEn: 'Batticaloa', districtName: 'Batticaloa', isMajor: true, population: 86742 },
    { name: 'Eravur', nameEn: 'Eravur', districtName: 'Batticaloa', isMajor: false },
    
    // Trincomalee District
    { name: 'Trincomalee', nameEn: 'Trincomalee', districtName: 'Trincomalee', isMajor: true, population: 99135 },
    { name: 'Kinniya', nameEn: 'Kinniya', districtName: 'Trincomalee', isMajor: false },
    
    // Kurunegala District
    { name: 'Kurunegala', nameEn: 'Kurunegala', districtName: 'Kurunegala', isMajor: true, population: 31000 },
    { name: 'Kuliyapitiya', nameEn: 'Kuliyapitiya', districtName: 'Kurunegala', isMajor: false },
    { name: 'Narammala', nameEn: 'Narammala', districtName: 'Kurunegala', isMajor: false },
    { name: 'Wariyapola', nameEn: 'Wariyapola', districtName: 'Kurunegala', isMajor: false },
    
    // Puttalam District
    { name: 'Puttalam', nameEn: 'Puttalam', districtName: 'Puttalam', isMajor: true, population: 45661 },
    { name: 'Chilaw', nameEn: 'Chilaw', districtName: 'Puttalam', isMajor: false },
    { name: 'Wennappuwa', nameEn: 'Wennappuwa', districtName: 'Puttalam', isMajor: false },
    
    // Anuradhapura District
    { name: 'Anuradhapura', nameEn: 'Anuradhapura', districtName: 'Anuradhapura', isMajor: true, population: 63208 },
    { name: 'Kekirawa', nameEn: 'Kekirawa', districtName: 'Anuradhapura', isMajor: false },
    { name: 'Medawachchiya', nameEn: 'Medawachchiya', districtName: 'Anuradhapura', isMajor: false },
    
    // Polonnaruwa District
    { name: 'Polonnaruwa', nameEn: 'Polonnaruwa', districtName: 'Polonnaruwa', isMajor: true },
    { name: 'Kaduruwela', nameEn: 'Kaduruwela', districtName: 'Polonnaruwa', isMajor: false },
    
    // Badulla District
    { name: 'Badulla', nameEn: 'Badulla', districtName: 'Badulla', isMajor: true, population: 42230 },
    { name: 'Bandarawela', nameEn: 'Bandarawela', districtName: 'Badulla', isMajor: false },
    { name: 'Ella', nameEn: 'Ella', districtName: 'Badulla', isMajor: false },
    { name: 'Haputale', nameEn: 'Haputale', districtName: 'Badulla', isMajor: false },
    
    // Monaragala District
    { name: 'Monaragala', nameEn: 'Monaragala', districtName: 'Monaragala', isMajor: true },
    { name: 'Wellawaya', nameEn: 'Wellawaya', districtName: 'Monaragala', isMajor: false },
    
    // Ratnapura District
    { name: 'Ratnapura', nameEn: 'Ratnapura', districtName: 'Ratnapura', isMajor: true, population: 52170 },
    { name: 'Embilipitiya', nameEn: 'Embilipitiya', districtName: 'Ratnapura', isMajor: false },
    { name: 'Balangoda', nameEn: 'Balangoda', districtName: 'Ratnapura', isMajor: false },
    
    // Kegalle District
    { name: 'Kegalle', nameEn: 'Kegalle', districtName: 'Kegalle', isMajor: true, population: 34355 },
    { name: 'Mawanella', nameEn: 'Mawanella', districtName: 'Kegalle', isMajor: false },
    { name: 'Warakapola', nameEn: 'Warakapola', districtName: 'Kegalle', isMajor: false },
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

  // ==== CATEGORIES ==== (100+ Complete Categories)
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
    { name: 'Roofing', slug: 'roofing', description: 'Roof repair and installation', parent: 'Home Services' },
    { name: 'Ceiling Works', slug: 'ceiling-works', description: 'Ceiling installation and repair', parent: 'Home Services' },
    { name: 'Glass Works', slug: 'glass-works', description: 'Glass cutting and installation', parent: 'Home Services' },
    { name: 'Aluminium Fabrication', slug: 'aluminium-fabrication', description: 'Aluminium doors, windows and fabrication', parent: 'Home Services' },
    
    // CLEANING SERVICES
    { name: 'Cleaning Services', slug: 'cleaning-services', description: 'Professional cleaning services', icon: '🧹', featured: true },
    { name: 'House Cleaning', slug: 'house-cleaning', description: 'Residential cleaning services', parent: 'Cleaning Services' },
    { name: 'Office Cleaning', slug: 'office-cleaning', description: 'Commercial office cleaning', parent: 'Cleaning Services' },
    { name: 'Deep Cleaning', slug: 'deep-cleaning', description: 'Thorough deep cleaning services', parent: 'Cleaning Services' },
    { name: 'Carpet Cleaning', slug: 'carpet-cleaning', description: 'Professional carpet cleaning', parent: 'Cleaning Services' },
    { name: 'Pest Control', slug: 'pest-control', description: 'Pest extermination services', parent: 'Cleaning Services' },
    
    // VEHICLE SERVICES
    { name: 'Vehicle Services', slug: 'vehicle-services', description: 'Vehicle repair and maintenance', icon: '🚗', featured: true },
    { name: 'Car Mechanic', slug: 'car-mechanic', description: 'Car repair and maintenance', parent: 'Vehicle Services', featured: true },
    { name: 'Bike Mechanic', slug: 'bike-mechanic', description: 'Motorcycle repair services', parent: 'Vehicle Services' },
    { name: 'Vehicle Electrical', slug: 'vehicle-electrical', description: 'Auto electrical repairs', parent: 'Vehicle Services' },
    { name: 'Hybrid Repair', slug: 'hybrid-repair', description: 'Hybrid vehicle specialist', parent: 'Vehicle Services' },
    { name: 'AC Repair', slug: 'ac-repair', description: 'Vehicle AC repair services', parent: 'Vehicle Services' },
    { name: 'Towing', slug: 'towing', description: 'Vehicle towing services', parent: 'Vehicle Services' },
    { name: 'Recovery Service', slug: 'recovery-service', description: 'Vehicle recovery and roadside assistance', parent: 'Vehicle Services' },
    { name: 'Van Hire', slug: 'van-hire', description: 'Van rental services', parent: 'Vehicle Services' },
    { name: 'Lorry Hire', slug: 'lorry-hire', description: 'Lorry rental services', parent: 'Vehicle Services' },
    { name: 'Airport Transfer', slug: 'airport-transfer', description: 'Airport transportation services', parent: 'Vehicle Services' },
    
    // EDUCATION
    { name: 'Education', slug: 'education', description: 'Tutoring and educational services', icon: '📚', featured: true },
    { name: 'Home Tutor', slug: 'home-tutor', description: 'Private home tutoring', parent: 'Education', featured: true },
    { name: 'Online Tutor', slug: 'online-tutor', description: 'Online tutoring services', parent: 'Education' },
    { name: 'Mathematics Tutor', slug: 'mathematics-tutor', description: 'Math tutoring services', parent: 'Education' },
    { name: 'English Tutor', slug: 'english-tutor', description: 'English language tutoring', parent: 'Education' },
    { name: 'Science Tutor', slug: 'science-tutor', description: 'Science subject tutoring', parent: 'Education' },
    { name: 'ICT Tutor', slug: 'ict-tutor', description: 'ICT and computer tutoring', parent: 'Education' },
    { name: 'IELTS Coach', slug: 'ielts-coach', description: 'IELTS exam preparation', parent: 'Education' },
    { name: 'Language Teacher', slug: 'language-teacher', description: 'Foreign language teaching', parent: 'Education' },
    { name: 'Music Teacher', slug: 'music-teacher', description: 'Music lessons and training', parent: 'Education' },
    { name: 'Dance Teacher', slug: 'dance-teacher', description: 'Dance classes and training', parent: 'Education' },
    
    // BEAUTY
    { name: 'Beauty', slug: 'beauty', description: 'Beauty and personal care services', icon: '💄', featured: true },
    { name: 'Salon', slug: 'salon', description: 'Beauty salon services', parent: 'Beauty' },
    { name: 'Makeup Artist', slug: 'makeup-artist', description: 'Professional makeup services', parent: 'Beauty' },
    { name: 'Bridal Dressing', slug: 'bridal-dressing', description: 'Bridal makeup and styling', parent: 'Beauty', featured: true },
    { name: 'Hair Stylist', slug: 'hair-stylist', description: 'Hair styling and treatments', parent: 'Beauty' },
    { name: 'Nail Technician', slug: 'nail-technician', description: 'Nail care and design', parent: 'Beauty' },
    
    // HEALTH & WELLNESS
    { name: 'Health & Wellness', slug: 'health-wellness', description: 'Health and fitness services', icon: '💪', featured: true },
    { name: 'Personal Trainer', slug: 'personal-trainer', description: 'Fitness training services', parent: 'Health & Wellness' },
    { name: 'Yoga Instructor', slug: 'yoga-instructor', description: 'Yoga classes and training', parent: 'Health & Wellness' },
    { name: 'Physiotherapist', slug: 'physiotherapist', description: 'Physical therapy services', parent: 'Health & Wellness' },
    { name: 'Nutritionist', slug: 'nutritionist', description: 'Diet and nutrition consultation', parent: 'Health & Wellness' },
    { name: 'Elder Care', slug: 'elder-care', description: 'Elderly care services', parent: 'Health & Wellness' },
    
    // DOMESTIC HELP
    { name: 'Domestic Help', slug: 'domestic-help', description: 'Household help services', icon: '🏡', featured: true },
    { name: 'House Maid', slug: 'house-maid', description: 'Housekeeping services', parent: 'Domestic Help' },
    { name: 'Babysitter', slug: 'babysitter', description: 'Childcare services', parent: 'Domestic Help' },
    { name: 'Elder Caretaker', slug: 'elder-caretaker', description: 'Elder care and assistance', parent: 'Domestic Help' },
    { name: 'Home Cook', slug: 'home-cook', description: 'Home cooking services', parent: 'Domestic Help' },
    { name: 'Laundry Service', slug: 'laundry-service', description: 'Laundry and ironing services', parent: 'Domestic Help' },
    
    // IT & DIGITAL
    { name: 'IT & Digital', slug: 'it-digital', description: 'Technology and digital services', icon: '💻', featured: true },
    { name: 'Web Development', slug: 'web-development', description: 'Website development services', parent: 'IT & Digital' },
    { name: 'Mobile App Development', slug: 'mobile-app-development', description: 'Mobile application development', parent: 'IT & Digital' },
    { name: 'Cybersecurity', slug: 'cybersecurity', description: 'IT security services', parent: 'IT & Digital' },
    { name: 'SEO Services', slug: 'seo-services', description: 'Search engine optimization', parent: 'IT & Digital' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Online marketing services', parent: 'IT & Digital' },
    { name: 'Graphic Design', slug: 'graphic-design', description: 'Graphic design services', parent: 'IT & Digital' },
    { name: 'Video Editing', slug: 'video-editing', description: 'Professional video editing', parent: 'IT & Digital' },
    { name: 'Photography', slug: 'photography', description: 'Photography services', parent: 'IT & Digital' },
    { name: 'Videography', slug: 'videography', description: 'Video production services', parent: 'IT & Digital' },
    
    // EVENTS
    { name: 'Events', slug: 'events', description: 'Event planning and services', icon: '🎉', featured: true },
    { name: 'Wedding Planner', slug: 'wedding-planner', description: 'Wedding planning and coordination', parent: 'Events' },
    { name: 'Event Planner', slug: 'event-planner', description: 'Event management services', parent: 'Events' },
    { name: 'DJ', slug: 'dj', description: 'DJ and music services', parent: 'Events' },
    { name: 'Catering', slug: 'catering', description: 'Food catering services', parent: 'Events' },
    { name: 'Floral Decoration', slug: 'floral-decoration', description: 'Flower arrangements and decoration', parent: 'Events' },
    { name: 'Tent Rental', slug: 'tent-rental', description: 'Event tent and equipment rental', parent: 'Events' },
    
    // PETS
    { name: 'Pets', slug: 'pets', description: 'Pet care services', icon: '🐾', featured: false },
    { name: 'Pet Grooming', slug: 'pet-grooming', description: 'Pet grooming services', parent: 'Pets' },
    { name: 'Pet Boarding', slug: 'pet-boarding', description: 'Pet boarding and care', parent: 'Pets' },
    { name: 'Dog Training', slug: 'dog-training', description: 'Dog training services', parent: 'Pets' },
    { name: 'Veterinary Home Visit', slug: 'veterinary-home-visit', description: 'Mobile veterinary services', parent: 'Pets' },
    
    // AGRICULTURE
    { name: 'Agriculture', slug: 'agriculture', description: 'Agricultural services', icon: '🌱', featured: false },
    { name: 'Gardening', slug: 'gardening', description: 'Garden maintenance services', parent: 'Agriculture' },
    { name: 'Landscaping', slug: 'landscaping', description: 'Landscape design and maintenance', parent: 'Agriculture' },
    { name: 'Tractor Hire', slug: 'tractor-hire', description: 'Agricultural machinery rental', parent: 'Agriculture' },
    { name: 'Tree Cutting', slug: 'tree-cutting', description: 'Tree removal and trimming', parent: 'Agriculture' },
    
    // RELIGIOUS & CULTURAL
    { name: 'Religious & Cultural', slug: 'religious-cultural', description: 'Religious and cultural services', icon: '🕉️', featured: false },
    { name: 'Astrology', slug: 'astrology', description: 'Astrology consultations', parent: 'Religious & Cultural' },
    { name: 'Funeral Services', slug: 'funeral-services', description: 'Funeral arrangement services', parent: 'Religious & Cultural' },
    { name: 'Traditional Drummers', slug: 'traditional-drummers', description: 'Traditional drumming services', parent: 'Religious & Cultural' },
    { name: 'Temple Decorations', slug: 'temple-decorations', description: 'Religious venue decorations', parent: 'Religious & Cultural' },
    
    // EMERGENCY SERVICES
    { name: 'Emergency Services', slug: 'emergency-services', description: 'Emergency service providers', icon: '🚨', featured: false },
    { name: 'Emergency Electrician', slug: 'emergency-electrician', description: '24/7 electrical emergency services', parent: 'Emergency Services' },
    { name: 'Emergency Plumber', slug: 'emergency-plumber', description: '24/7 plumbing emergency services', parent: 'Emergency Services' },
    { name: 'Lock Opening', slug: 'lock-opening', description: 'Locksmith emergency services', parent: 'Emergency Services' },
    { name: 'Roadside Assistance', slug: 'roadside-assistance', description: 'Vehicle roadside emergency help', parent: 'Emergency Services' },
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
    const parentName = catData.parent
    if (parentName) {
      const parent = createdCategories[parentName]
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
