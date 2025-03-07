<?php
include_once 'services/StudentService.php';

class StudentController {

    private $studentService;

    public function __construct($conn) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header('Content-Type: application/json');
        
        $this->studentService = new StudentService($conn);
    }

    public function getStudents() {
        $students = $this->studentService->getStudents();
        echo json_encode($students);
    }
}
?>
