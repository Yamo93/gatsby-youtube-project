---
title: The Open/Closed Principle Applied in JavaScript
author: Yamo Gebrewold
date: 2020-11-17
featuredImage: ../images/the-open-closed-principle-applied-in-javascript.jpeg
---

The Open/Closed Principle, also known as OCP, is one of the SOLID principles presented by Robert C. Martin. He describes it as being the most important principle in object-oriented software design. The principle suggests that software entities such as classes, modules and methods should be open for extension but closed for modification. This means that a well-designed program is written in such a fashion that anyone can add functionality to it without having to modify the existing functionality.

This is also somewhat related to the concept of loose decoupling, which means that the software modules should be independent of each other, so that a change in one class won’t necessitate changing other classes.

In simple terms, software modules should not know much about each other, because the more they know about each other, the more they are likely to be coupled.

This principle sounds really good to any developer, and who wouldn’t want to write software in a clean way like this? The problem however arises when we actually sit down and write the code. Knowing about the principles in theory and being able to apply them are two completely different things.

The main benefit of this principle is the ability to maintain the software in the future at a lower cost. Tightly coupled modules will make maintenance of the program very expensive.

## Ways To Achieve This Principle

One of the ways is with polymorphism. Poly means multiple, and morph means forms, so: the ability of an object to take on many forms and shapes. So, the function shouldn’t care about what data structure the input data will be in. It can handle multiple forms and execute the functionality.

This principle can also be achieved with some type of abstraction or a contract in which objects make a promise to implement some functionality, and the object which uses those objects promises not to care about how they implement their functionality. That contract is usually known as an interface in languages like C# and Java, but in where interfaces don’t exist natively like JavaScript, an interface can be simulated by creating some custom validation when instantiating objects and making sure that they implement a certain interface.

The total opposite of the Open/Closed principle is a module which requires its source code to be modified in order to extend the functionality, like having to add conditionals inside of a method in order to extend it. Some suggest that a good indication that this principle is correctly applied, is that you don’t have to open the file in order to extend its functionality.

## Violating the Principle

To illustrate how the Open/Closed principle would be violated, consider this code:

```js
function initializeDatabase(database) {
  switch (database.type) {
    case 'mysql':
      database.connectToMySql();
      break;
    case 'postgres':
      database.connectToPostgres();
      break;
    case 'mongodb':
      database.connectToMongoDb();
      break;
  }
}

const mySqlEngine = {
  type: 'mysql',
  connectToMySql: function () {
    // ...
  }
};
  
initializeDatabase(mySqlEngine);
```

We are initializing a database with the `initializeDatabase` function. If we in the future would want to switch our database engine, we would have to modify the source code, and therefore violate the principle.

## Applying the Principle

A better design would be where the module which initializes the database doesn’t care about the actual implementation of how it is initialized, but only expects a method and runs it. The database engines are the ones who are individually responsible for their implementations of initializing the database.

It could look something like this:

```js
function initializeDatabase(database) {
  if (typeof database.init !== 'function') {
    throw 'Engine has no init method';
  }
  
  database.init();
}

const mySqlEngine = {
  type: 'mysql',
  init: function () {
    // ...
  }
};

const postgresEngine = {
  type: 'postgres',
  init: function () {
    // ...
  }
};
  
initializeDatabase(mySqlEngine);
```

I could later on easily switch the database engine by just passing in another one to the function and making sure that it has the “init” method, instead of having to modify the actual “initializeDatabase” function. We no longer risk modifying the source code of the function, and if something is wrong with a particular engine, we know that we can debug that engine in isolation without the risk of accidentally modifying other parts.