CREATE TABLE barPatrons (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE barCategories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    seq INT,
    PRIMARY KEY (id)
);
CREATE TABLE barStock (
    id INT NOT NULL AUTO_INCREMENT,
    category INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES barCategories(id)
);
CREATE TABLE barOrders (
    id INT NOT NULL AUTO_INCREMENT,
    drink INT NOT NULL,
    patron INT NOT NULL,
    created DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (drink) REFERENCES barStock(id),
    FOREIGN KEY (patron) REFERENCES barPatrons(id)
);
ALTER TABLE barStock ADD inStock BOOLEAN NOT NULL AFTER name;
CREATE TABLE barSettings (
    id INT NOT NULL AUTO_INCREMENT,
    setting VARCHAR(255) NOT NULL,
    val VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO barSettings (setting,val) VALUES
	('open',1),
	('admin','$2y$10$M6Rwmmc3UYsf0l09Al9qD.3ugh0o4EMOWIDOa7J/N6zW0dS1ZvWdC')
;
ALTER TABLE barOrders ADD served BOOLEAN NOT NULL AFTER patron;