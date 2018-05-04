#UMS

User Management System

Dev Set up steps:

1, Set up node.js and npm

2, checkout the code

3, run npm install

4, setup mysql database server and use 3306 as the port, and also:

4.1, create a user(user name: app_user, password: Password!), and give DBA previlege to all schemas.

4.2, create a database called ums

5, run ```node ./db/scripts/generateSequelizeCLIConfig.js```. This should create a ./scripts/generateSequelizeCLIConfig.js file.
   In Windows, run ```node ./db/scripts/generateSequelizeCLIConfig.js```.

6, run ```node_modules/sequelize-cli/bin/sequelize db:migrate```. This will update any database changes. In Windows, run ```node ./node_modules/sequelize-cli/bin/sequelize db:migrate```.

7, run ```node_modules/sequelize-cli/bin/sequelize db:seed:all``` to add all the default data FOR ALL FOLLOWING UPDATES. In Windows, run ```node ./node_modules/sequelize-cli/bin/sequelize db:seed:all```.

8, to run tests, use one of the following:

8.1, ```npm run test```

8.2, ```npm run test-all```

8.3, ```npm run test-integration```

8.4, ```npm run test-unit```

9, to start the server, run:
```npm run start```


================================================

API Documentation

================================================

url: "/users/signout"
verb: POST
auth headers: true
request: {email: string}
response: {result: boolean, exception: string|optional}
note: res.exception only presents when result is false.