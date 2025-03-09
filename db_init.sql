CREATE DATABASE guestbook;

USE guestbook;

DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
	id INT auto_increment,
    fname VARCHAR(255),
    lname VARCHAR(255),
    job VARCHAR(255),
    company VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(255),
    meet VARCHAR(10),
    other VARCHAR(255),
    mailing VARCHAR(255),
    message VARCHAR(255),
    format VARCHAR(10),
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (id)
);

INSERT INTO contacts (
	fname,
    lname,
    job,
    company,
    linkedin,
    email,
    meet,
    other,
    mailing,
    message,
    format
) VALUES (
	"Xavier",
    "Bradley",
    "Cashier",
    "Walmart",
    "xavierbradleylinkedin",
    "bradley.xavier@student.greenriver.edu",
    "meetup",
    "nothing",
    "mail",
    "Nice to meet you!",
    "html"
), (
	"John",
    "Doe",
    "Cook",
    "Applebees",
    "johndoelinkedin",
    "john.doe@mail.com",
    "jobfair",
    "nothing",
    "mail",
    "Hi there!",
    "text"
), (
	"Jane",
    "Doe",
    "Writer",
    "bookcompany",
    "janedoelinkedin",
    "jane.doe@mail.com",
    "meetup",
    "nothing",
    "mail",
    "Can we meet up to discuss employment",
    "html"
);
