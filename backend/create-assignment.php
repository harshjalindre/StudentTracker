<?php
header("Access-Control-Allow-Origin: *");  // This allows all domains
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Methods allowed
header("Access-Control-Allow-Headers: Content-Type");  // Allow headers like Content-Type

header('Content-Type: application/json');
include 'db.php'; // Include the database connection

$data = json_decode(file_get_contents('php://input'), true);

$assignmentName = $data['name'];
$components = $data['components'];

// Insert the assignment into the database
$sql = "INSERT INTO assignments (name) VALUES ('$assignmentName')";
if ($conn->query($sql) === TRUE) {
    $assignmentId = $conn->insert_id; // Get the ID of the newly inserted assignment

    // Now insert the components into the `assignment_components` table
    foreach ($components as $component) {
        $componentName = $component['name'];
        $maxMarks = $component['maxMarks'];

        $sql = "INSERT INTO assignment_components (assignment_id, component_name, max_marks) 
                VALUES ('$assignmentId', '$componentName', '$maxMarks')";
        
        if ($conn->query($sql) !== TRUE) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to insert component']);
            exit();
        }
    }

    echo json_encode(['status' => 'success', 'assignment_id' => $assignmentId]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to create assignment']);
}

// Close connection
$conn->close();
?>
