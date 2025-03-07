<?php
include_once 'repositories/GradeRepository.php';

class GradeService {

    private $gradeRepository;

    public function __construct($conn) {
        $this->gradeRepository = new GradeRepository($conn);
    }

    public function submitGrade($studentId, $assignmentId, $totalMarks, $grade) {
        if ($this->gradeRepository->insertGrade($studentId, $assignmentId, $totalMarks, $grade)) {
            return ['status' => 'success'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to submit grade'];
        }
    }
}
?>
