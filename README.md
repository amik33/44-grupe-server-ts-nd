![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Security Status](https://img.shields.io/security-headers?label=Security&url=https%3A%2F%2Fgithub.com&style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)
[![Discord](https://discord.com/api/guilds/571393319201144843/widget.png)](https://discord.gg/dRwW4rw)

# Server ts

_node.js project_

<br>

## 🌟 About

This project is for educational porpuses only. Pull request are welcome, but priority for project authors! Thank you for your cooperation!

Site published at: https://amik33.github.io/44-grupe-server-ts-nd/

Design: []()
## 🎯 Project features/goals

-   Github pages
-   README / [markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
-   favicon
-   fixed-width content
-   `<header>`, `<footer>`
-   FontAwesome font/icons
-   HTML entities
-   pseudo-elements

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/amik33/44-grupe-server-ts-nd.git
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
3. Run the server
    ```sh
    npm run dev
    ```

### 🧪 Running tests

There is no tests for this project.

## 🎅 Authors

Arunas: [Github](https://github.com/amik33)

## ⚠️ License

Distributed under the MIT License. See LICENSE.txt for more information.

## 🔗 Other resources

## How to use

> **POST: /api/user**

Request object:

```json
{
    "id": 1,
    "name": "Vardenis",
    "email": "vp@psl.lt",
    "password": "asd123",
    "age": 55
}
```

Response object, if all goes well:

```json
{
    "status": true,
    "message": "User created"
}
```

Response object, if any error:

```json
{
    "status": false,
    "message": "User already exists, dublicate email"
}
```

> **GET: /api/user/[ID]**

Response object:

-   excluding password;

```json
{
    "id": 1,
    "name": "Vardenis",
    "email": "pv@psl.lt",
    "created-at": "2023-06-30 12:16:43"
}
```

> **GET: /api/user-by-email/[EMAIL]**

Response object:

-   excluding password;

```json
{
    "id": 1,
    "name": "Vardenis",
    "email": "vp@psl.lt"
}
```