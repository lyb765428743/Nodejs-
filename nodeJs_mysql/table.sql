create table lunyu (
  id int(11) not null primary key auto_increment,
  title varchar(255) not null,
  content text default null
) engine = INNODB, charset=utf8;