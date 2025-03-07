CREATE DATABASE student_tracker;

USE student_tracker;


CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE assignment_components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  component_name VARCHAR(255),
  max_marks INT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);

CREATE TABLE grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  assignment_id INT NOT NULL,
  total_marks INT,
  grade VARCHAR(10),
  status VARCHAR(50),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);


------------------------------------

INSERT INTO students (name) VALUES
('Harsh Jalindre'),
('Niraj Jalindre'),
('Rohit Sharma'),
('Virat Kohli');

INSERT INTO assignments (name) VALUES
('Math Assignment 1'),
('Science Assignment 1'),
('History Assignment 1');


INSERT INTO assignment_components (assignment_id, component_name, max_marks) VALUES
(1, 'Algebra', 20),
(1, 'Geometry', 30),
(2, 'Physics', 25),
(2, 'Chemistry', 25),
(3, 'World War I', 50);


INSERT INTO grades (student_id, assignment_id, total_marks, grade, status) VALUES
(1, 1, 45, 'A', 'Completed'),
(1, 2, 40, 'B', 'Completed'),
(2, 1, 50, 'A', 'Completed'),
(3, 3, 30, 'C', 'Completed'),
(4, 2, 45, 'B', 'Completed');

