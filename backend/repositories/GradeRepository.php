<?php
include_once 'models/Grade.php';

class GradeRepository {

    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function insertGrade($studentId, $assignmentId, $totalMarks, $grade) {
        $sql = "INSERT INTO grades (student_id, assignment_id, total_marks, grade) 
                VALUES ('$studentId', '$assignmentId', '$totalMarks', '$grade')";

        return $this->conn->query($sql);
    }
}
?>
