<?php
include_once 'services/AssignmentService.php';

class AssignmentController {

    private $assignmentService;

    public function __construct($conn) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header('Content-Type: application/json');
        
        $this->assignmentService = new AssignmentService($conn);
    }

    public function createAssignment() {
        $data = json_decode(file_get_contents('php://input'), true);
        if(!empty($data)){
            $assignmentName = $data['name'];
            $components = $data['components'];

            $response = $this->assignmentService->createAssignment($assignmentName, $components);
            echo json_encode($response);
        }
    }
    public function getAssignment() {
        $students = $this->assignmentService->getAssignment();
        echo json_encode($students);
    }

    public function getAssignmentComponents($assignmentId) {
        // Fetch components of the assignment by assignmentId
        $components = $this->assignmentService->getComponents($assignmentId);
        
        if ($components) {
            echo json_encode($components);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No components found for this assignment']);
        }
    }
}
?>
