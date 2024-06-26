const fs = require('fs');
/**
 * Function that counts the number of students in a database
 * @param {string} dataPath - Path to the database
 * @returns {Promise} - Promise object represents the number of students
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
        reject(Error('Cannot load the database'));
        return;
        }
        const fileLines = data.trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);
    
        for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
        }
        const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);
        studentGroups[field].push(Object.fromEntries(studentEntries));
        }
    
        const totalStudents = Object
        .values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
        console.log(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
        }
        resolve();
    });
});

module.exports = countStudents;