INSERT INTO department (name)
VALUES 	('produce'),
		    ('meats'),
        ('dairy'),
        ('frontend'),
        ('bakery'),
        ('dry goods'),
        ('household');

INSERT INTO role (title, salary, department_id)
VALUES	('manager', 20, 1),
		    ('manager', 20, 2),
        ('manager', 20, 3),
        ('manager', 20, 4),
        ('manager', 20, 5),
        ('merchandiser', 15.50, 5),
        ('cashier', 15.50, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	('Korey', 'Olson', 1, 11),
		    ('Gale', 'Spencer', 1, 42),
        ('Alex', 'Vega', 2, 42),
        ('Amy', 'Sexton', 2, 11),
        ('Denise', 'Klein', 3, 11);