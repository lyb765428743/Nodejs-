create table lunyu (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  content text default null
) engine = INNODB, charset=utf8;

create table tangshi (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  content text default null,
  author varchar (20) not null
) engine = INNODB, charset=utf8;
create table ts_author (
  id int(11) not null primary key auto_increment,
  name varchar (20) not null,
  description text default null
) engine = INNODB, charset=utf8;
create table songshi (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  content text default null,
  author varchar (20) not null
) engine = INNODB, charset=utf8;
create table ss_author (
  id int(11) not null primary key auto_increment,
  name varchar (20) not null,
  description text default null
) engine = INNODB, charset=utf8;
create table ci (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  content text default null,
  author varchar (20) not null
) engine = INNODB, charset=utf8;
create table ci_author (
  id int(11) not null primary key auto_increment,
  name varchar (20) not null,
  description text default null
) engine = INNODB, charset=utf8;
create table shijing (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  chapter varchar (10) not null,
  section varchar (10) not null,
  content text default null
) engine = INNODB, charset=utf8;
