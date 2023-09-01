# Welcome To Milestone 2 
RESTful API with expressjs, nodejs, and swagger

## 👋 Keep In Touch With Me 
**fadliaryadinata011@gmail.com**

## Authors

👤 **Fadli Aryadinata**

- GitHub: [@fadli131](https://github.com/fadli131)
- Deployment Link (https://calm-teal-bull-cape.cyclic.app/api-docs/)

## Coffee Shop Order & Payment

The following is a simple programming flow about ordering menus and ordering menu payment systems.

### Language used 
- Javascript (NodeJS & ExpressJS)

### Tools
- VS Code
- Git and Github    
- Swagger UI
- Postman
- MongoDB (NoSQL Database)
- Railway
- Cyclic

## FLOWCHART
<img width="700" alt="Screenshot 2023-07-28 205741" src="https://github.com/RevoU-FSSE-2/week-11-fadli131/assets/109584701/ac75c5f6-dbb4-4ba2-a50a-7cf9ba0e4ca2">

## Getting Started 

### Regist Account

**POST**/auth/register
```
{
  "username": "maker1",
  "role": "maker",
  "password": "Password123"
}
```
### Login Account

**POST**/auth/login
```
{
  "username": "fadli12345678",
  "password": "Fadli12345678"
}
```
### Create a new order

**POST**/order
```
{
  "menuItemId": "kopi susu",
  "quantity": 1
}
```

### Order Status

**GET**/order
```
{
    input Bearer Token
}
```

### Order Status

**GET**/order
```
{
    input Bearer Token
}
```

### Update Order Status by ID

**PATCH**/order/{id}
```
{
  "status": "approved"
}
```

### Delete Order by ID

**DEL**/order/{id}
```
{
    input order ID
}
```

### Create Transfer

**POST**/transfer
```
{
  "menuItemId": "kopi coklat",
  "currency": "Rp",
  "amount": 1000,
  "username": "fadli123"
}
```

### Transfer Status

**GET**/transfer
```
{
    Get a list of transfer status
}
```

### Update Status Transfer by ID

**PATCH**/transfer/{id}
```
{
  "status": "rejected"
}
```

### Delete Transfer Request

**DEL**/transfer/{id}
```
{
  input transfer ID
}
```

### Update Status Transfer history

**GET**/transfer/histroy