![alt text]("../../assets/logomin.png)

# LEARNY

## Zarządzanie korepetycjami nigdy nie było prostsze.

#### Aplikacja służąca do zarządzania korepetycjami. [opis w trakcie budowy]

## Specyfikacja biznesowa (w trakcie rozwoju)

- [Plany rozwoju aplikacji][roadmap]

## Wybrane technologie

- [Stack technologiczny][stack]

## Schemat bazy danych

- [Schemat DB][database]

## Design

- [Design - strona domowa][home]
  - [Rejestracja][signup]
  - [Logowanie][login]
  - [Panel nauczyciela][panel]
  - [Wyszukiwanie lekcji][find-lesson]
  - [Rezerwowanie lekcji][book]

[home]: docs/home.md
[signup]: docs/signup.md
[login]: docs/login.md
[panel]: docs/panel.md
[find-lesson]: docs/find-lesson.md
[book]: docs/book.md
[roadmap]: docs/roadmap.md
[database]: docs/database.md
[stack]: /docs/stack.md

## Get in Touch

- [GitHub Issues][issues]

[issues]: "https://github.com/trojano31/tutoringApp/issues

## Run project in dev mode (hot reloading)

\$ `docker-compose up`

If any changes are made to Dockerfiles you have to run `docker-compose build`

(this will take some time on the 1st time as it has to build the images)

- Frontend :3000
- Backend :5000
- Database :5432
