import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function POST(request: Request) {
  // Verify setup secret to prevent unauthorized access
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.SETUP_SECRET && secret !== "clinic-setup-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if already seeded
    const existingClinic = await prisma.clinic.findFirst();
    if (existingClinic) {
      return NextResponse.json({
        message: "Database already seeded",
        clinic: existingClinic.nameEn,
      });
    }

    console.log("Seeding database via API...");

    // CLINIC
    const clinic = await prisma.clinic.create({
      data: {
        nameEn: "Al-Shifa Medical Center",
        nameAr: "مركز الشفاء الطبي",
        addressEn: "15 Tahrir Street, Downtown, Cairo, Egypt",
        addressAr: "15 شارع التحرير، وسط البلد، القاهرة، مصر",
        phone: "+20-2-2345-6789",
        email: "info@alshifa-medical.com",
        website: "https://alshifa-medical.com",
        licenseNumber: "MOH-EG-2024-001234",
        currency: "EGP",
        taxRate: 14.0,
        invoicePrefix: "INV",
        defaultSlotMins: 30,
        operatingHours: {
          sunday: { open: "09:00", close: "17:00" },
          monday: { open: "09:00", close: "17:00" },
          tuesday: { open: "09:00", close: "17:00" },
          wednesday: { open: "09:00", close: "17:00" },
          thursday: { open: "09:00", close: "17:00" },
          friday: { open: null, close: null },
          saturday: { open: "10:00", close: "14:00" },
        },
      },
    });

    // BRANCH
    const mainBranch = await prisma.branch.create({
      data: {
        clinicId: clinic.id,
        nameEn: "Main Branch - Downtown",
        nameAr: "الفرع الرئيسي - وسط البلد",
        addressEn: "15 Tahrir Street, Downtown, Cairo, Egypt",
        addressAr: "15 شارع التحرير، وسط البلد، القاهرة، مصر",
        phone: "+20-2-2345-6789",
        isMain: true,
        isActive: true,
      },
    });

    // DEPARTMENTS
    const [generalPractice, pediatrics, dermatology] = await Promise.all([
      prisma.department.create({
        data: { clinicId: clinic.id, nameEn: "General Practice", nameAr: "الطب العام" },
      }),
      prisma.department.create({
        data: { clinicId: clinic.id, nameEn: "Pediatrics", nameAr: "طب الأطفال" },
      }),
      prisma.department.create({
        data: { clinicId: clinic.id, nameEn: "Dermatology", nameAr: "الأمراض الجلدية" },
      }),
    ]);

    // USERS
    const adminHash = await hashPassword("Admin123!");
    const defaultHash = await hashPassword("Password123!");

    const admin = await prisma.user.create({
      data: {
        email: "admin@clinic.com", passwordHash: adminHash,
        nameEn: "Ahmed Hassan", nameAr: "أحمد حسن", phone: "+20-10-1234-5678",
        role: "SUPER_ADMIN", clinicId: clinic.id, branchId: mainBranch.id,
        forcePassChange: false, isActive: true,
      },
    });

    const doctorUser = await prisma.user.create({
      data: {
        email: "doctor@clinic.com", passwordHash: defaultHash,
        nameEn: "Dr. Mohamed Ali", nameAr: "د. محمد علي", phone: "+20-10-2345-6789",
        role: "DOCTOR", specialization: "General Practice", qualification: "MBBS, MD",
        licenseNumber: "DOC-EG-2020-0001",
        bio: "Experienced general practitioner with 15 years of clinical experience.",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id,
        forcePassChange: false, isActive: true,
      },
    });

    await prisma.user.create({
      data: {
        email: "nurse@clinic.com", passwordHash: defaultHash,
        nameEn: "Fatima Ibrahim", nameAr: "فاطمة إبراهيم", phone: "+20-10-3456-7890",
        role: "NURSE", qualification: "BSN",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id,
        forcePassChange: false, isActive: true,
      },
    });

    await prisma.user.create({
      data: {
        email: "receptionist@clinic.com", passwordHash: defaultHash,
        nameEn: "Nour El-Din", nameAr: "نور الدين", phone: "+20-10-4567-8901",
        role: "RECEPTIONIST",
        clinicId: clinic.id, branchId: mainBranch.id,
        forcePassChange: false, isActive: true,
      },
    });

    await prisma.user.create({
      data: {
        email: "pharmacist@clinic.com", passwordHash: defaultHash,
        nameEn: "Khaled Mostafa", nameAr: "خالد مصطفى", phone: "+20-10-5678-9012",
        role: "PHARMACIST", qualification: "PharmD",
        clinicId: clinic.id, branchId: mainBranch.id,
        forcePassChange: false, isActive: true,
      },
    });

    await prisma.user.create({
      data: {
        email: "accountant@clinic.com", passwordHash: defaultHash,
        nameEn: "Sara Mahmoud", nameAr: "سارة محمود", phone: "+20-10-6789-0123",
        role: "ACCOUNTANT",
        clinicId: clinic.id, branchId: mainBranch.id,
        forcePassChange: false, isActive: true,
      },
    });

    // Additional doctors
    const drNasser = await prisma.user.create({
      data: {
        email: "dr.nasser@clinic.com", passwordHash: defaultHash,
        nameEn: "Dr. Nasser Al-Rashid", nameAr: "د. ناصر الراشد", phone: "+20-10-7890-1234",
        role: "DOCTOR", specialization: "Pediatrics", qualification: "MBBS, DCH",
        licenseNumber: "DOC-EG-2019-0002",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: pediatrics.id,
        forcePassChange: false, isActive: true,
      },
    });

    const drAmira = await prisma.user.create({
      data: {
        email: "dr.amira@clinic.com", passwordHash: defaultHash,
        nameEn: "Dr. Amira Khalil", nameAr: "د. أميرة خليل", phone: "+20-10-8901-2345",
        role: "DOCTOR", specialization: "Dermatology", qualification: "MBBS, DDV",
        licenseNumber: "DOC-EG-2018-0003",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: dermatology.id,
        forcePassChange: false, isActive: true,
      },
    });

    const drYusuf = await prisma.user.create({
      data: {
        email: "dr.yusuf@clinic.com", passwordHash: defaultHash,
        nameEn: "Dr. Yusuf Karim", nameAr: "د. يوسف كريم", phone: "+20-10-9012-3456",
        role: "DOCTOR", specialization: "Internal Medicine", qualification: "MBBS, MD",
        licenseNumber: "DOC-EG-2017-0004",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id,
        forcePassChange: false, isActive: true,
      },
    });

    const drLayla = await prisma.user.create({
      data: {
        email: "dr.layla@clinic.com", passwordHash: defaultHash,
        nameEn: "Dr. Layla Saeed", nameAr: "د. ليلى سعيد", phone: "+20-10-0123-4567",
        role: "DOCTOR", specialization: "General Practice", qualification: "MBBS",
        licenseNumber: "DOC-EG-2021-0005",
        clinicId: clinic.id, branchId: mainBranch.id, departmentId: generalPractice.id,
        forcePassChange: false, isActive: true,
      },
    });

    const doctors = [doctorUser, drNasser, drAmira, drYusuf, drLayla];

    // DOCTOR SCHEDULES (Sun-Thu)
    for (const doc of doctors) {
      for (let day = 0; day <= 4; day++) {
        await prisma.doctorSchedule.create({
          data: {
            doctorId: doc.id, dayOfWeek: day,
            startTime: "09:00", endTime: "17:00",
            breakStart: "13:00", breakEnd: "14:00",
            slotMinutes: 30, maxPatients: 20, isActive: true,
          },
        });
      }
    }

    // PATIENTS (20)
    const patientNames = [
      { en: "Omar Abdel-Rahman", ar: "عمر عبد الرحمن" },
      { en: "Yasmin El-Sayed", ar: "ياسمين السيد" },
      { en: "Hassan Farouk", ar: "حسن فاروق" },
      { en: "Mona Ismail", ar: "منى إسماعيل" },
      { en: "Tarek Gamal", ar: "طارق جمال" },
      { en: "Dina Khalil", ar: "دينا خليل" },
      { en: "Mahmoud Samir", ar: "محمود سمير" },
      { en: "Rania Adel", ar: "رانيا عادل" },
      { en: "Ayman Hossam", ar: "أيمن حسام" },
      { en: "Heba Nabil", ar: "هبة نبيل" },
      { en: "Sherif Magdy", ar: "شريف مجدي" },
      { en: "Nadia Fathy", ar: "نادية فتحي" },
      { en: "Walid Ashraf", ar: "وليد أشرف" },
      { en: "Amira Tawfik", ar: "أميرة توفيق" },
      { en: "Karim Zaki", ar: "كريم زكي" },
      { en: "Salma Reda", ar: "سلمى رضا" },
      { en: "Mostafa Helmy", ar: "مصطفى حلمي" },
      { en: "Noha Bahaa", ar: "نهى بهاء" },
      { en: "Ibrahim Fouad", ar: "إبراهيم فؤاد" },
      { en: "Laila Mansour", ar: "ليلى منصور" },
    ];

    const patients = [];
    for (let i = 0; i < patientNames.length; i++) {
      const p = patientNames[i];
      const dob = new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28));
      const patient = await prisma.patient.create({
        data: {
          patientId: `CL-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}01-${String(i + 1).padStart(4, "0")}`,
          clinicId: clinic.id,
          nameEn: p.en, nameAr: p.ar,
          nationalId: `2${String(70 + i).padStart(2, "0")}0${String(1 + (i % 12)).padStart(2, "0")}01${String(10000 + i * 111).padStart(5, "0")}${i % 2}`,
          dateOfBirth: dob,
          gender: i % 2 === 0 ? "MALE" : "FEMALE",
          bloodType: (["A_POS", "B_POS", "O_POS", "AB_POS", "A_NEG", "O_NEG"] as const)[i % 6],
          phonePrimary: `+20-10-${String(1000 + i * 100).padStart(4, "0")}-${String(5000 + i * 50).padStart(4, "0")}`,
          nationality: "Egyptian",
          status: "ACTIVE",
          allergies: i % 4 === 0 ? "Penicillin" : i % 4 === 1 ? "None known" : null,
          chronicConditions: i % 5 === 0 ? "Hypertension" : i % 5 === 1 ? "Type 2 Diabetes" : null,
        },
      });
      patients.push(patient);
    }

    // APPOINTMENTS (30)
    const appointmentTypes = ["NEW_VISIT", "FOLLOW_UP", "CONSULTATION", "PROCEDURE", "EMERGENCY"] as const;
    const appointmentStatuses = ["SCHEDULED", "CONFIRMED", "COMPLETED", "NO_SHOW", "CANCELLED"] as const;
    const appointments = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 15 + i);
      const hour = 9 + (i % 8);
      const doc = doctors[i % doctors.length];
      const pat = patients[i % patients.length];
      const status = i < 15 ? appointmentStatuses[2] : i < 25 ? appointmentStatuses[Math.floor(Math.random() * 2)] : appointmentStatuses[0];

      const appt = await prisma.appointment.create({
        data: {
          patientId: pat.id, doctorId: doc.id, branchId: mainBranch.id,
          date, startTime: `${String(hour).padStart(2, "0")}:00`,
          endTime: `${String(hour).padStart(2, "0")}:30`,
          type: appointmentTypes[i % 5], status,
          createdById: admin.id,
        },
      });
      appointments.push(appt);
    }

    // CONSULTATIONS (10, for completed appointments)
    const completedAppts = appointments.filter((a) => a.status === "COMPLETED").slice(0, 10);
    for (let i = 0; i < completedAppts.length; i++) {
      const appt = completedAppts[i];
      await prisma.consultation.create({
        data: {
          appointmentId: appt.id, patientId: appt.patientId, doctorId: appt.doctorId,
          status: "COMPLETED",
          bloodPressureSys: 110 + Math.floor(Math.random() * 30),
          bloodPressureDia: 70 + Math.floor(Math.random() * 20),
          heartRate: 60 + Math.floor(Math.random() * 30),
          temperature: 36.5 + Math.random() * 1.5,
          weightKg: 55 + Math.random() * 40,
          heightCm: 155 + Math.random() * 35,
          spo2: 95 + Math.floor(Math.random() * 5),
          chiefComplaint: ["Headache and fatigue", "Follow-up for hypertension", "Skin rash", "Fever and cough", "Joint pain"][i % 5],
          diagnosisPrimary: ["Tension headache", "Essential hypertension", "Contact dermatitis", "Upper respiratory infection", "Osteoarthritis"][i % 5],
          soapSubjective: "Patient presents with the above complaints.",
          soapObjective: "Vitals within normal range. Physical exam unremarkable.",
          soapAssessment: "Stable condition.",
          soapPlan: "Continue current medications. Follow up in 2 weeks.",
          startedAt: appt.date, completedAt: appt.date,
        },
      });
    }

    // SERVICES (10)
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

    for (const svc of services) {
      await prisma.service.create({
        data: {
          clinicId: clinic.id, departmentId: svc.dept,
          nameEn: svc.en, nameAr: svc.ar, price: svc.price,
        },
      });
    }

    // LAB TESTS (10)
    const labTests = [
      { en: "Complete Blood Count", ar: "صورة دم كاملة", cat: "Hematology", price: 80 },
      { en: "Blood Glucose (Fasting)", ar: "سكر الدم صائم", cat: "Biochemistry", price: 50, min: 70, max: 100, unit: "mg/dL" },
      { en: "HbA1c", ar: "السكر التراكمي", cat: "Biochemistry", price: 150, min: 4, max: 5.6, unit: "%" },
      { en: "Lipid Profile", ar: "دهون الدم", cat: "Biochemistry", price: 200 },
      { en: "Liver Function Test", ar: "وظائف الكبد", cat: "Biochemistry", price: 180 },
      { en: "Kidney Function Test", ar: "وظائف الكلى", cat: "Biochemistry", price: 160 },
      { en: "Thyroid Function Test", ar: "وظائف الغدة الدرقية", cat: "Endocrinology", price: 250 },
      { en: "Urine Analysis", ar: "تحليل بول", cat: "Microbiology", price: 40 },
      { en: "CRP (C-Reactive Protein)", ar: "بروتين سي التفاعلي", cat: "Immunology", price: 120 },
      { en: "Vitamin D", ar: "فيتامين د", cat: "Biochemistry", price: 200, min: 30, max: 100, unit: "ng/mL" },
    ];

    for (const lt of labTests) {
      await prisma.labTest.create({
        data: {
          nameEn: lt.en, nameAr: lt.ar, category: lt.cat, price: lt.price,
          normalMin: (lt as Record<string, unknown>).min as number | undefined,
          normalMax: (lt as Record<string, unknown>).max as number | undefined,
          unit: (lt as Record<string, unknown>).unit as string | undefined,
        },
      });
    }

    // CLINIC SETTINGS
    const settings = [
      { key: "appointment.defaultDuration", value: "30" },
      { key: "appointment.maxAdvanceDays", value: "30" },
      { key: "billing.taxRate", value: "14" },
      { key: "billing.currency", value: "EGP" },
      { key: "notification.appointmentReminder", value: "true" },
    ];

    for (const s of settings) {
      await prisma.clinicSetting.create({
        data: { clinicId: clinic.id, key: s.key, value: s.value },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      data: {
        clinic: clinic.nameEn,
        branch: mainBranch.nameEn,
        departments: 3,
        users: 11,
        patients: patients.length,
        appointments: appointments.length,
        consultations: completedAppts.length,
        services: services.length,
        labTests: labTests.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clinicCount = await prisma.clinic.count();
    const userCount = await prisma.user.count();
    const patientCount = await prisma.patient.count();

    return NextResponse.json({
      seeded: clinicCount > 0,
      counts: { clinics: clinicCount, users: userCount, patients: patientCount },
      seedUrl: "POST /api/setup?secret=clinic-setup-2026",
    });
  } catch {
    return NextResponse.json({
      seeded: false,
      error: "Database not connected",
      hint: "Add DATABASE_URL environment variable in Vercel project settings",
    });
  }
}
