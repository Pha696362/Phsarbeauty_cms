export const Scholarships = {
  Approval: { key: 0, text: "Approval" },
  Reject: { key: 1, text: "Reject" },
  Pending: { key: 2, text: "Pending" }
};


export const PositionTypes = {
  staft: 'Staff',
  english_teacher: 'English Program',
  academic_teacher: 'Academic Program'
}
export const Gender = [
  { key: '1', text: 'Male' },
  { key: '2', text: 'Female' },
  { key: '3', text: 'Other' },
]

export const Roles = [
  { key: '0', text: 'General' },
  { key: '1', text: 'Admin' },
  { key: '2', text: 'Cashier' },
  { key: '3', text: 'Testing' },
  { key: '4', text: 'EPO' },
  { key: '5', text: 'APO' },
  { key: '6', text: 'Scholarship' },
  { key: '7', text: 'Enrollment' },
  { key: '8', text: 'HR' },
  { key: '7', text: 'Registrar' },
  { key: '8', text: 'Facultie' },
]

export const ViewOptions = {
  sort: [{ column: 'name', type: 'asc' }],
  view: [{ type: 'table' }],
  page: [{ total: 50 }]
}

export const ProgramTypes = [
  { key: 1, text: 'English Program' },
  { key: 2, text: 'Academic Program' },
]

export const crimeTypes = [
  { key: 1, text: 'vehicles' },
  { key: 2, text: 'weapons' },
  { key: 3, text: 'other-exhibits' },
]

export const investigationTypes = [
  { key: 1, text: 'summary-case' },
  { key: 2, text: 'responsible-officials' },
]
export const materialLostTypes = [
  { key: 1, text: 'vehicles' },
  { key: 2, text: 'jewelry' },
  { key: 3, text: 'currency' },
  { key: 4, text: 'other-exhibits' },
]

export const ProgramTypesFilter = [
  { key: 0, text: 'All' },
  { key: 1, text: 'English Program' },
  { key: 2, text: 'Academic Program' },
]

export const InstituteTypes = [
  { key: 1, text: 'General Program' },
  { key: 2, text: 'Academic Program' },
]

export const InstituteTypesObj = {
  general: { key: 1, text: 'General Program' },
  academic: { key: 2, text: 'Academic Program' },
}

export const InstituteTypesFilter = [
  { key: 0, text: 'All' },
  { key: 1, text: 'General Program' },
  { key: 2, text: 'Academic Program' },
]

export const ProgramTypesObj = {
  englishProgram: { key: 1, text: 'English Program', status: 'Active' },
  academicProgram: { key: 2, text: 'Academic Program', status: 'Active' },
}

export const TermStatus = [
  { key: 1, text: 'Pending' },
  { key: 2, text: 'Active' },
  { key: 3, text: 'Close' },
]
export const daysOfWeek = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7
}
export const paymentType = {
  cash: { key: 1, text: 'Cash' },
  wingMerchant: { key: 2, text: 'Wing Merchant' },
  ePayment: { key: 3, text: 'Wing E-Payment' },
}

export const PaymentTypes = [
  { key: 1, text: 'Cash' },
  { key: 2, text: 'Wing Merchant' },
  { key: 3, text: 'Wing E-Payment' },
]

export const InvoiceTypes = [
  { key: 1, text: 'Testing' },
  { key: 2, text: 'School Fee' },
  { key: 3, text: 'Short Course' },
]

export const InvoiceTypesObj = {
  testing: { key: 1, text: 'Testing' },
  schoolFee: { key: 2, text: 'School Fee' },
  shortCoure: { key: 3, text: 'Short Course' },
}

export const programs = [
  { key: 1, text: 'Undergraduate' },
  { key: 2, text: 'Graduate' },
  { key: 3, text: 'Postgraduate' },
  { key: 4, text: 'English Program' },
  { key: 5, text: 'Association' },
  { key: 6, text: 'Short Course' },
  { key: 7, text: 'Others' },
]

export const programsObj = {
  Undergraduate: { key: 1, text: 'Undergraduate' },
  Graduate: { key: 2, text: 'Graduate' },
  Postgraduate: { key: 3, text: 'Postgraduate' },
  English_Program: { key: 4, text: 'English Program' },
  Association: { key: 5, text: 'Association' },
  Short_Course: { key: 6, text: 'Short Course' },
  Others: { key: 7, text: 'Others' },
}

export const courses = [
  { key: 1, text: 'Foundation Year Courses' },
  { key: 2, text: 'Oriented Courses by Faculty Requirements' },
  { key: 3, text: 'Functional Skills Courses' },
  { key: 4, text: 'Institutional Skills Courses' },
  { key: 5, text: 'Basic Major Courses' },
  { key: 6, text: 'Major Courses' },
  { key: 7, text: 'Elective Courses' },
  { key: 8, text: 'Graduation Path' },
]
export const reportFilterBy = [
  { key: 1, text: 'Custom' },
  { key: 2, text: 'Today' },
  { key: 3, text: 'This Month' },
  { key: 4, text: 'This Year' },
]

export const filterTrueFalse = [
  { key: 1, text: 'All' },
  { key: 2, text: 'Paid' },
  { key: 3, text: 'Unpaid' },
]

export const priorities = [
  { key: 1, text: 'Required' },
  { key: 2, text: 'Elective' },
]

export const curriculumStatus = [
  { key: 1, text: 'Acitve' },
  { key: 2, text: 'Disabled' },
]
export const SubjectType = [
  { key: 1, text: 'Admission and Services Fee' },
  { key: 2, text: 'Short Courses' },
  { key: 3, text: 'Major Courses' },
  { key: 4, text: 'English Courses' },
]
export const Days = [
  { key: 1, name: 'Monday' },
  { key: 2, name: 'Tuesday' },
  { key: 3, name: 'Wednesday' },
  { key: 4, name: 'Thursday' },
  { key: 5, name: 'Friday' },
  { key: 6, name: 'Saturday' },
  { key: 7, name: 'Sunday' },
]
export const ShiftStatus = [
  { key: 1, name: 'Opening' },
  { key: 2, name: 'Closed' },
]
export const ShiftStatusObj = {
  opening: { key: 1, name: 'Opening' },
  closed: { key: 2, name: 'Closed' },
}

export const TestFeeStatus = {
  unpaid: { key: 1, name: 'Unpaid' },
  paid: { key: 2, name: 'Paid' },
  prepaid: { key: 3, name: 'Prepaid' },
  void: { key: 4, name: 'Void' },
  disables: { key: 5, name: 'Disables' },
}

export const EmployeeType = {
  staff: { key: 'Staff' },
  englishInstructor: { key: 'General Program' },
  academicInstructor: { key: 'Academic Program' }
}

export const DiscountPolicy = [
  { key: 1, name: 'Monk' },
  { key: 2, name: 'Staff' },
]
export const TranscriptStatus = {
  blank: { key: 1, name: 'Blank' },
}

export const UserRoles = [
  { key: 0, text: 'Administrator' },
  { key: 1, text: 'Testing Center' },
  { key: 2, text: 'Aministration Officer' },
  { key: 3, text: 'Enrollment' },
  { key: 4, text: 'Cashier' },
  { key: 5, text: 'Academic Program' },
  { key: 6, text: 'Faculties' },
  { key: 7, text: 'Institutes and Centers' },
  { key: 8, text: 'Registra Officer' },
  { key: 9, text: 'Scholarships' },
  { key: 10, text: 'Payroll & Finances' },
  { key: 11, text: 'Human Resources' },
]

export const SchoolSession = [
  { key: 1, text: 'Morning' },
  { key: 2, text: 'Afternoon' },
  { key: 3, text: 'Evening' },
  { key: 4, text: 'Weekend' },
]

export const TestingStatus = {
  active: { key: 1, text: 'Active' },
  disables: { key: 2, text: 'Disabled' },
  expired: { key: 3, text: 'Expired' },
}

export const recordStatus = {
  active: { key: 1, text: 'Active' },
  disables: { key: 2, text: 'Disabled' },
  complete: { key: 3, text: 'Completed' },
}

export const judgmentStatus = {
  pending: { key: 1, text: 'មិនទាន់បញ្ចប់', name: 'Pending' },
  complete: { key: 2, text: 'បានបញ្ចប់', name: 'Completed' },
}

export const arrestStatus = [
  { key: 1, text: 'មិនឃាត់ខ្លួន', name: 'Not Arrested' },
  { key: 2, text: 'បានឃាត់ខ្លួន', name: 'Arrested' },
]

export const arrestObjStatus = {
  notArrested: { key: 1, text: 'មិនឃាត់ខ្លួន', name: 'Not Arrested' },
  arrested: { key: 2, text: 'បានឃាត់ខ្លួន', name: 'Arrested' },
}

export const crimeStatus = {
  pending: { key: 1, text: 'មិនទាន់បង្ក្រាបបាន', name: 'Pending' },
  complete: { key: 2, text: 'បានបង្ក្រាប', name: 'Completed' },
  close: { key: 3, text: 'បិទករណី', name: 'Close' },
}

export const status = [
  { key: 1, text: 'Active' },
  { key: 2, text: 'Pending' },
  { key: 3, text: 'Disabled' },
  { key: 4, text: 'Closed' },
]

export const genderArray = [
  { key: 1, text: 'ប្រុស', name: "Male" },
  { key: 2, text: 'ស្រី', name: "Female" },
]

export const enrollStatus = [
  { key: 1, text: "Pending" },
  { key: 2, text: "Add" },
  { key: 3, text: "Drop" }
];

export const enrollStatusObj = {
  pending: { key: 1, text: "Pending" },
  add: { key: 2, text: "Add" },
  drop: { key: 3, text: "Drop" }
};

export const enrollmentTypes = {
  PSIS: { key: "PSIS", text: "PSIS Program" },
  institute: { key: "INSTITUTE", text: "Institute program" },
  academic: { key: "ACADEMIC", text: "Academic Program" }
};

export const EnrollStatus = {
  none: { key: 1, text: 'none' },
  add: { key: 2, text: 'Add' },
  change: { key: 3, text: 'Changed' },
  drop: { key: 4, text: 'Dropped' },
}

export const AttendanceStatus = {
  attended: { key: 1, text: 'Attended' },
  absent: { key: 2, text: 'Absent' },
  change: { key: 3, text: 'Changed' },
  drop: { key: 4, text: 'Dropped' },
}

export const TranscriptGradeStatus = {
  passed: { key: 1, text: 'Passed', short: 'P' },
  fail: { key: 2, text: 'Failed', short: 'F' },
}


export const programAdmission = [
  { key: 1, text: "Undergraduate", name: "Bachelor", level: 0 },
  { key: 2, text: "Graduate", name: "Master", level: 1 },
  { key: 3, text: "Postgraduate", name: "Doctor or PhD", level: 2 },
  { key: 4, text: "Associate", name: "Associate", level: 0 },
];

export const Genders = [
  { key: 1, text: "ប្រុស" },
  { key: 2, text: "ស្រី" },
];

export const personType = [
  { key: 1, text: "Victim" },
  { key: 2, text: "Suspect" },
  { key: 3, text: "Suspect-Arrested" },
  { key: 4, text: "Judge" },
  { key: 5, text: "Judgment-Writer" },
];

export const personTypeObj = {
  victim: { key: 1, text: "Victim" },
  suspect: { key: 2, text: "Suspect" },
  suspectArrested: { key: 3, text: "Suspect-arrested" },
  judge: { key: 4, text: "Judge" },
  judgmentWriter: { key: 5, text: "Judgment-Writer" },
  verdict: { key: 6, text: "Verdict" },
};

export const religions = [
  { key: 0, text: 'NA' },
  { key: 1, text: 'Buddhism' },
  { key: 2, text: 'Christian' },
  { key: 3, text: 'Musleum' },
]

export const IDtype = [
  { key: 0, text: 'ID Card' },
  { key: 1, text: 'Passport' },
]

export const maritalStatusArray = [
  { key: 1, text: 'Single' },
  { key: 2, text: 'Married' },
  { key: 3, text: 'Divorced' },
]

export const nationality = {
  cambodia: { key: 1, text: 'Cambodian' },
}

export const nationalityArray = [
  { key: 1, text: 'Cambodian' },
]

export const subjectTypes = [
  { key: 1, text: 'Foundation Course' },
  { key: 2, text: 'Directed Course' },
  { key: 3, text: 'Oriented Course' },
  { key: 4, text: 'Functional Skills Course' },
  { key: 5, text: 'Institutional Skills Course' },
  { key: 6, text: 'Basic Major Course' },
  { key: 7, text: 'Major Course' },
  { key: 8, text: 'Elective Course' },
  { key: 9, text: 'Graduation Path' },
  { key: 10, text: 'Other' },
]

export const typeStatistic = {
  region: { key: 1, text: 'region' },
  category: { key: 2, text: 'category' },
  subCategory: { key: 3, text: 'subCategory' },
  victim: { key: 4, text: 'victim' },
  suspect: { key: 5, text: 'suspect' },
}


export const CONFIGS = {
  YEAR: '2017',
  FROM_YEAR: '201706',
  TO_YEAR: '201710',
  FROM_DATE: 20170600,
  TO_DATE: 20171100,
  PERIOD: 'ចាប់ពីថ្ងៃទី 1 ខែមិថុនា, 2017 មកត្រឹម ថ្ងៃទី 31 ខែតុលា, 2017'
}


export const Help = [
  { key: 1, name: "ទម្រង់កំណត់ត្រាដោយដៃ" },
  { key: 2, name: "បទបង្ហាញសង្ខេបស្តីពីប្រព័ន្ធទិន្នន័យបទល្មើសព្រហ្មទណ្ឌ" },
  { key: 3, name: "ពង្រាងសៀវភៅណែនាំស្ដីពីការប្រើប្រាស់ប្រព័ន្ធទិន្នន័យបទល្មើសព្រហ្មទណ្ឌ" },
]

export const otherStatus = {
  other: { Id: `5587`, Name: "ផ្សេងៗ" }
}