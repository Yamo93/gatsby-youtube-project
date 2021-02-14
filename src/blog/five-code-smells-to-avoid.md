---
title: Five Code Smells To Avoid
author: Yamo Gebrewold
date: 2020-11-22
featuredImage: ../images/five-code-smells-to-avoid.jpeg
---

We have all heard about the concept of “code smells”. That is when you write code that works, but you know that it’s not pretty and you’re certain that it can be improved. These code smells come in various forms and are pretty easy to recognize. The key however is to not only know what bad code is, but also know how to improve the bad code.

I am not a big fan of refactoring code if it is not tested beforehand, primarily because of the great risks in doing so. But there are some minor improvements that can always be made. In this article I would like to share five things that I try to avoid in my code as much as possible, because they are most likely not needed, and they make things harder to understand and maintain.

## 1. Else statements.

I used them a lot when I just started out programming. I think that people naturally use them because they are a way of expressing ones thought process when solving a problem. You handle a case with a certain condition, and then you naturally move on to handling the cases that don’t fulfill that condition.

A big problem with else statements is that they can be hard to understand, because of the simple fact that you can only understand an else statement by reading the previous if statement. The if block itself might be a big chunk, and you will have to dig deep to grasp the intent of the code. Imagine a big function with deeply nested if and else statements. It can get really hard to wrap your head around it.


The question is — are else statements even needed? In most cases, you’d be better off without them. As I said, they are hard to read, and when code is hard to read, developers who touch that code afterwards might not understand it and will therefore break it.

How can we replace else statements then? With returns. Instead of writing:

```js
if (something) {
 return true;
} else {
 return false;
}
```

We can write:

```js
if (something) {
 return true;
}

return false;
```

## 2. Switch statements.

Switch statements are usually used when you have multiple cases that you need to handle differently. In some scenarios, they are completely suitable. But sometimes, a switch statement is just unnecessary. If you handle multiple cases where the only thing that differs between them is that each case returns a certain value or executes a certain function, then you could be better off without the switch statement.

A problem with switch statements is that they are not very forgiving and sometimes hard to debug. Cases usually need the break keyword at the end, and if you accidentally forget the break, you break the entire code. Another problem has to do with performance. Object lookups are better performance-wise than switch statements.

Switch statements can be replaced with objects which act as lookup tables.

Consider this switch statement:
```js
switch (user.status) {
 case 'online':
   return 'User is online.';
 case 'offline':
   return 'User is offline.';
}
```

We can create an object with those status messages, and create a function which searches for that status in the object, like this:

```js
const userStatuses = {
  online: 'User is online.',
  offline: 'User is offline.',
  default: 'User status is unknown.'
};
function getUserStatus(status) {
  return userStatuses[status] || userStatuses.default;
}
```

## 3. Functions with multiple arguments.

Sometimes, the state of the application necessitates that you add a bunch of arguments, but in general you could say that a function with a lot of arguments is probably handling a lot more than it should.

There are two main problems with having too many arguments in a function:

1. Arguments are actually a list, which means that they follow a specific order. It also means that if you accidentally swap positions of arguments, then you have successfully broken the function. They make the function very fragile.

2. Many arguments make the function calls hard to read. This is even worse if there are Boolean arguments, like:

```js
doSomething(true, null, userId, false);
```

This is incredibly hard to read.

One way to replace this is to break the function into smaller functions, since it apparently is doing multiple things and thus violating the principle that functions should only do one thing.

Another way to replace it is to use an object argument. In JavaScript for example, this is very clean as it becomes readable. And in the actual function, you can destructure the object argument so that the properties become variables.

The function call could look like this:
```js
doSomething({ notifyUser: true });
```

And the actual function declaration could look like this:

```js
function doSomething({ notifyUser } = {}) {
 // ...
}
```

Note: I am using an empty object here as a default argument, just to avoid possible exceptions if the function is not receiving an object as the input.

## 4. Fancy one-liners.

When I just started out with programming, I found one-liners to be really cool and awesome. The idea that one line of code can do plenty of stuff was mind-blowing. But as time went, I realized that they were usually very hard to read and maintain. They were almost impossible to tweak since the one-liners were designed to do something very specific.

I am not talking about lambda expressions or utility methods which make things easier, like the native Array methods in JavaScript. I am talking about complex logical expressions on one line which do heavy stuff, that no one but the author can understand.
Every one-liner can be broken down to several lines which will make the code a lot cleaner.

Clean code isn’t always about reducing the amount of lines, but it is about readability and the ease to maintain it.

Explanatory variables are also a good way to explain a complex logical expression. Instead of writing:

```js
if (person.age >= 65 && person.isEmployed === false) {
// ...
}
```

We can write:

```js
const hasRetired = person.age >= 65 && person.isEmployed === false;
if (hasRetired) {
// ...
}
```

And the if statement suddenly becomes much cleaner, since it is now easier to read by humans.

## 5. Comments.

As the famous wording says, comments lie. Comments in code are either commented-out ignored code, or comments which explain a chunk of code.

Commented-out code, or zombie code as some people like to call it, is dangerous because it can be accidentally reintroduced, and annoying because it occupies space in the file. Comments which explain code are another code smell because they indicate that the code wasn’t explanatory enough that someone had to explain it.

In addition to that, comments will usually lie because they might have been written a while ago, and the code in question might have changed over time, which makes the comments no longer relevant. When people update the code, they rarely update the comments, so the comments eventually rot and no one touches them, and they are therefore no longer reflecting the reality.

Comments should just be deleted. It will still be saved in the file history as long as the project has some type of version control. One small suggestion if you choose to delete commented-out code is to make sure that you add a meaningful commit message like “Remove method …” so that you can easily trace back to that commit in which the code was removed.

## Conclusion

In short, you as a programmer choose to have the mindset of either writing code that the computer can understand, or writing code that humans as well as the computer can understand. Humans will maintain your code, and if you don’t write clean, readable code, then your code will eventually stop working, since it will be changed over time by people who can’t understand it.