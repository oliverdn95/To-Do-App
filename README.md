# 📝To Do📝

Need to install [Task API](https://github.com/oliverdn95/Task-API) to work.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

Done by [Danilo Araújo de Oliveira](https://www.linkedin.com/in/oliverdn95/)

## Content

- [What is needed to run this APP?](#running-this-app)
- [Used Techs](#techs)
- [Features](#features)
  1. [Create new](#create-new-task)
  2. [Edit task](#edit-task)
  3. [Task done](#task-done)
  4. [Remove task](#remove-task)
  5. [Move task](#move-task)
- [How to Test/Edit](#development-server)
- [Special Thanks](#special-thankss)


## Running this APP 👨‍💻
First you need to download my [Task API](https://github.com/oliverdn95/Task-API).

Make sure you have [Node Package Modules](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Open terminal in the App root folder, run:
```bash
npm install
```

After installing all packages, you can test the App:
```bash
ng serve
```

remember that you at this point need to "runserver" on API too.

## Techs
Angular v19.1.4 .

Angular Material v19.1.1 .

Express v4.18.2 .

rxjs v7.8.0 .


## Features
This is a To Do application, you can create tasks to help you organize. 🗂️

### Create new task
There will be an button `+ New Task` if you click on it a form will pop up from the bottom of screen to create a new Task, each field can be blank and has a default value. 🎫
 

### Edit task
You can edit the task clicking in `✏️` action on a specific task, then a form will pop up from the bottom of screen to edit it. 🎫

### Task done
You can move a task directly to Done by just click on `☑️` and it will be the last one. 🎫

### Remove task
you can remove an task clickking in `🗑️` and it will be removed. 🎫

### Move task
You can drag'n'drop the tasks for another column if you want too. 🎫

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Special Thanks
Special Thanks to this two channels on yt who helped me understand/learn Angular. ❤️

[Learning Partner](https://www.youtube.com/@LearningPartnerDigital)

[FED Learning](https://www.youtube.com/@FEDLearning)