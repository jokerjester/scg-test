# SCG Assignment

### What does this project do
This project contains the answers of scg assignment where each answer is deloped as an API path
- Find XYZ
- Google Place
- Line Messaging

### How is the project structure
- node js (express)
- use mongo as database

### How is the database structure
- collection name: samples

| field name   |      data type      |  required | description |
| :----------: |:-------------:      |  :------: | ----------  |
| \_id         |  string             |   true    |  Auto generated           |
| keywaord     |    string           |   true    |             |
| answer       | string              |   true    |             |


### How to use

Run Project:
Make sure that you install a npm in your computer

Clone/checkout then go to project's directory
```
 npm start
```
> *** note that base uri is localhost:80 

API Docs (Available after project's running)
```
http://localhost:80/api-docs
```

### Line Messaging
- Scan this QR code to add my line bot as your friend

![Scan this QR code to add my line bot as your friend](https://github.com/jokerjester/scg-test/blob/master/ixa4795r.png)


- You can teach bot by using teach-bot API 
