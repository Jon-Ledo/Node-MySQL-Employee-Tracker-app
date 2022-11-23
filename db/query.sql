SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- role + department
SELECT role.id, role.title, department.name AS department
FROM role
INNER JOIN department
ON role.department_id = department.id;

-- employee + role
SELECT employee.id, employee.first_name, employee.last_name, role.title
FROM employee
INNER JOIN role
ON employee.role_id = role.id;

-- self join 
SELECT emp.id, emp.first_name, emp.last_name, emp.manager_id, mngr.first_name AS manager_name
FROM employee AS emp
LEFT JOIN employee AS mngr
ON emp.manager_id = mngr.id;

-- show all relevant employee data
SELECT 	employee.id, 
		    employee.first_name, 
        employee.last_name, 
        role.title AS title,
        role.salary AS salary,
        department.name AS department,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager 
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department 
ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;