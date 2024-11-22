const form = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

document.addEventListener('DOMContentLoaded', loadStudents);

form.addEventListener('submit', addStudent);

function addStudent(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNo = document.getElementById('contactNo').value.trim();

    if (!studentName || !studentID || !email || !contactNo) {
        alert('Please fill in all fields.');
        return;
    }

    if (!/^[A-Za-z ]+$/.test(studentName)) {
        alert('Student Name must contain only letters.');
        return;
    }

    if (!/^\d+$/.test(studentID) || !/^\d+$/.test(contactNo)) {
        alert('Student ID and Contact No must be numbers.');
        return;
    }

    const student = { studentName, studentID, email, contactNo };

    
    const students = getStudentsFromLocalStorage();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    form.reset();

    loadStudents();
}

function loadStudents() {
    studentTable.innerHTML = ''; 
    const students = getStudentsFromLocalStorage();

    students.forEach((student, index) => {
        const row = studentTable.insertRow();
        row.insertCell(0).textContent = student.studentName;
        row.insertCell(1).textContent = student.studentID;
        row.insertCell(2).textContent = student.email;
        row.insertCell(3).textContent = student.contactNo;

        const actionsCell = row.insertCell(4);
        actionsCell.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editStudent(index);
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteStudent(index);
        actionsCell.appendChild(deleteBtn);
    });
}

function editStudent(index) {
    const students = getStudentsFromLocalStorage();
    const student = students[index];

    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contactNo;

    deleteStudent(index); 
}

function deleteStudent(index) {
    const students = getStudentsFromLocalStorage();
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function getStudentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('students')) || [];
}
