export const UNIVERSITY_MAJORS = [
    { id: 'cs', name: 'Computer Science', type: 'university', cost: 15000, years: 4, smarts_req: 70 },
    { id: 'nursing', name: 'Nursing', type: 'university', cost: 12000, years: 4, smarts_req: 60 },
    { id: 'english', name: 'English', type: 'university', cost: 10000, years: 4, smarts_req: 40 },
    { id: 'biology', name: 'Biology', type: 'university', cost: 14000, years: 4, smarts_req: 65 },
    { id: 'poli_sci', name: 'Political Science', type: 'university', cost: 11000, years: 4, smarts_req: 50 },
    { id: 'arts', name: 'Arts', type: 'university', cost: 18000, years: 4, smarts_req: 30 },
    { id: 'psychology', name: 'Psychology', type: 'university', cost: 12000, years: 4, smarts_req: 50 },
    { id: 'math', name: 'Mathematics', type: 'university', cost: 13000, years: 4, smarts_req: 80 },
    { id: 'chemistry', name: 'Chemistry', type: 'university', cost: 14000, years: 4, smarts_req: 75 },
    { id: 'business', name: 'Finance', type: 'university', cost: 16000, years: 4, smarts_req: 60 }
];

export const GRAD_SCHOOLS = [
    { id: 'law_school', name: 'Law School', type: 'grad_school', cost: 25000, years: 3, smarts_req: 80, req_degree: 'Political Science' }, // simplified req
    { id: 'med_school', name: 'Medical School', type: 'grad_school', cost: 35000, years: 4, smarts_req: 90, req_degree: 'Biology' }, // or Chem/Nursing
    { id: 'business_school', name: 'Business School', type: 'grad_school', cost: 30000, years: 2, smarts_req: 70, req_degree: 'Finance' } // or Math?
];

// Helper to check flexible major requirements
export const checkPrereq = (schoolId, degrees) => {
    if (schoolId === 'med_school') {
        return degrees.includes('Biology') || degrees.includes('Chemistry') || degrees.includes('Nursing');
    }
    if (schoolId === 'law_school') {
        return degrees.includes('Political Science') || degrees.includes('English') || degrees.includes('History');
    }
    if (schoolId === 'business_school') {
        return degrees.includes('Finance') || degrees.includes('Mathematics') || degrees.includes('Economics');
    }
    return true;
};
