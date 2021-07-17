# Assessment - Puppeteer
## _an assessment for learning puppeteer_

Adil Ablimit
## About this project
> This project is built using pupeteer and some other npm dependencies, the main purpuse of this project is: automate the registeration and logging in functioality of https://ti***.com

## Features

- Automate the registeration process of the site(https://ti***.com).
- util functions automatically generate random user data
-  - email, password, DOB: randomly generate these datas for every registeration attemps
-  - `_note: since, there are some different type of email validation method, at some point the registeration process may fail_`
-  - randomUserAgent: to spoof browser fingerPrint
-  - date of birth: generating process according to target sites DOB range limitation (1921 ~ 2008)
-  apis for login, registeration functionslity using express.js
-  babel for compiling JS
-  JS classess
-  recursion algoritm to repeat the function


## Tech

This project uses a number of open source projects to work properly:

- [puppeteer] - Automation framework
- [node.js] - evented I/O for the backend
- [babel] - JS compiler
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [random-useragent] - generating random user agent
- [recursion] - algoritm to repeat the function

## Installation

Install the dependencies and devDependencies and start the server.

```sh
> git clone https://github.com/musafir928/adil-assessment.git
> cd adil-assessment
> npm i
> npm run start
> app is listening on port: 3000
```

## Routes(Api)

| Featute | Route | note |  
| ------ | ------ | ------ |
| Register | localhost://3000/register/:count | _count => the counts of users to be created_ |
| Login | localhost://3000/login/:id | _id => id of the user in the list to login_ |
| submitInvitation | localhost://3000/submit-invitation/:id | _id => id of the user in the list to login and submit the link received_ |
| Test | localhost://3000/test | _to test the functionlities_ |

## Todo
#### `this project is not completed yet: my robot gets respond <you're blocked>`
`_Really appreciated from target website's security settings!_`

|     | Todo |
|--------|--------|
|1| set up proxy server to prevent from blocking |
|2| subscribe a user to make it topMember and send family subscription link to other users |
|3| complete submit invitation functionality |
|4| learn from great developers from target website how to develop such a great website  |

