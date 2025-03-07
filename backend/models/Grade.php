<?php
class Grade {
    public $studentId;
    public $assignmentId;
    public $totalMarks;
    public $grade;

    public function __construct($studentId = null, $assignmentId = null, $totalMarks = null, $grade = null) {
        $this->studentId = $studentId;
        $this->assignmentId = $assignmentId;
        $this->totalMarks = $totalMarks;
        $this->grade = $grade;
    }
}
?>
