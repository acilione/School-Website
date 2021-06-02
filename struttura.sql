CREATE TABLE `distaccamento` (
    `id` int(11) primary key not null unique,
    `via` varchar(100) not null unique,
    `civico` int(11) not null unique,
    `img_src` varchar(255) default "https://s3.amazonaws.com/cdn-media.teknoring/wp-content/uploads/2015/05/wpid-24716_.jpg"
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `aula` (
    `id` int(11) primary key not null unique,
    `piano` int(11) not null,
    `numero` int(11) not null,
    `capienza` int(11) not null,
    `distaccamento` int(11) not null,
    index xdistaccamento(`distaccamento`),
    unique(`distaccamento`, `piano`, `numero`),
    foreign key(`distaccamento`) references distaccamento(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `circolare` (
    `id` int(11) primary key not null unique auto_increment,
    `data` date not null,
    `titolo` varchar(255) not null,
    `contenuto` text not null,
    unique(`data`, `titolo`, `contenuto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `classe` (
    `id` int(11) primary key not null unique,
    `aula` int(11) not null unique,
    `numero` int(11) not null,
    `sezione` char(1) not null,
    `numero_alunni` int(11) default 0,
    unique(`numero`, `sezione`),
    index xaula(`aula`),
    foreign key(`aula`) references aula(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `giorni_settimana` (
    `id` int(11) primary key not null unique,
    `giorno` varchar(20) not null unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orari` (
    `id` int(11) primary key not null unique,
    `orario` time not null unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ruoli_lavoratore` (
    `id` int(11) primary key not null unique,
    `ruolo` varchar(30) not null unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `salari` (
    `id` int(11) primary key not null unique,
    `salario` float not null unique,
    index xid(`id`),
    foreign key(`id`) references ruoli_lavoratore(`id`) on update cascade on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `lavoratore` (
    `id` int(11) primary key not null unique auto_increment,
    `cf` varchar(16) not null unique,
    `password` varchar(255) not null,
    `email` varchar(255) not null unique,
    `nome` varchar(30) not null,
    `cognome` varchar(30) not null,
    `data_nascita` date not null,
    `eta` int(11) not null,
    `ruolo` int(11) not null,
    `inizio` date not null,
    `sesso` char(1) not null,
    `profile_img` varchar(255) default "imgs/template-profile-img.jpg",
    index xruolo(`ruolo`),
    foreign key(`ruolo`) references ruoli_lavoratore(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `disciplina` (
  `id` int(11) primary key not null unique,
  `nome_disciplina` varchar(20) not null unique
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `insegnamento` (
    `id` int(11) primary key not null unique auto_increment,
    `lavoratore` int(11) not null,
    `classe` int(11) not null,
    `disciplina` int(11) not null,
    `giorno_settimana` int(11) not null,
    `ora` int(11) not null,
    unique(`classe`, `giorno_settimana`, `ora`),
    index xlavoratore(`lavoratore`),
    index xclasse(`classe`),
    index disciplina(`disciplina`),
    index xgiornosettimana(`giorno_settimana`),
    index xora(`ora`),
    foreign key(`lavoratore`) references lavoratore(`id`) on update cascade,
    foreign key(`classe`) references classe(`id`) on update cascade,
    foreign key(`disciplina`) references disciplina(`id`) on update cascade,
    foreign key(`giorno_settimana`) references giorni_settimana(`id`) on update cascade,
    foreign key(`ora`) references orari(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `alunno` (
    `id` int(11) primary key not null unique auto_increment,
    `cf` varchar(16) not null unique,
    `password` varchar(255) not null,
    `email` varchar(255) not null unique,
    `nome` varchar(30) not null,
    `cognome` varchar(30) not null,
    `data_nascita` date not null,
    `eta` int(11) not null,
    `classe` int(11) not null,
    `sesso` char(1) not null,
    index xclass(`classe`),
    foreign key(`classe`) references classe(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `presenza_alunno` (
    `id` int(11) primary key not null unique auto_increment,
    `alunno` int(11) not null,
    `data` date not null,
    `presenza` char(1) not null,
    unique(`alunno`, `data`),
    unique (`alunno`, `data`, `presenza`),
    index xstudente(`alunno`),
    foreign key(`alunno`) references alunno(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `voti_attuali_alunno` (
    `id` int(11) primary key not null unique auto_increment,
    `alunno` int(11) not null,
    `data` date not null,
    `disciplina` int(11) not null,
    `voto` float default null,
    `tipologia_voto` varchar(20) default null,
    index xstudent(`alunno`),
    index xsubject(`disciplina`),
    unique(`alunno`, `data`, `disciplina`),
    foreign key(`alunno`) references alunno(`id`) on update cascade,
    foreign key(`disciplina`) references disciplina(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `messaggi_studenti` (
  `id` int(11) primary key not null unique auto_increment,
  `id_studente` int(11) not null,
  `testo_messaggio` text not null,
  `post_timestamp` timestamp not null default current_timestamp(),
  index xidstudent(`id_studente`),
  foreign key(`id_studente`) references alunno(`id`) on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

---------------------------------------------------------------------------------

/*Popolazione tabelle - da effettuare in ordine!*/

INSERT INTO `distaccamento` (`id`, `via`, `civico`, `img_src`) VALUES
(1, 'Via Possidonea', 35, 'https://s3.amazonaws.com/cdn-media.teknoring/wp-content/uploads/2015/05/wpid-24716_.jpg'),
(2, 'Via Giuseppe Garibaldi', 45, 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/475000/475457-Los-Angeles.jpg'),
(3, 'Via Guglielmo Secondo', 54, 'https://anteritalia.org/wp-content/uploads/2018/12/polo-scolastico-collecchio.jpg');

INSERT INTO `aula` (`id`, `piano`, `numero`, `capienza`, `distaccamento`) VALUES
(1, 1, 1, 25, 1),
(2, 1, 2, 25, 1),
(3, 1, 3, 25, 1),
(4, 1, 4, 25, 1);

INSERT INTO `classe` (`id`, `aula`, `numero`, `sezione`, `numero_alunni`) VALUES
(1, 1, 1, 'A', 0),
(2, 2, 1, 'B', 0),
(3, 3, 2, 'C', 0),
(4, 4, 3, 'D', 0);

INSERT INTO `giorni_settimana` (`id`, `giorno`) VALUES
(1, 'lunedi'),
(2, 'martedi'),
(3, 'mercoledi'),
(4, 'giovedi'),
(5, 'venerdi'),
(6, 'sabato');

INSERT INTO `disciplina` (`id`, `nome_disciplina`) VALUES
(1, 'italiano'),
(2, 'matematica'),
(3, 'inglese'),
(4, 'storia'),
(5, 'informatica'),
(6, 'latino');

INSERT INTO `orari` (`id`, `orario`) VALUES
(1, '08:00:00'),
(2, '09:00:00'),
(3, '10:00:00'),
(4, '11:00:00'),
(5, '12:00:00'),
(6, '13:00:00');

INSERT INTO `ruoli_lavoratore` (`id`, `ruolo`) VALUES
(1, 'preside'),
(2, 'docente'),
(3, 'segretario');

INSERT INTO `salari` (`id`, `salario`) VALUES
(1, 2000),
(2, 1200),
(3, 1000);

INSERT INTO `circolare` (`id`, `data`, `titolo`, `contenuto`) VALUES
(1, '2021-05-20', 'Augurio ai ragazzi', 'In bocca a lupo raga'),
(2, '2021-05-22', 'Saluto ai ragazzi', 'Ciao raga fortissimi'),
(3, '2021-05-25', "STAR WARS       Episode IV       A NEW HOPE", "A long time ago, in a galaxy far, far, away...\r\n\r\n              
                    A vast sea of stars serves as the backdrop for the main title. \r\n              
                    War drums echo through the heavens as a rollup slowly crawls \r\n               
                    into infinity.\r\n\r\n                    It is a period of civil war. Rebel spaceships, \r\n                   
                    striking from a hidden base, have won their first \r\n                    
                    victory against the evil Galactic Empire.\r\n\r\n      
                    During the battle, Rebel spies managed to steal \r\n                    
                    secret plans to the Empire\'s ultimate weapon, the \r\n                    
                    Death Star, an armored space station with enough \r\n                    
                    power to destroy an entire planet.\r\n\r\n                    
                    Pursued by the Empire\'s sinister agents, Princess \r\n                    
                    Leia races home aboard her starship, custodian of \r\n                    
                    the stolen plans that can save her people and \r\n                    
                    restore freedom to the galaxy...\r\n\r\n               
                    The awesome yellow planet of Tatooine emerges from a total \r\n              
                    eclipse, her two moons glowing against the darkness. A tiny \r\n               
                    silver spacecraft, a Rebel Blockade Runner firing lasers \r\n               
                    from the back of the ship, races through space. It is pursed \r\n               
                    by a giant Imperial Stardestroyer. Hundreds of deadly \r\n               
                    laserbolts streak from the Imperial Stardestroyer, causing \r\n               
                    the main solar fin of the Rebel craft to disintegrate.\r\n\r\n");

/*TRIGGER*/
delimiter //
CREATE TRIGGER `aggiorna_numero_alunni_classe_insert` AFTER INSERT ON `alunno`
 FOR EACH ROW BEGIN
UPDATE classe c SET
c.numero_alunni = c.numero_alunni+1
WHERE c.id = any(SELECT new.classe FROM alunno);
END //
delimiter ;

delimiter //
CREATE TRIGGER `aggiorna_numero_alunni_classe_update` AFTER UPDATE ON `alunno`
 FOR EACH ROW BEGIN
 IF !(new.classe <=> OLD.classe) THEN
UPDATE classe c SET
c.numero_alunni = c.numero_alunni-1
WHERE c.id = any(SELECT old.classe FROM alunno);
UPDATE classe c SET
c.numero_alunni = c.numero_alunni+1
WHERE c.id = any(SELECT new.classe FROM alunno);
END IF;
END //
delimiter ;

delimiter //
CREATE TRIGGER `capienza_aula_ecceduta_insert` BEFORE INSERT ON `alunno`
 FOR EACH ROW BEGIN
IF EXISTS(
SELECT * FROM alunno a 
JOIN classe c ON c.id = a.classe
JOIN aula ON aula.id = c.aula
WHERE a.classe = new.classe AND 
c.numero_alunni+1 > aula.capienza)
THEN SIGNAL SQLSTATE '45000' SET 
MESSAGE_TEXT = 'capienza aula ecceduta: impossibile inserire alunno';
END IF;
END //
delimiter ;

/*Alunno template*/
INSERT INTO `alunno` (`id`, `cf`, `password`, `email`, `nome`, `cognome`, `data_nascita`, `eta`, `classe`, `sesso`) VALUES
(1, 'BMBLGU06P14C351O', '$2y$10$BvYilH7r9TtAgmsV6vo7FueSSjJYWJ4u/4ffFIwPoijofDTuUSI0a', 'luigibombatomica@gmail.com', 'Luigi', 'Bombatomica', '2006-09-14', 15, 1, 'M');
---- password in chiaro:   Mtg2tt8t ------- (generata col file pass.php)

/*Alunno template*/
INSERT INTO `alunno` (`id`, `cf`, `password`, `email`, `nome`, `cognome`, `data_nascita`, `eta`, `classe`, `sesso`) VALUES
(2, 'PRDPLG06P27C351R', '$2y$10$b3WVHfv5.vqPbBlxJ5ydUe4ZDYxupmWPJ8TE3NA4rcLlBPPsQRPf.', 'pierluigipardo@gmail.com', 'Pierluigi', 'Pardo', '2006-06-14', 15, 1, 'M');
---- password in chiaro:   UQWzndH5 ------- (generata col file pass.php)

/*Preside template*/
INSERT INTO `lavoratore` (`id`, `cf`, `password`, `email`, `nome`, `cognome`, `data_nascita`, `eta`, `ruolo`, `inizio`, `sesso`, `profile_img`) VALUES
(1, 'MRTMGN68E54C351T', '$2y$10$1rkqYc.FQ2jkUa3insLg6eO3PT31lg.oUwM5lBAQIlM1yo5nXrk4W', 'morganamoretti@gmail.com', 'Morgana', 'Moretti', '1968-05-14', 53, 1, '2019-10-20', 'F', 'https://www.ansa.it/webimages/img_457x/2021/2/8/87e94f060c06f11b2fd9c35c0262fb15.jpg');
---- password in chiaro:  C6abw2H3 -------- (generata col file pass.php)

/*Docente template*/
INSERT INTO `lavoratore` (`id`, `cf`, `password`, `email`, `nome`, `cognome`, `data_nascita`, `eta`, `ruolo`, `inizio`, `sesso`, `profile_img`) VALUES
(2, 'NCCRML93H10C351A', '$2y$10$I7Yp/KyFdc95XRqurv6qceVX1z8Lr05cgHhHL6Z4BI90MbZ4ToNwW', 'romolonucci@hotmail.it', 'Romolo', 'Nucci', '1993-06-10', 27, 2, '2020-09-20', 'M', 'https://spettacolo.periodicodaily.com/wp-content/uploads/2021/01/Dwayne-Johnson.jpg');
---- password in chiaro:  4WjD9IRK -------- (generata col file pass.php)
        
/*Segretario template*/ 
INSERT INTO `lavoratore` (`id`, `cf`, `password`, `email`, `nome`, `cognome`, `data_nascita`, `eta`, `ruolo`, `inizio`, `sesso`, `profile_img`) VALUES
(3, 'LCCRTM58C12C351W', '$2y$10$iDn8lAjmEOY7NGHErULcIuJGsu1LWCt8EOlXS.eOceuz.gIOGZmzu', 'artemiolucchesi@hotmail.it', 'Artemio', 'Lucchesi', '1973-06-14', 47, 3, '2021-05-07', 'M', 'https://www.bresciaoggi.it/image/policy:1.8086131:1597182308/image.jpg?f=16x9&h=421&w=750&$p$f$h$w=597732e');
---- password in chiaro:  NPQgEX5O -------- (generata col file pass.php)

INSERT INTO `insegnamento` (`id`, `lavoratore`, `classe`, `disciplina`, `giorno_settimana`, `ora`) VALUES
(1, 2, 1, 2, 1, 2),
(2, 2, 3, 4, 2, 3),
(3, 2, 4, 5, 3, 5);

INSERT INTO `presenza_alunno` (`alunno`, `data`, `presenza`) VALUES
(1, '2021-12-02', 'P'),
(2, '2021-12-02', 'A');

INSERT INTO `voti_attuali_alunno` (`alunno`, `data`, `disciplina`, `voto`, `tipologia_voto`) VALUES
(1, '2021-12-02', 2, 9, 'scritto'),
(2, '2021-12-05', 2, 8, 'orale');
