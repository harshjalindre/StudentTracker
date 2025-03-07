<?php
include_once 'models/Assignment.php';

class AssignmentRepository {

    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function createAssignment($name) {
        $sql = "INSERT INTO assignments (name) VALUES ('$name')";
        if ($this->conn->query($sql) === TRUE) {
            return $this->conn->insert_id;
        }
        return false;
    }

    public function createComponent($assignmentId, $componentName, $maxMarks) {
        $sql = "INSERT INTO assignment_components (assignment_id, component_name, max_marks) 
                VALUES ('$assignmentId', '$componentName', '$maxMarks')";
        
        return $this->conn->query($sql);
    }

    public function getAssignment() {
        $sql = "SELECT * FROM `assignments`";
        $result = $this->conn->query($sql);

        $assignments = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $assignments[] = $row;
            }
        }

        return $assignments;
    }

    // Get components for a specific assignment
    public function getComponents($assignmentId) {
        $sql = "SELECT * FROM assignment_components WHERE assignment_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $assignmentId); // Bind the assignmentId parameter
        $stmt->execute();
        $result = $stmt->get_result();
        $components = [];

        while ($row = $result->fetch_assoc()) {
            $components[] = $row;
        }

        return $components;
    }
}
?>
