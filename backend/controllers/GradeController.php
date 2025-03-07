<?php
include_once 'services/GradeService.php';

class GradeController {

    private $gradeService;

    public function __construct($conn) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header('Content-Type: application/json');
        
        $this->gradeService = new GradeService($conn);
    }

    public function submitGrade() {
        $data = json_decode(file_get_contents('php://input'), true);
        if(!empty($data)){
            $studentId = $data['selectedStudent'];
            $assignmentId = $data['selectedAssignment'];
            $totalMarks = $data['totalMarks'];
            $grade = $data['grade'];

            $response = $this->gradeService->submitGrade($studentId, $assignmentId, $totalMarks, $grade);
            echo json_encode($response);
        }
    }
}
?>
