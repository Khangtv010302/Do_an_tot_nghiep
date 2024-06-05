# Vaccination

Copyright © 2024 by khangtv01302@gmail.com  
programing language: Java, JavaScript
---

# Getting Started
## Table of Contents
- Project Structure
- Prerequisites
- Build 
  - Backend (Spring Boot)
  - Frontend (React)
### Project Structure
- Do_an_tot_nghiep
  - vaccine (Backend)
  - vaccine-ui (Frontend)
- README.md
### Prerequisites
- JDK version: 17
- Build tool: Maven 4.0.0 or higher
- Git repo: git clone https://github.com/Khangtv010302/Do_an_tot_nghiep.git
- Spring boot version: 4.3.0 or higher
- Spring boot database: Mysql 
- Node js: 20.11
- React version: 18.x or higher
- Nginx version: 1.25.5
### Build
- React
  - Navigate to project folder
  - Type "cmd" in path input then press enter key
  - Type "npm run build" then press enter key & waiting execution
  - You see directory dist
- Spring Boot
  - Navigate to project folder
  - Type "cmd" in path input then press enter key
  - Type "mvn clean install -DskipTests" then press enter key & waiting execution
### Deployment
  - React
    - Dowload nginx and extract your directory
    - To serve your Spring application using Nginx, you can use the following configuration:
    - ```nginx 
      server {
      listen       5173;
      server_name  localhost;

      #charset koi8-r;

      #access_log  logs/host.access.log  main;
      index index.html;
      location / {
          root   Your path dist;
          index  index.html index.htm;
          try_files $uri /index.html;
          }
      }
    - Run nginx.exe
- Spring Boot
  - Navigate to target folder then copy vaccine.jar to your folder deployment
  - Start vaccine.jar by command "java -jar vaccine.jar", if there is not issue, it is ready at moment
