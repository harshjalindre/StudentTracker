<?php
header("Access-Control-Allow-Origin: *");  // This allows all domains
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Methods allowed
header("Access-Control-Allow-Headers: Content-Type");  // Allow headers like Content-Type

header('Content-Type: application/json');
include 'db.php'; // Include the database connection

// Query to fetch students and their assignments
$sql = "SELECT students.id, students.name, assignments.name AS assignment_name, grades.status 
        FROM students
        LEFT JOIN grades ON grades.student_id = students.id
        LEFT JOIN assignments ON assignments.id = grades.assignment_id";

$result = $conn->query($sql);

$students = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
} else {
    echo json_encode(["message" => "No students found"]);
    exit();
}

// Send the response
echo json_encode($students);

// Close connection
$conn->close();
?>
