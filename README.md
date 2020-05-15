## Test task for Kate Media company

1. Please build following model using mongoose

Roles (Principal, Teacher, Student)
Objects: Users, School, Class, Schedule

Relations:
School has one principal
School has many Teachers
School has many classes
Class belongs to School OR Teacher
Class has many Students
Class has many Teachers ONLY if it belongs to School
Students may belong to many classes

2. Please define REST API (resources, routers) to perform following actions:

Principal can
create school
assign teacher to school
remove teacher from school

assign student to school
remove student from school

Teacher can:
create class
assign student to class
remove student from class
delete class
assign schedule to student
assign schedule to class

Get all schools
Get teachers of school
get students of school/class
Get all classes of teacher
Get all students of class

3. Implement some creation, assignments and removal actions, unit tests.
