# EventTrackerProject
### Overview
Book Event is an application to track books you have read. This application is designed for book lovers of all ages and genres who want to keep track of books they have read. The user has a list of books they have read and can add or remove books from the list. The user can view the full list of books, add, update, and remove any book they desire in order to keep track of their favorites, read, or their specific list-like needs.

### How To Use
Currently, this application does not have a front end. It is something that will be built upon in the future. The application can be run as a spring boot application and functions in Postman.

| HTTP Method | Resource URI | Request Body | Returns |
|-------------|--------------|--------------|---------|
|GET          |`api/books/{id}`|            |Book     |
|POST         |`api/books`   |New Book      |New Book |
|PUT          |`api/books/{id}`|Updated Book|Updated Book|
|DELETE       |`api/books/{id}`|            |True     |
