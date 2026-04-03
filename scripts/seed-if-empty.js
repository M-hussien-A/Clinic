// Build-time seed script: only seeds if database is empty
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

async function main() {
  try {
    const count = await prisma.clinic.count();
    if (count > 0) {
      console.log("Database already seeded, skipping.");
      return;
    }
  } catch (e) {
    console.log("Cannot connect to database or tables missing, skipping seed:", e.message);
    return;
  }

  console.log("Seeding database...");

  const clinic = await prisma.clinic.create({
    data: {
      nameEn: "Al-Shifa Medical Center", nameAr: "مركز الشفاء الطبي",
      addressEn: "15 Tahrir Street, Downtown, Cairo, Egypt",
      addressAr: "15 شارع التحرير، وسط البلد، القاهرة، مصر",
      phone: "+20-2-2345-6789", email: "info@alshifa-medical.com",
      website: "https://alshifa-medical.com", licenseNumber: "MOH-EG-2024-001234",
      currency: "EGP", taxRate: 14.0, invoicePrefix: "INV", defaultSlotMins: 30,
      operatingHours: {
        sunday: { open: "09:00", close: "17:00" }, monday: { open: "09:00", close: "17:00" },
        tuesday: { open: "09:00", close: "17:00" }, wednesday: { open: "09:00", close: "17:00" },
        thursday: { open: "09:00", close: "17:00" }, friday: { open: null, close: null },
        saturday: { open: "10:00", close: "14:00" },
      },
    },
  });

  const mainBranch = await prisma.branch.create({
    data: {
      clinicId: clinic.id, nameEn: "Main Branch - Downtown", nameAr: "الفرع الرئيسي - وسط البلد",
      addressEn: "15 Tahrir Street, Downtown, Cairo, Egypt",
      addressAr: "15 شارع التحرير، وسط البلد، القاهرة، مصر",
      phone: "+20-2-2345-6789", isMain: true, isActive: true,
    },
  });

  const [generalPractice, pediatrics, dermatology] = await Promise.all([
    prisma.department.create({ data: { clinicId: clinic.id, nameEn: "General Practice", nameAr: "الطب العام" } }),
    prisma.department.create({ data: { clinicId: clinic.id, nameEn: "Pediatrics", nameAr: "طب الأطفال" } }),
    prisma.department.create({ data: { clinicId: clinic.id, nameEn: "Dermatology", nameAr: "الأمراض الجلدية" } }),
  ]);

  const adminHash = await hashPassword("Admin123!");
  const defaultHash = await hashPassword("Password123!");

  const admin = await prisma.user.create({
    data: { email: "admin@clinic.com", passwordHash: adminHash, nameEn: "Ahmed Hassan", nameAr: "أحمد حسن", phone: "+20-10-1234-5678", role: "SUPER_ADMIN", clinicId: clinic.id, branchId: mainBranch.id, forcePassChange: false, isActive: true },
  });

  const doctorUser = await prisma.user.create({
    data: { email: "doctor@clinic.com", passwordHash: defaultHash, nameEn: "Dr. Mohamed Ali", nameAr: "د. محمد علي", phone: "+20-10-2345-6789", role: "DOCTOR", specialization: "General Practice", qualification: "MBBS, MD", licenseNumber: "DOC-EG-2020-0001", bio: "Experienced general practitioner.", clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id, forcePassChange: false, isActive: true },
  });

  await prisma.user.create({ data: { email: "nurse@clinic.com", passwordHash: defaultHash, nameEn: "Fatima Ibrahim", nameAr: "فاطمة إبراهيم", phone: "+20-10-3456-7890", role: "NURSE", qualification: "BSN", clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id, forcePassChange: false, isActive: true } });
  await prisma.user.create({ data: { email: "receptionist@clinic.com", passwordHash: defaultHash, nameEn: "Nour El-Din", nameAr: "نور الدين", phone: "+20-10-4567-8901", role: "RECEPTIONIST", clinicId: clinic.id, branchId: mainBranch.id, forcePassChange: false, isActive: true } });
  await prisma.user.create({ data: { email: "pharmacist@clinic.com", passwordHash: defaultHash, nameEn: "Khaled Mostafa", nameAr: "خالد مصطفى", phone: "+20-10-5678-9012", role: "PHARMACIST", qualification: "PharmD", clinicId: clinic.id, branchId: mainBranch.id, forcePassChange: false, isActive: true } });
  await prisma.user.create({ data: { email: "accountant@clinic.com", passwordHash: defaultHash, nameEn: "Sara Mahmoud", nameAr: "سارة محمود", phone: "+20-10-6789-0123", role: "ACCOUNTANT", clinicId: clinic.id, branchId: mainBranch.id, forcePassChange: false, isActive: true } });
  await prisma.user.create({ data: { email: "manager@clinic.com", passwordHash: defaultHash, nameEn: "Youssef Kamal", nameAr: "يوسف كمال", phone: "+20-10-7890-1234", role: "CLINIC_ADMIN", clinicId: clinic.id, branchId: mainBranch.id, forcePassChange: false, isActive: true } });

  const drNasser = await prisma.user.create({ data: { email: "dr.nasser@clinic.com", passwordHash: defaultHash, nameEn: "Dr. Nasser Al-Rashid", nameAr: "د. ناصر الراشد", phone: "+20-10-7890-1234", role: "DOCTOR", specialization: "Pediatrics", qualification: "MBBS, DCH", licenseNumber: "DOC-EG-2019-0002", clinicId: clinic.id, branchId: mainBranch.id, departmentId: pediatrics.id, forcePassChange: false, isActive: true } });
  const drAmira = await prisma.user.create({ data: { email: "dr.amira@clinic.com", passwordHash: defaultHash, nameEn: "Dr. Amira Khalil", nameAr: "د. أميرة خليل", phone: "+20-10-8901-2345", role: "DOCTOR", specialization: "Dermatology", qualification: "MBBS, DDV", licenseNumber: "DOC-EG-2018-0003", clinicId: clinic.id, branchId: mainBranch.id, departmentId: dermatology.id, forcePassChange: false, isActive: true } });
  const drYusuf = await prisma.user.create({ data: { email: "dr.yusuf@clinic.com", passwordHash: defaultHash, nameEn: "Dr. Yusuf Karim", nameAr: "د. يوسف كريم", phone: "+20-10-9012-3456", role: "DOCTOR", specialization: "Internal Medicine", qualification: "MBBS, MD", licenseNumber: "DOC-EG-2017-0004", clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id, forcePassChange: false, isActive: true } });
  const drLayla = await prisma.user.create({ data: { email: "dr.layla@clinic.com", passwordHash: defaultHash, nameEn: "Dr. Layla Saeed", nameAr: "د. ليلى سعيد", phone: "+20-10-0123-4567", role: "DOCTOR", specialization: "General Practice", qualification: "MBBS", licenseNumber: "DOC-EG-2021-0005", clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id, forcePassChange: false, isActive: true } });

  const doctors = [doctorUser, drNasser, drAmira, drYusuf, drLayla];

  // Doctor schedules (Sun-Thu)
  for (const doc of doctors) {
    for (let day = 0; day <= 4; day++) {
      await prisma.doctorSchedule.create({ data: { doctorId: doc.id, dayOfWeek: day, startTime: "09:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00", slotMinutes: 30, maxPatients: 20, isActive: true } });
    }
  }

  // 20 patients
  const patientNames = [
    { en: "Omar Abdel-Rahman", ar: "عمر عبد الرحمن" }, { en: "Yasmin El-Sayed", ar: "ياسمين السيد" },
    { en: "Hassan Farouk", ar: "حسن فاروق" }, { en: "Mona Ismail", ar: "منى إسماعيل" },
    { en: "Tarek Gamal", ar: "طارق جمال" }, { en: "Dina Khalil", ar: "دينا خليل" },
    { en: "Mahmoud Samir", ar: "محمود سمير" }, { en: "Rania Adel", ar: "رانيا عادل" },
    { en: "Ayman Hossam", ar: "أيمن حسام" }, { en: "Heba Nabil", ar: "هبة نبيل" },
    { en: "Sherif Magdy", ar: "شريف مجدي" }, { en: "Nadia Fathy", ar: "نادية فتحي" },
    { en: "Walid Ashraf", ar: "وليد أشرف" }, { en: "Amira Tawfik", ar: "أميرة توفيق" },
    { en: "Karim Zaki", ar: "كريم زكي" }, { en: "Salma Reda", ar: "سلمى رضا" },
    { en: "Mostafa Helmy", ar: "مصطفى حلمي" }, { en: "Noha Bahaa", ar: "نهى بهاء" },
    { en: "Ibrahim Fouad", ar: "إبراهيم فؤاد" }, { en: "Laila Mansour", ar: "ليلى منصور" },
  ];

  const bloodTypes = ["A_POS", "B_POS", "O_POS", "AB_POS", "A_NEG", "O_NEG"];
  const patients = [];
  for (let i = 0; i < patientNames.length; i++) {
    const p = patientNames[i];
    const patient = await prisma.patient.create({
      data: {
        patientId: `PAT-${String(i + 1).padStart(5, "0")}`, clinicId: clinic.id,
        nameEn: p.en, nameAr: p.ar,
        dateOfBirth: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)),
        gender: i % 2 === 0 ? "MALE" : "FEMALE", bloodType: bloodTypes[i % 6],
        phonePrimary: `+20-10-${String(1000 + i * 100).padStart(4, "0")}-${String(5000 + i * 50).padStart(4, "0")}`,
        nationality: "Egyptian", status: "ACTIVE",
        allergies: i % 4 === 0 ? "Penicillin" : null,
        chronicConditions: i % 5 === 0 ? "Hypertension" : null,
      },
    });
    patients.push(patient);
  }

  // 30 appointments
  const types = ["NEW_VISIT", "FOLLOW_UP", "CONSULTATION", "PROCEDURE", "EMERGENCY"];
  const appointments = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(); date.setDate(date.getDate() - 15 + i);
    const hour = 9 + (i % 8);
    const status = i < 15 ? "COMPLETED" : i < 25 ? "CONFIRMED" : "SCHEDULED";
    const appt = await prisma.appointment.create({
      data: {
        patientId: patients[i % patients.length].id, doctorId: doctors[i % doctors.length].id,
        branchId: mainBranch.id, date, startTime: `${String(hour).padStart(2, "0")}:00`,
        endTime: `${String(hour).padStart(2, "0")}:30`, type: types[i % 5], status, createdById: admin.id,
      },
    });
    appointments.push(appt);
  }

  // 10 consultations
  const completed = appointments.filter((a) => a.status === "COMPLETED").slice(0, 10);
  const complaints = ["Headache and fatigue", "Follow-up for hypertension", "Skin rash", "Fever and cough", "Joint pain"];
  const diagnoses = ["Tension headache", "Essential hypertension", "Contact dermatitis", "Upper respiratory infection", "Osteoarthritis"];
  for (let i = 0; i < completed.length; i++) {
    const a = completed[i];
    await prisma.consultation.create({
      data: {
        appointmentId: a.id, patientId: a.patientId, doctorId: a.doctorId, status: "COMPLETED",
        bloodPressureSys: 110 + Math.floor(Math.random() * 30), bloodPressureDia: 70 + Math.floor(Math.random() * 20),
        heartRate: 60 + Math.floor(Math.random() * 30), temperature: 36.5 + Math.random() * 1.5,
        weightKg: 55 + Math.random() * 40, heightCm: 155 + Math.random() * 35, spo2: 95 + Math.floor(Math.random() * 5),
        chiefComplaint: complaints[i % 5], diagnosisPrimary: diagnoses[i % 5],
        soapSubjective: "Patient presents with the above complaints.",
        soapObjective: "Vitals within normal range.", soapAssessment: "Stable condition.",
        soapPlan: "Continue current medications. Follow up in 2 weeks.", startedAt: a.date, completedAt: a.date,
      },
    });
  }

  // 10 services
  const services = [
    { en: "General Consultation", ar: "استشارة عامة", price: 250, dept: generalPractice.id },
    { en: "Pediatric Consultation", ar: "استشارة أطفال", price: 300, dept: pediatrics.id },
    { en: "Dermatology Consultation", ar: "استشارة جلدية", price: 350, dept: dermatology.id },
    { en: "Follow-up Visit", ar: "زيارة متابعة", price: 150, dept: null },
    { en: "ECG", ar: "تخطيط قلب", price: 200, dept: null },
    { en: "Blood Pressure Monitoring", ar: "مراقبة ضغط الدم", price: 50, dept: null },
    { en: "Wound Dressing", ar: "تضميد جروح", price: 100, dept: null },
    { en: "Injection Administration", ar: "إعطاء حقن", price: 75, dept: null },
    { en: "Vaccination", ar: "تطعيم", price: 200, dept: pediatrics.id },
    { en: "Minor Surgery", ar: "جراحة صغرى", price: 500, dept: null },
  ];
  for (const s of services) {
    await prisma.service.create({ data: { clinicId: clinic.id, departmentId: s.dept, nameEn: s.en, nameAr: s.ar, price: s.price } });
  }

  // 10 lab tests
  const labTests = [
    { en: "Complete Blood Count", ar: "صورة دم كاملة", cat: "Hematology", price: 80 },
    { en: "Blood Glucose (Fasting)", ar: "سكر الدم صائم", cat: "Biochemistry", price: 50 },
    { en: "HbA1c", ar: "السكر التراكمي", cat: "Biochemistry", price: 150 },
    { en: "Lipid Profile", ar: "دهون الدم", cat: "Biochemistry", price: 200 },
    { en: "Liver Function Test", ar: "وظائف الكبد", cat: "Biochemistry", price: 180 },
    { en: "Kidney Function Test", ar: "وظائف الكلى", cat: "Biochemistry", price: 160 },
    { en: "Thyroid Function Test", ar: "وظائف الغدة الدرقية", cat: "Endocrinology", price: 250 },
    { en: "Urine Analysis", ar: "تحليل بول", cat: "Microbiology", price: 40 },
    { en: "CRP", ar: "بروتين سي التفاعلي", cat: "Immunology", price: 120 },
    { en: "Vitamin D", ar: "فيتامين د", cat: "Biochemistry", price: 200 },
  ];
  for (const t of labTests) {
    await prisma.labTest.create({ data: { nameEn: t.en, nameAr: t.ar, category: t.cat, price: t.price } });
  }

  // Clinic settings
  for (const s of [
    { key: "appointment.defaultDuration", value: "30" },
    { key: "appointment.maxAdvanceDays", value: "30" },
    { key: "billing.taxRate", value: "14" },
    { key: "billing.currency", value: "EGP" },
    { key: "notification.appointmentReminder", value: "true" },
  ]) {
    await prisma.clinicSetting.create({ data: { clinicId: clinic.id, key: s.key, value: s.value } });
  }

  console.log("Database seeded: 1 clinic, 1 branch, 3 departments, 12 users, 20 patients, 30 appointments, 10 consultations, 10 services, 10 lab tests");
}

main()
  .catch((e) => { console.error("Seed error:", e.message); process.exit(0); }) // exit 0 so build continues
  .finally(() => prisma.$disconnect());
