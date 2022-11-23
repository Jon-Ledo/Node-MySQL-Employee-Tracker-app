INSERT INTO department (name)
VALUES 	('fresh_foods'),
	('dry_goods'),
        ('front_end'),
        ('store_manager');

INSERT INTO role (title, salary, department_id)
VALUES 	('foods_manager', 20, 1),
	('foods_merchandiser', 15.5, 1),
	('dry_goods_manager', 20, 2),
        ('dry_goods_merchandiser', 15.5, 2),
        ('front_end_manager', 20, 3),
        ('cashier', 15.5, 3),
        ('supervisor', 17, 3),
        ('store_manager', 28, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	('Korey', 'Olson', 1, 7),
	('Gale', 'Spencer', 2, 1),
        ('Alex', 'Vega', 3, 7),
        ('Amy', 'Sexton', 4, 3),
        ('Denise', 'Klein', 5, 7),
        ('Olivia', 'Simmons', 6, 5);
        
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Tom', 'Nook', 8);