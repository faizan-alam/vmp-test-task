import React, { useState } from 'react';
import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState({});
  const [schoolsData, setSchoolsData] = useState({});
  const [legalguardiansData, setLegalguardiansData] = useState({});

  const onStudentsPick = async (studentIds) => {
    const fetchedStudents = await fetchStudents(studentIds);

    const schoolIds = fetchedStudents.map((student) => student.schoolId);
    const legalguardianIds = fetchedStudents.map((student) => student.legalguardianId);

    const fetchedSchools = await fetchSchools(schoolIds);
    const fetchedLegalguardians = await fetchLegalguardians(legalguardianIds);

    setStudentsData(updateObjectData(studentsData, fetchedStudents));
    setSchoolsData(updateObjectData(schoolsData, fetchedSchools));
    setLegalguardiansData(updateObjectData(legalguardiansData, fetchedLegalguardians));
  };

  const fetchStudents = async (studentIds) => {
    const fetchedStudents = [];

    for (const studentId of studentIds) {
      if (studentsData[studentId]) {
        fetchedStudents.push(studentsData[studentId]);
      } else {
        const studentData = await fetchStudentData(studentId);
        fetchedStudents.push(studentData);
      }
    }

    return fetchedStudents;
  };

  const fetchSchools = async (schoolIds) => {
    const fetchedSchools = {};

    for (const schoolId of schoolIds) {
      if (schoolsData[schoolId]) {
        fetchedSchools[schoolId] = schoolsData[schoolId];
      } else {
        const schoolData = await fetchSchoolData(schoolId);
        fetchedSchools[schoolId] = schoolData;
      }
    }

    return fetchedSchools;
  };

  const fetchLegalguardians = async (legalguardianIds) => {
    const fetchedLegalguardians = {};

    for (const guardianId of legalguardianIds) {
      if (legalguardiansData[guardianId]) {
        fetchedLegalguardians[guardianId] = legalguardiansData[guardianId];
      } else {
        const guardianData = await fetchLegalguardianData(guardianId);
        fetchedLegalguardians[guardianId] = guardianData;
      }
    }

    return fetchedLegalguardians;
  };

  const updateObjectData = (existingData, newData) => {
    return { ...existingData, ...newData };
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={Object.values(studentsData)}
        schoolsData={Object.values(schoolsData)}
        legalguardiansData={Object.values(legalguardiansData)}
      />
    </>
  );
};

export default StudentsDataComponent;