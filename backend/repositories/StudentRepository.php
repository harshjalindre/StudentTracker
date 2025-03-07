<?php
include_once 'models/Student.php';

class StudentRepository {

    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getStudents() {
        $sql = "SELECT students.id, students.name, assignments.name AS assignment_name, grades.status 
                FROM students
                LEFT JOIN grades ON grades.student_id = students.id
                LEFT JOIN assignments ON assignments.id = grades.assignment_id";
        $result = $this->conn->query($sql);

        $students = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
        }

        return $students;
    }
}
?>
