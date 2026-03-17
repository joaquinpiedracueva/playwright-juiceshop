import { faker } from '@faker-js/faker';

export const securityQuestions = {
  eldestSiblingMiddleName: { id: 1, question: 'Your eldest siblings middle name?', answer: faker.person.middleName() },
  motherMaidenName: { id: 2, question: "Mother's maiden name?", answer: faker.person.lastName() },
  motherBirthDate: {
    id: 3,
    question: "Mother's birth date? (MM/DD/YY)",
    answer: faker.date
      .birthdate({ min: 1940, max: 1970, mode: 'year' })
      .toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
  },
  fatherBirthDate: {
    id: 4,
    question: "Father's birth date? (MM/DD/YY)",
    answer: faker.date
      .birthdate({ min: 1940, max: 1970, mode: 'year' })
      .toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
  },
  maternalGrandmotherFirstName: {
    id: 5,
    question: "Maternal grandmother's first name?",
    answer: faker.person.firstName('female'),
  },
  paternalGrandmotherFirstName: {
    id: 6,
    question: "Paternal grandmother's first name?",
    answer: faker.person.firstName('female'),
  },
  favoritePet: { id: 7, question: 'Name of your favorite pet?', answer: faker.person.firstName() },
  teenageDentistLastName: {
    id: 8,
    question: "Last name of dentist when you were a teenager? (Do not include 'Dr.')",
    answer: faker.person.lastName(),
  },
  teenageZipCode: {
    id: 9,
    question: 'Your ZIP/postal code when you were a teenager?',
    answer: faker.location.zipCode(),
  },
  firstAdultCompany: { id: 10, question: 'Company you first work for as an adult?', answer: faker.company.name() },
  favoriteBook: { id: 11, question: 'Your favorite book?', answer: faker.book.title() },
  favoriteMovie: { id: 12, question: 'Your favorite movie?', answer: faker.book.title() },
  customerOrIdCardNumber: {
    id: 13,
    question: 'Number of one of your customer or ID cards?',
    answer: faker.finance.accountNumber(),
  },
  favoriteHikingPlace: { id: 14, question: "What's your favorite place to go hiking?", answer: faker.location.city() },
};
