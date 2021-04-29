# Assignment 1 - Database & Backend


## Task 1 - Get the Project Running <input type="checkbox">
- Get the project running:
```
npm install
```
```
quasar dev
```

## Task 2 - Create a Firebase Project <input type="checkbox">

- Create a new Firebase project called "PWA Todo 1"

## Task 3 - Create a Cloud Firestore Database <input type="checkbox">

- Create a Cloud Firestore database (make sure you start in test mode)
- Add a collection named "tasks"
- Add some dummy tasks data.
- Each task should have the fields "id" and "title"
- You can add timestamp dates for the id's by running Date.now() in Chrome's console

## Task 4 - Setup a Node.js & Express Backend <input type="checkbox">

- Create a subfolder for your backend and initalise with `npm init`
- Install Express and Nodemon
- Create an Express app with a simple **GET** endpoint that returns a string
- Launch the app and make sure the endpoint works in the browser
- **NOTE:** If you prefer, you can use Cloud Functions instead

## Task 5 - Initialize Firestore Database <input type="checkbox">

- On the Firebase website, on the Project Overview page, add a new web app.
- Once created, click on **1 App** > **Cog icon** > **Service accounts**.
- Generate a new private key, store it in your backend folder and integrate the provided code for initializing our app in index.js.
- After the app intialization code, get access to the database with:
```
let db = admin.firestore()
```

## Task 6 - Tasks Endpoint <input type="checkbox">

- Create an endpoint named "tasks" which grabs all of our tasks and returns them in an array.
- Tasks should be ordered by **id** (ascending)
- Ensure it's working by loading the endpoint in a new browser tab

## Task 7 - Display Tasks in App <input type="checkbox">

- On **PageTodo.vue**, Create a method named **getTasks** which gets all of the tasks from our endpoint and places them in our "tasks" array on our page.
- The getTasks method should be triggered when the page is loaded.
- The tasks array should be empty initially

## Task 8 - Create Task Endpoint (1) <input type="checkbox">

- Create an endpoint named **createTask** using the following code:
```
app.get('/createTask', (request,response) => {
   response.set('Access-Control-Allow-Origin', '*');
   response.send(request.query)
});
```
- Use your browser to load the endpoint with the following query string, replacing the id with your current date timestamp:
```
  http://localhost:3000/createTask?id=1593503990240&title=Shower
```
- Note that you can see the query string data returned as an object (from the request.query object).
- Note that the id is returned as a string, make this return as an integer

## Task 9 - Create Task Endpoint (2) <input type="checkbox">

- Adjust the createTask endpoint, so that it creates a new task (by calling the "add" method on the tasks collection) when we hit it in the browser with a query string like the one above.
- Ensure it's working by hitting the endpoint URL (and query string) in your browser and then refreshing our app to see if the new task was added.
- **NOTE:** We don't need busboy for this as we're not using form data or files 

## Task 10 - Create Task Endpoint (3) <input type="checkbox">

- Change the **createTask** endpoint from a **get** endpoint to a **post** endpoint
- PageTodo.vue: In the **addTask** method, send the new task data to our **createTask** endpoint.
- This data should be sent as a query string using the qs library and the stringify method: https://github.com/ljharb/qs
- **Note:** You don't need to install the qs library, it comes with Node by default
- Only once the task has been added to our database should the task be added to our local tasks array.

## Task 11 - Add a Loading Screen <input type="checkbox">

- Use Quasar's loading plugin to display a loading screen when we're getting the tasks and when creating a new task