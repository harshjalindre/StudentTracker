<?php
// Include necessary files
include_once 'config/db.php';
include_once 'controllers/AssignmentController.php';
include_once 'controllers/GradeController.php';
include_once 'controllers/StudentController.php';

// Get the requested URL
$requestUri = $_SERVER['REQUEST_URI'];

// Remove the '/backend' part of the URL if it's present
$requestUri = str_replace('/studentTracker/backend', '', $requestUri);
$requestUri = trim($requestUri, '/');  // Remove any trailing slashes

// Split URL into parts
$uriParts = explode('/', $requestUri);

// Get the controller and action
$controllerName = $uriParts[0] ?? 'student';  // Default to 'student' controller
$actionName = $uriParts[1] ?? 'getAll';      // Default to 'getAll' action

// Extract any additional parameters (e.g., assignmentId, componentId)
$params = array_slice($uriParts, 2);  // Everything after the first two parts will be parameters

// Create controller object based on the controller name
switch ($controllerName) {
    case 'assignment':
        $controllerObj = new AssignmentController($conn);
        break;
    
    case 'grade':
        $controllerObj = new GradeController($conn);
        break;
    
    case 'student':
    default:
        $controllerObj = new StudentController($conn);
        break;
}

// Call the action method (e.g., 'getAll', 'submitGrade') with parameters
if (method_exists($controllerObj, $actionName)) {
    // Call the method with the parameters (if any)
    call_user_func_array([$controllerObj, $actionName], $params);  // Pass params to the method
} else {
    echo json_encode(['status' => 'error', 'message' => 'Action not found']);
}
?>
