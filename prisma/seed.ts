const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  console.log('Seeding database...');

  // ===========================
  // CLINIC
  // ===========================
  const clinic = await prisma.clinic.create({
    data: {
      nameEn: 'Al-Shifa Medical Center',
      nameAr: 'مركز الشفاء الطبي',
      addressEn: '15 Tahrir Street, Downtown, Cairo, Egypt',
      addressAr: '15 شارع التحرير، وسط البلد، القاهرة، مصر',
      phone: '+20-2-2345-6789',
      email: 'info@alshifa-medical.com',
      website: 'https://alshifa-medical.com',
      licenseNumber: 'MOH-EG-2024-001234',
      currency: 'EGP',
      taxRate: 14.0,
      invoicePrefix: 'INV',
      defaultSlotMins: 30,
      operatingHours: {
        sunday: { open: '09:00', close: '17:00' },
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: null, close: null },
        saturday: { open: '10:00', close: '14:00' },
      },
    },
  });

  console.log('Created clinic:', clinic.nameEn);

  // ===========================
  // BRANCH
  // ===========================
  const mainBranch = await prisma.branch.create({
    data: {
      clinicId: clinic.id,
      nameEn: 'Main Branch - Downtown',
      nameAr: 'الفرع الرئيسي - وسط البلد',
      addressEn: '15 Tahrir Street, Downtown, Cairo, Egypt',
      addressAr: '15 شارع التحرير، وسط البلد، القاهرة، مصر',
      phone: '+20-2-2345-6789',
      isMain: true,
      isActive: true,
    },
  });

  console.log('Created branch:', mainBranch.nameEn);

  // ===========================
  // DEPARTMENTS
  // ===========================
  const [generalPractice, pediatrics, dermatology] = await Promise.all([
    prisma.department.create({
      data: {
        clinicId: clinic.id,
        nameEn: 'General Practice',
        nameAr: 'الطب العام',
      },
    }),
    prisma.department.create({
      data: {
        clinicId: clinic.id,
        nameEn: 'Pediatrics',
        nameAr: 'طب الأطفال',
      },
    }),
    prisma.department.create({
      data: {
        clinicId: clinic.id,
        nameEn: 'Dermatology',
        nameAr: 'الأمراض الجلدية',
      },
    }),
  ]);

  console.log('Created 3 departments');

  // ===========================
  // USERS (7 role-based + 5 doctors)
  // ===========================
  const adminHash = await hashPassword('Admin123!');
  const defaultHash = await hashPassword('Password123!');

  // Super Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@clinic.com',
      passwordHash: adminHash,
      nameEn: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      phone: '+20-10-1234-5678',
      role: 'SUPER_ADMIN',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Doctor (role-based user)
  const doctorUser = await prisma.user.create({
    data: {
      email: 'doctor@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Dr. Mohamed Ali',
      nameAr: 'د. محمد علي',
      phone: '+20-10-2345-6789',
      role: 'DOCTOR',
      specialization: 'General Practice',
      qualification: 'MBBS, MD',
      licenseNumber: 'DOC-EG-2020-0001',
      bio: 'Experienced general practitioner with 15 years of clinical experience.',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: generalPractice.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Nurse
  const nurse = await prisma.user.create({
    data: {
      email: 'nurse@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Fatima Ibrahim',
      nameAr: 'فاطمة إبراهيم',
      phone: '+20-10-3456-7890',
      role: 'NURSE',
      qualification: 'BSN',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: generalPractice.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Receptionist
  const receptionist = await prisma.user.create({
    data: {
      email: 'receptionist@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Nour El-Din',
      nameAr: 'نور الدين',
      phone: '+20-10-4567-8901',
      role: 'RECEPTIONIST',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Pharmacist
  const pharmacist = await prisma.user.create({
    data: {
      email: 'pharmacist@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Khaled Mostafa',
      nameAr: 'خالد مصطفى',
      phone: '+20-10-5678-9012',
      role: 'PHARMACIST',
      qualification: 'PharmD',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Accountant
  const accountant = await prisma.user.create({
    data: {
      email: 'accountant@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Sara Mahmoud',
      nameAr: 'سارة محمود',
      phone: '+20-10-6789-0123',
      role: 'ACCOUNTANT',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  // Clinic Admin
  const manager = await prisma.user.create({
    data: {
      email: 'manager@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Youssef Kamal',
      nameAr: 'يوسف كمال',
      phone: '+20-10-7890-1234',
      role: 'CLINIC_ADMIN',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  console.log('Created 7 role-based users');

  // Additional doctors (4 more to make 5 total with doctorUser)
  const doctor2 = await prisma.user.create({
    data: {
      email: 'dr.layla@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Dr. Layla Abdel-Fattah',
      nameAr: 'د. ليلى عبد الفتاح',
      phone: '+20-11-1111-2222',
      role: 'DOCTOR',
      specialization: 'Pediatrics',
      qualification: 'MBBS, DCH',
      licenseNumber: 'DOC-EG-2019-0042',
      bio: 'Pediatric specialist dedicated to child health and wellness.',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: pediatrics.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  const doctor3 = await prisma.user.create({
    data: {
      email: 'dr.omar@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Dr. Omar Farouk',
      nameAr: 'د. عمر فاروق',
      phone: '+20-11-3333-4444',
      role: 'DOCTOR',
      specialization: 'Dermatology',
      qualification: 'MBBS, DVD',
      licenseNumber: 'DOC-EG-2018-0078',
      bio: 'Board-certified dermatologist specializing in clinical and cosmetic dermatology.',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: dermatology.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  const doctor4 = await prisma.user.create({
    data: {
      email: 'dr.hana@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Dr. Hana Saleh',
      nameAr: 'د. هنا صالح',
      phone: '+20-11-5555-6666',
      role: 'DOCTOR',
      specialization: 'General Practice',
      qualification: 'MBBS, MRCGP',
      licenseNumber: 'DOC-EG-2021-0015',
      bio: 'Family medicine physician with a holistic approach to patient care.',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: generalPractice.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  const doctor5 = await prisma.user.create({
    data: {
      email: 'dr.tarek@clinic.com',
      passwordHash: defaultHash,
      nameEn: 'Dr. Tarek Nabil',
      nameAr: 'د. طارق نبيل',
      phone: '+20-11-7777-8888',
      role: 'DOCTOR',
      specialization: 'Pediatrics',
      qualification: 'MBBS, MD Pediatrics',
      licenseNumber: 'DOC-EG-2017-0099',
      bio: 'Senior pediatrician with expertise in neonatal and adolescent care.',
      clinicId: clinic.id,
      branchId: mainBranch.id,
      departmentId: pediatrics.id,
      forcePassChange: false,
      isActive: true,
    },
  });

  const allDoctors = [doctorUser, doctor2, doctor3, doctor4, doctor5];
  console.log('Created 5 doctors total');

  // ===========================
  // DOCTOR SCHEDULES (Sun-Thu, 9am-5pm)
  // ===========================
  const scheduleDays = [0, 1, 2, 3, 4]; // Sunday=0 through Thursday=4
  for (const doctor of allDoctors) {
    for (const day of scheduleDays) {
      await prisma.doctorSchedule.create({
        data: {
          doctorId: doctor.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '17:00',
          breakStart: '13:00',
          breakEnd: '14:00',
          slotMinutes: 30,
          maxPatients: 16,
          isActive: true,
        },
      });
    }
  }

  console.log('Created schedules for 5 doctors (Sun-Thu)');

  // ===========================
  // PATIENTS (20)
  // ===========================
  const patientData = [
    { nameEn: 'Amira Hassan', nameAr: 'أميرة حسن', gender: 'FEMALE', dob: '1985-03-15', blood: 'A_POS', phone: '+20-10-1001-0001', nationality: 'Egyptian', occupation: 'Teacher', marital: 'Married', allergies: 'Penicillin', chronic: null, insurance: 'MetLife Egypt', policy: 'ML-2024-00101' },
    { nameEn: 'Mahmoud Sayed', nameAr: 'محمود سيد', gender: 'MALE', dob: '1972-07-22', blood: 'O_POS', phone: '+20-10-1001-0002', nationality: 'Egyptian', occupation: 'Engineer', marital: 'Married', allergies: null, chronic: 'Hypertension', insurance: 'AXA Egypt', policy: 'AX-2024-00202' },
    { nameEn: 'Yasmin Tawfik', nameAr: 'ياسمين توفيق', gender: 'FEMALE', dob: '1990-11-08', blood: 'B_POS', phone: '+20-10-1001-0003', nationality: 'Egyptian', occupation: 'Pharmacist', marital: 'Single', allergies: 'Sulfa drugs', chronic: null, insurance: null, policy: null },
    { nameEn: 'Omar Sherif', nameAr: 'عمر شريف', gender: 'MALE', dob: '1968-01-30', blood: 'AB_POS', phone: '+20-10-1001-0004', nationality: 'Egyptian', occupation: 'Retired', marital: 'Married', allergies: null, chronic: 'Diabetes Type 2, Hypertension', insurance: 'Bupa Egypt', policy: 'BP-2024-00303' },
    { nameEn: 'Mariam Fathy', nameAr: 'مريم فتحي', gender: 'FEMALE', dob: '1995-05-20', blood: 'O_NEG', phone: '+20-10-1001-0005', nationality: 'Egyptian', occupation: 'Accountant', marital: 'Single', allergies: 'Ibuprofen', chronic: 'Asthma', insurance: 'MetLife Egypt', policy: 'ML-2024-00404' },
    { nameEn: 'Hassan El-Masry', nameAr: 'حسن المصري', gender: 'MALE', dob: '1980-09-12', blood: 'A_NEG', phone: '+20-10-1001-0006', nationality: 'Egyptian', occupation: 'Lawyer', marital: 'Married', allergies: null, chronic: null, insurance: null, policy: null },
    { nameEn: 'Dina Raouf', nameAr: 'دينا رؤوف', gender: 'FEMALE', dob: '1988-12-03', blood: 'B_NEG', phone: '+20-10-1001-0007', nationality: 'Egyptian', occupation: 'Designer', marital: 'Married', allergies: 'Latex', chronic: null, insurance: 'AXA Egypt', policy: 'AX-2024-00505' },
    { nameEn: 'Ali Abdel-Rahman', nameAr: 'علي عبد الرحمن', gender: 'MALE', dob: '1975-04-18', blood: 'O_POS', phone: '+20-10-1001-0008', nationality: 'Egyptian', occupation: 'Merchant', marital: 'Married', allergies: null, chronic: 'Hyperlipidemia', insurance: null, policy: null },
    { nameEn: 'Nadia Helmy', nameAr: 'نادية حلمي', gender: 'FEMALE', dob: '1992-08-25', blood: 'AB_NEG', phone: '+20-10-1001-0009', nationality: 'Egyptian', occupation: 'Journalist', marital: 'Single', allergies: null, chronic: null, insurance: 'Bupa Egypt', policy: 'BP-2024-00606' },
    { nameEn: 'Karim Zaki', nameAr: 'كريم زكي', gender: 'MALE', dob: '1983-06-10', blood: 'A_POS', phone: '+20-10-1001-0010', nationality: 'Egyptian', occupation: 'Software Engineer', marital: 'Married', allergies: 'Aspirin', chronic: null, insurance: 'MetLife Egypt', policy: 'ML-2024-00707' },
    { nameEn: 'Salma Adel', nameAr: 'سلمى عادل', gender: 'FEMALE', dob: '2000-02-14', blood: 'B_POS', phone: '+20-10-1001-0011', nationality: 'Egyptian', occupation: 'Student', marital: 'Single', allergies: null, chronic: null, insurance: null, policy: null },
    { nameEn: 'Tamer Hosny', nameAr: 'تامر حسني', gender: 'MALE', dob: '1970-10-05', blood: 'O_POS', phone: '+20-10-1001-0012', nationality: 'Egyptian', occupation: 'Business Owner', marital: 'Married', allergies: null, chronic: 'Diabetes Type 2', insurance: 'AXA Egypt', policy: 'AX-2024-00808' },
    { nameEn: 'Rania Khalil', nameAr: 'رانيا خليل', gender: 'FEMALE', dob: '1987-07-19', blood: 'A_POS', phone: '+20-10-1001-0013', nationality: 'Egyptian', occupation: 'Nurse', marital: 'Married', allergies: 'Codeine', chronic: null, insurance: null, policy: null },
    { nameEn: 'Hesham Magdy', nameAr: 'هشام مجدي', gender: 'MALE', dob: '1965-03-28', blood: 'AB_POS', phone: '+20-10-1001-0014', nationality: 'Egyptian', occupation: 'Retired', marital: 'Widowed', allergies: null, chronic: 'Hypertension, Coronary Artery Disease', insurance: 'Bupa Egypt', policy: 'BP-2024-00909' },
    { nameEn: 'Heba Samir', nameAr: 'هبة سمير', gender: 'FEMALE', dob: '1993-09-07', blood: 'O_NEG', phone: '+20-10-1001-0015', nationality: 'Egyptian', occupation: 'Marketing Manager', marital: 'Engaged', allergies: null, chronic: null, insurance: 'MetLife Egypt', policy: 'ML-2024-01010' },
    { nameEn: 'Waleed Nasser', nameAr: 'وليد ناصر', gender: 'MALE', dob: '1978-11-22', blood: 'B_POS', phone: '+20-10-1001-0016', nationality: 'Egyptian', occupation: 'Contractor', marital: 'Married', allergies: 'Erythromycin', chronic: null, insurance: null, policy: null },
    { nameEn: 'Laila Gamal', nameAr: 'ليلى جمال', gender: 'FEMALE', dob: '1999-01-11', blood: 'A_NEG', phone: '+20-10-1001-0017', nationality: 'Egyptian', occupation: 'Student', marital: 'Single', allergies: null, chronic: 'Eczema', insurance: 'AXA Egypt', policy: 'AX-2024-01111' },
    { nameEn: 'Adel Fikry', nameAr: 'عادل فكري', gender: 'MALE', dob: '1960-05-16', blood: 'O_POS', phone: '+20-10-1001-0018', nationality: 'Egyptian', occupation: 'Retired Teacher', marital: 'Married', allergies: null, chronic: 'COPD, Hypertension', insurance: 'Bupa Egypt', policy: 'BP-2024-01212' },
    { nameEn: 'Noura Badr', nameAr: 'نورة بدر', gender: 'FEMALE', dob: '1991-04-02', blood: 'AB_POS', phone: '+20-10-1001-0019', nationality: 'Egyptian', occupation: 'Dentist', marital: 'Married', allergies: null, chronic: null, insurance: 'MetLife Egypt', policy: 'ML-2024-01313' },
    { nameEn: 'Mostafa Refaat', nameAr: 'مصطفى رفعت', gender: 'MALE', dob: '1986-08-30', blood: 'B_NEG', phone: '+20-10-1001-0020', nationality: 'Egyptian', occupation: 'Architect', marital: 'Married', allergies: 'Peanuts', chronic: null, insurance: null, policy: null },
  ];

  const patients: any[] = [];
  for (let i = 0; i < patientData.length; i++) {
    const p = patientData[i];
    const patient = await prisma.patient.create({
      data: {
        patientId: `PAT-${String(i + 1).padStart(5, '0')}`,
        clinicId: clinic.id,
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        dateOfBirth: new Date(p.dob),
        gender: p.gender,
        bloodType: p.blood,
        phonePrimary: p.phone,
        nationality: p.nationality,
        maritalStatus: p.marital,
        occupation: p.occupation,
        allergies: p.allergies,
        chronicConditions: p.chronic,
        insuranceProvider: p.insurance,
        policyNumber: p.policy,
        coverageType: p.insurance ? 'Comprehensive' : null,
        insuranceExpiry: p.insurance ? new Date('2025-12-31') : null,
        emergencyName: 'Emergency Contact',
        emergencyRelation: 'Spouse',
        emergencyPhone: '+20-10-9999-0000',
        status: 'ACTIVE',
      },
    });
    patients.push(patient);
  }

  console.log('Created 20 patients');

  // ===========================
  // SERVICES
  // ===========================
  const servicesData = [
    { nameEn: 'General Consultation', nameAr: 'استشارة عامة', price: 300, deptId: generalPractice.id },
    { nameEn: 'Follow-up Visit', nameAr: 'زيارة متابعة', price: 200, deptId: generalPractice.id },
    { nameEn: 'Pediatric Consultation', nameAr: 'استشارة أطفال', price: 350, deptId: pediatrics.id },
    { nameEn: 'Pediatric Vaccination', nameAr: 'تطعيم أطفال', price: 150, deptId: pediatrics.id },
    { nameEn: 'Dermatology Consultation', nameAr: 'استشارة جلدية', price: 400, deptId: dermatology.id },
    { nameEn: 'Skin Biopsy', nameAr: 'خزعة جلدية', price: 800, deptId: dermatology.id },
    { nameEn: 'ECG', nameAr: 'رسم قلب', price: 250, deptId: generalPractice.id },
    { nameEn: 'Wound Dressing', nameAr: 'تضميد الجروح', price: 100, deptId: null },
    { nameEn: 'Blood Pressure Monitoring', nameAr: 'قياس ضغط الدم', price: 50, deptId: null },
    { nameEn: 'Nebulizer Session', nameAr: 'جلسة تنفس', price: 120, deptId: generalPractice.id },
  ];

  const services: any[] = [];
  for (const s of servicesData) {
    const service = await prisma.service.create({
      data: {
        clinicId: clinic.id,
        departmentId: s.deptId,
        nameEn: s.nameEn,
        nameAr: s.nameAr,
        price: s.price,
      },
    });
    services.push(service);
  }

  console.log('Created 10 services');

  // ===========================
  // LAB TESTS
  // ===========================
  const labTestsData = [
    { nameEn: 'Complete Blood Count (CBC)', nameAr: 'صورة دم كاملة', category: 'Hematology', unit: 'cells/mcL', min: null, max: null, price: 120 },
    { nameEn: 'Fasting Blood Sugar (FBS)', nameAr: 'سكر صائم', category: 'Chemistry', unit: 'mg/dL', min: 70, max: 100, price: 80 },
    { nameEn: 'HbA1c', nameAr: 'السكر التراكمي', category: 'Chemistry', unit: '%', min: 4.0, max: 5.6, price: 200 },
    { nameEn: 'Lipid Profile', nameAr: 'دهون الدم', category: 'Chemistry', unit: 'mg/dL', min: null, max: null, price: 250 },
    { nameEn: 'Liver Function Tests (LFT)', nameAr: 'وظائف الكبد', category: 'Chemistry', unit: 'U/L', min: null, max: null, price: 300 },
    { nameEn: 'Kidney Function Tests (KFT)', nameAr: 'وظائف الكلى', category: 'Chemistry', unit: 'mg/dL', min: null, max: null, price: 280 },
    { nameEn: 'Thyroid Function (TSH)', nameAr: 'هرمون الغدة الدرقية', category: 'Endocrinology', unit: 'mIU/L', min: 0.4, max: 4.0, price: 220 },
    { nameEn: 'Urine Analysis', nameAr: 'تحليل بول', category: 'Microbiology', unit: null, min: null, max: null, price: 60 },
    { nameEn: 'ESR (Erythrocyte Sedimentation Rate)', nameAr: 'سرعة ترسيب', category: 'Hematology', unit: 'mm/hr', min: 0, max: 20, price: 50 },
    { nameEn: 'CRP (C-Reactive Protein)', nameAr: 'بروتين سي التفاعلي', category: 'Immunology', unit: 'mg/L', min: 0, max: 5, price: 150 },
  ];

  const labTests: any[] = [];
  for (const t of labTestsData) {
    const test = await prisma.labTest.create({
      data: {
        nameEn: t.nameEn,
        nameAr: t.nameAr,
        category: t.category,
        unit: t.unit,
        normalMin: t.min,
        normalMax: t.max,
        price: t.price,
      },
    });
    labTests.push(test);
  }

  console.log('Created 10 lab tests');

  // ===========================
  // APPOINTMENTS (30)
  // ===========================
  const appointmentStatuses = [
    'SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS',
    'COMPLETED', 'COMPLETED', 'COMPLETED', 'NO_SHOW', 'CANCELLED', 'COMPLETED',
  ];
  const appointmentTypes = ['NEW_VISIT', 'FOLLOW_UP', 'CONSULTATION', 'PROCEDURE', 'EMERGENCY'];

  const appointments: any[] = [];
  const baseDate = new Date('2026-04-01');

  for (let i = 0; i < 30; i++) {
    const dayOffset = Math.floor(i / 6) - 2; // Spread across -2 to +2 days from base
    const date = new Date(baseDate);
    date.setDate(date.getDate() + dayOffset);

    const hour = 9 + (i % 8); // 9am to 4pm
    const startTime = `${String(hour).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`;
    const endHour = i % 2 === 0 ? hour : hour + 1;
    const endMin = i % 2 === 0 ? '30' : '00';
    const endTime = `${String(endHour).padStart(2, '0')}:${endMin}`;

    const status = appointmentStatuses[i % appointmentStatuses.length];
    const type = appointmentTypes[i % appointmentTypes.length];
    const doctor = allDoctors[i % allDoctors.length];
    const patient = patients[i % patients.length];

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        branchId: mainBranch.id,
        date: date,
        startTime,
        endTime,
        type,
        status,
        notes: i % 3 === 0 ? 'Patient requested early morning slot' : null,
        isWalkIn: i % 7 === 0,
        queueNumber: status === 'CHECKED_IN' || status === 'IN_PROGRESS' ? i + 1 : null,
        checkedInAt: ['CHECKED_IN', 'IN_PROGRESS', 'COMPLETED'].includes(status) ? date : null,
        createdById: receptionist.id,
      },
    });
    appointments.push(appointment);
  }

  console.log('Created 30 appointments');

  // ===========================
  // CONSULTATIONS (10) - for completed appointments
  // ===========================
  const completedAppointments = appointments.filter((a: any) => a.status === 'COMPLETED');
  const consultationsToCreate = completedAppointments.slice(0, 10);

  const vitalsData = [
    { bpSys: 120, bpDia: 80, hr: 72, temp: 36.8, weight: 70.5, height: 170, spo2: 98, sugar: 95 },
    { bpSys: 130, bpDia: 85, hr: 78, temp: 37.0, weight: 85.2, height: 175, spo2: 97, sugar: 110 },
    { bpSys: 115, bpDia: 75, hr: 68, temp: 36.6, weight: 62.0, height: 165, spo2: 99, sugar: 88 },
    { bpSys: 140, bpDia: 90, hr: 82, temp: 37.2, weight: 90.0, height: 180, spo2: 96, sugar: 130 },
    { bpSys: 118, bpDia: 78, hr: 70, temp: 36.7, weight: 55.3, height: 160, spo2: 98, sugar: 92 },
    { bpSys: 125, bpDia: 82, hr: 74, temp: 36.9, weight: 78.0, height: 172, spo2: 97, sugar: 100 },
    { bpSys: 135, bpDia: 88, hr: 80, temp: 37.1, weight: 95.5, height: 178, spo2: 95, sugar: 145 },
    { bpSys: 110, bpDia: 70, hr: 65, temp: 36.5, weight: 48.0, height: 155, spo2: 99, sugar: 85 },
    { bpSys: 128, bpDia: 84, hr: 76, temp: 36.8, weight: 72.3, height: 168, spo2: 98, sugar: 105 },
    { bpSys: 122, bpDia: 79, hr: 71, temp: 36.7, weight: 67.8, height: 163, spo2: 98, sugar: 90 },
  ];

  const chiefComplaints = [
    'Persistent headache for 3 days',
    'Cough and mild fever',
    'Routine check-up',
    'Joint pain in knees',
    'Skin rash on arms',
    'Abdominal pain after meals',
    'Dizziness and fatigue',
    'Sore throat and runny nose',
    'Lower back pain',
    'Follow-up for blood pressure monitoring',
  ];

  const diagnoses = [
    'Tension headache',
    'Upper respiratory tract infection',
    'Healthy - no significant findings',
    'Osteoarthritis',
    'Contact dermatitis',
    'Gastritis',
    'Iron deficiency anemia',
    'Acute pharyngitis',
    'Lumbar strain',
    'Essential hypertension - controlled',
  ];

  const consultations: any[] = [];
  for (let i = 0; i < consultationsToCreate.length; i++) {
    const appt = consultationsToCreate[i];
    const v = vitalsData[i];
    const bmi = parseFloat((v.weight / ((v.height / 100) ** 2)).toFixed(1));

    const consultation = await prisma.consultation.create({
      data: {
        appointmentId: appt.id,
        patientId: appt.patientId,
        doctorId: appt.doctorId,
        status: 'COMPLETED',
        bloodPressureSys: v.bpSys,
        bloodPressureDia: v.bpDia,
        heartRate: v.hr,
        temperature: v.temp,
        weightKg: v.weight,
        heightCm: v.height,
        bmi: bmi,
        spo2: v.spo2,
        bloodSugar: v.sugar,
        vitalsRecordedAt: appt.date,
        chiefComplaint: chiefComplaints[i],
        historyPresent: 'Patient reports symptoms as described in chief complaint.',
        examination: 'Physical examination performed. Findings consistent with diagnosis.',
        diagnosisPrimary: diagnoses[i],
        treatmentPlan: 'Medications prescribed. Follow-up in 2 weeks if symptoms persist.',
        soapSubjective: chiefComplaints[i],
        soapObjective: `BP: ${v.bpSys}/${v.bpDia}, HR: ${v.hr}, Temp: ${v.temp}C, SpO2: ${v.spo2}%`,
        soapAssessment: diagnoses[i],
        soapPlan: 'Prescribe medications, order labs if needed, follow-up in 2 weeks.',
        startedAt: appt.date,
        completedAt: appt.date,
        signedAt: appt.date,
        durationMinutes: 20 + (i * 2),
      },
    });
    consultations.push(consultation);
  }

  console.log('Created 10 consultations with vitals');

  // ===========================
  // CLINIC SETTINGS
  // ===========================
  const settingsData = [
    { key: 'appointment.autoConfirm', value: 'false' },
    { key: 'appointment.reminderHours', value: '24' },
    { key: 'invoice.dueDays', value: '30' },
    { key: 'sms.enabled', value: 'true' },
    { key: 'locale.default', value: 'ar' },
  ];

  for (const s of settingsData) {
    await prisma.clinicSetting.create({
      data: {
        clinicId: clinic.id,
        key: s.key,
        value: s.value,
      },
    });
  }

  console.log('Created clinic settings');

  console.log('\n--- Seed completed successfully ---');
  console.log(`Clinic: ${clinic.nameEn}`);
  console.log('Login credentials:');
  console.log('  Super Admin: admin@clinic.com / Admin123!');
  console.log('  Doctor:      doctor@clinic.com / Password123!');
  console.log('  Nurse:       nurse@clinic.com / Password123!');
  console.log('  Receptionist: receptionist@clinic.com / Password123!');
  console.log('  Pharmacist:  pharmacist@clinic.com / Password123!');
  console.log('  Accountant:  accountant@clinic.com / Password123!');
  console.log('  Manager:     manager@clinic.com / Password123!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: any) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
