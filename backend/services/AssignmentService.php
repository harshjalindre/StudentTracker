<?php
include_once 'repositories/AssignmentRepository.php';

class AssignmentService {

    private $assignmentRepository;

    public function __construct($conn) {
        $this->assignmentRepository = new AssignmentRepository($conn);
    }

    public function createAssignment($name, $components) {
        $assignmentId = $this->assignmentRepository->createAssignment($name);
        if ($assignmentId) {
            foreach ($components as $component) {
                $this->assignmentRepository->createComponent($assignmentId, $component['name'], $component['maxMarks']);
            }
            return ['status' => 'success', 'assignment_id' => $assignmentId];
        }
        return ['status' => 'error', 'message' => 'Failed to create assignment'];
    }
    public function getAssignment() {
        return $this->assignmentRepository->getAssignment();
    }

    public function getComponents($assignmentId) {
        return $this->assignmentRepository->getComponents($assignmentId);
    }

    
}
?>
