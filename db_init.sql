CREATE TABLE genre (
  genreId int(11) NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  PRIMARY KEY (genreId)
);

CREATE TABLE bookCover (
	bookCoverId int NOT NULL AUTO_INCREMENT,
	title varchar(200) NOT NULL,
	authorName varchar(200) NULL,
	thumbnailUrl varchar(400) NULL,
	imageUrl varchar(400) NULL,
	portfolioOrder int NULL,
	showInPortfolio bit NOT NULL,
	genreId int NULL,
	PRIMARY KEY (bookCoverId),
	FOREIGN KEY (genreId) REFERENCES genre(genreId) ON DELETE SET NULL
);

CREATE TABLE series(
	seriesId int NOT NULL AUTO_INCREMENT,
	seriesName varchar(256) NULL,
	seriesPrice decimal(18, 0) NULL,
	PRIMARY KEY (seriesId)
);

CREATE TABLE premadeSeries(
	seriesid int NOT NULL,
	premadeId int NOT NULL,
	orderInSeries int NOT NULL,
	FOREIGN KEY (seriesId) REFERENCES series(seriesId)
);


CREATE TABLE premade(
	premadeId int NOT NULL,
	bookCoverId int NOT NULL,
	code varchar(30) NOT NULL,
	price decimal(18, 0) NOT NULL,
	sold bit NOT NULL,
	displayInStore bit NOT NULL,
	premadeOrder int NULL,
	dateAdded datetime NOT NULL,
	purchaseDate datetime NULL,
	seriesId int NULL,
	PRIMARY KEY (premadeId),
	FOREIGN KEY (bookCoverId) REFERENCES bookCover(bookCoverId) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE premadeSeries ADD FOREIGN KEY (premadeId) REFERENCES premade(premadeId);



CREATE TABLE applicationRole(
	id int NOT NULL,
	name varchar(256) NOT NULL,
	normalizedName varchar(256) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE applicationUser(
	id int NOT NULL,
	userName varchar(256) NOT NULL,
	normalizedUserName varchar(256) NOT NULL,
	email varchar(256) NULL,
	normalizedEmail varchar(256) NULL,
	emailConfirmed bit NOT NULL,
	passwordHash varchar(256) NULL,
	phoneNumber varchar(50) NULL,
	phoneNumberConfirmed bit NOT NULL,
	twoFactorEnabled bit NOT NULL,
	firstName varchar(256) NULL,
	lastName varchar(256) NULL,
	PRIMARY KEY (id)
);

CREATE TABLE applicationUserRole(
	userId int NOT NULL,
	roleId int NOT NULL,
	FOREIGN KEY (userId) REFERENCES applicationUser(id),
	FOREIGN KEY (roleId) REFERENCES applicationRole(id)
);
