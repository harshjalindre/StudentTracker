<?php
header("Access-Control-Allow-Origin: *");  // This allows all domains
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Methods allowed
header("Access-Control-Allow-Headers: Content-Type");  // Allow headers like Content-Type

header('Content-Type: application/json');
include 'db.php'; // Include the database connection

$data = json_decode(file_get_contents('php://input'), true);

$studentId = $data['studentId'];
$assignmentId = $data['assignmentId'];
$totalMarks = $data['totalMarks'];
$grade = $data['grade'];

// Insert the grade for the student and assignment
$sql = "INSERT INTO grades (student_id, assignment_id, total_marks, grade) 
        VALUES ('$studentId', '$assignmentId', '$totalMarks', '$grade')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit grade']);
}

// Close connection
$conn->close();
?>
