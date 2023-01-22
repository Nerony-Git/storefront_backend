# Store Front Backend   

**UDACITY - ALX Full-Stack Developer Nanodegree program.**  
**Project 2️⃣**

## Overview  

This project is an API for a shopping application.

## ⏬ Installation  

> **_Clone repository_**  
>> Navigate to the directory you want to install the project, open command prompt from the directory and type the code below to clone this repository.  
>>  
>>```sh
>> git clone https://github.com/Nerony-Git/storefront_backend.git
>>```  
>  
> **_Open directory API was cloned to_**  
>> Navigate to the directory using the code below:  
>>  
>>```sh
>> cd storefront_backend
>>```  
>  
> **_Install Dependecies_**  
>> the code below will install all package dependencies needed to run this project  
>>  
>> ```sh
>>  npm install
>> ```  
>
> **_Set up Database_**  
>> Create a database using "POSTGRESQL". You can download it from https://www.postgresql.org/download/.  
>> Depending on the location you installed the postgresql and user details, run the code below to gain access to postgres
>>  
>> ```sh
>>  psql -h 127.0.0.1 -U postgres;
>> ```  
>>
>> Create a user with the details "admin" and password "admin@root" as indicated in the code below
>>  
>> ```sh
>>  CREATE USER admin WITH ENCRYPTED PASSWORD 'admin@root';
>> ```  
>>
>> Create a database with name "storefront"
>>  
>> ```sh
>>  CREATE DATABASE storefront;
>> ```  
>>
>> Run the code below to grant access on the database to the user admin
>>  
>> ```sh
>>  GRANT ALL PRIVILEGES ON DATABASE storefront TO admin;
>> ```  
>>
>> Connect to the storefront database.
>>  
>> ```sh
>>  \c storefront
>> ```  
>>
>> Execute the migration script to create all data tables needed to run the application.
>>  
>> ```sh
>>  npx db-migrate up
>> ```  
>>
> 
> **_Set up Environment_**  
>> create a ".env" file in the directory which will hold all database configuration settings. Copy the codes below and paste in the .env file.
>>  
>> ```sh
>>  POSTGRES_HOST=localhost  
>>  POSTGRES_DB=storefront  
>>  POSTGRES_TEST_DB=storefront_test  
>>  POSTGRES_USER=admin  
>>  POSTGRES_PASSWORD=admin@root  
>>  ENV=dev  
>>  BCRYPT_PASSWORD=speak-friend-and-enter  
>>  SALT_ROUNDS=10  
>>  TOKEN_SECRET=UdacityStore  
>>  TOKEN_EXPIRES=1d  
>> ```  
>> 
>  

## 🔑 API Endpoint, Parameters & Port

> **_Port_**
>> The server listens on port **3000**.
>>
>> http://localhost:3000
>>  
>
> **_Parameters_**
>> The parameters accepted by the API is described in the [REQUIREMENTS.md](REQUIREMENTS.md) file. 
>>  
>  
> **_API Endpoint_**
>> Refer to the [REQUIREMENTS.md](REQUIREMENTS.md) File to view all the endpoints for the API.  
>>  
>  


## 📝 Scripts
> **_Run Server_**
>> To start the server, type the code below in the terminal.
>>
>>```sh
>> npm run start
>>```  
>  
> **_Prettier_**
>> To format the code use the code below.
>>
>>```sh
>> npm run prettier
>>```  
>  
> **_Lint_**
>> To check for errors in the code and confirm the style of the code is consistent, type the code below in the terminal.
>>
>>```sh
>> npm run lint
>>```  
>  
> **_Test_**
>> To run a unit test, type the code below in the terminal.
>>
>>```sh
>> npm run test
>>```  
>  
> **_Build Only_**
>> To compile the typescript to javascript for production, type the code below in the terminal.
>>
>>```sh
>> npm run build
>>```  
>  
