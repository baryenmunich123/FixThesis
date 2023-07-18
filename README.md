# Start project:

1. yarn install (install all dependencies for `client` & `server`)
2. Run `yarn all` to run server & client at the same time

add package to specific for client or server:

## For client:
example: yarn workspace `client` add react react-dom 

## For server:
1. example: yarn workspace `server` add <package-need> 

2. Config your own env
    a. Create .env file in server folder
    b. Config as file .env.example which suitable for your own local set-up

```mermaid
---
   title: REQUEST PORTAL SCHEMA DESIGN 
---
erDiagram
    USER {
        int id PK
        int roleId FK
        string username
        string password
    }

    ROLES {
        int id PK
        string name
    }

    PROFILE {
        int id PK
        int ticketId FK
        string firstName
        string lastName
    }

    REQUEST_TICKET {
        int id PK
        int userId FK
        Date createAt 
        Date approveAt 
        string status
        JSON ticket_data
        small_int current_step
        string noteReview
    }
    
    FORM_TEMPLATE {
        int id PK
        string formName
        string lastName
        JSON fields
        bytea templateFile
    }

    USER || -- || PROFILE : has
    REQUEST_TICKET || -- || FORM_TEMPLATE : belongTo
    PROFILE || -- o{ REQUEST_TICKET : has
    USER || -- |{ ROLES : has
```
