<?php
include_once 'repositories/StudentRepository.php';

class StudentService {

    private $studentRepository;

    public function __construct($conn) {
        $this->studentRepository = new StudentRepository($conn);
    }

    public function getStudents() {
        return $this->studentRepository->getStudents();
    }
}
?>
