import React, { useState } from 'react';
import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const fetchedStudents = await fetchStudents(studentIds);
    const fetchedSchools = await fetchSchools(fetchedStudents);
    const fetchedLegalguardians = await fetchLegalguardians(fetchedStudents);

    setStudentsData(fetchedStudents);
    setSchoolsData(fetchedSchools);
    setLegalguardiansData(fetchedLegalguardians);
  };

  const fetchStudents = async (studentIds) => {
    const fetchedStudents = [];

    for (const studentId of studentIds) {
      const existingStudent = studentsData.find((student) => student.id === studentId);

      if (existingStudent) {
        fetchedStudents.push(existingStudent);
      } else {
        const studentData = await fetchStudentData(studentId);
        fetchedStudents.push(studentData);
      }
    }

    return fetchedStudents;
  };

  const fetchSchools = async (students) => {
    const fetchedSchools = [];

    for (const student of students) {
      const existingSchool = schoolsData.find((school) => school.id === student.schoolId);

      if (existingSchool) {
        fetchedSchools.push(existingSchool);
      } else {
        const schoolData = await fetchSchoolData(student.schoolId);
        fetchedSchools.push(schoolData);
      }
    }

    return fetchedSchools;
  };

  const fetchLegalguardians = async (students) => {
    const fetchedLegalguardians = [];

    for (const student of students) {
      const existingLegalguardian = legalguardiansData.find(
        (guardian) => guardian.id === student.legalguardianId
      );

      if (existingLegalguardian) {
        fetchedLegalguardians.push(existingLegalguardian);
      } else {
        const guardianData = await fetchLegalguardianData(student.legalguardianId);
        fetchedLegalguardians.push(guardianData);
      }
    }

    return fetchedLegalguardians;
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default StudentsDataComponent;