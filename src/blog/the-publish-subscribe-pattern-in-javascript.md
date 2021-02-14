---
title: The Publish-Subscribe Pattern in JavaScript
author: Yamo Gebrewold
date: 2020-11-01
featuredImage: ../images/the-publish-subscribe-pattern-in-javascript.jpeg
---

In big applications, the software modules are usually decoupled and might in some scenarios lack direct communication. Sharing data between the data models might therefore seem as a difficult task.

I scratched my head several times when facing such a challenge, trying to find a solution to this frequently occurring problem. When I learned about the publish-subscribe pattern the first time, it was a complete mind blower for me.
Imagine an application where you handle purchases. You need to keep track of the user’s personal details in multiple places but they lie in an isolated module. The data has to be shared across multiple modules. How do you send that crucial information to other parts of the application in a smooth way?

This is where the publish-subscribe pattern comes in handy. In its essence, the idea is very simple. You create a so called event (sometimes referred to as a message or a topic) which a module can listen to. Then, you let the module which holds the data broadcast or publish the message as an event. You can then set up listeners or subscribers to that event which will trigger a method as soon as the event is published.

Some refer to this concept as a “radio” or an amplifier: anything that sends out a global message to everyone.
The way to actually create such a publish-subscribe machine is to store subscribed callbacks in a global object. Every key in that object will be a particular event name, and the value will be an array of callback functions, which will be executed whenever someone fires the publish event with that particular event name.
In short terms, we can look at it as an object called subscribers:

```js
const subscribers = {};
```

This object will have a bunch of key-value pairs, where the keys are the registered event names, and the values are arrays of callback functions which will be executed whenever the event is published. To illustrate that in pseudo code, it would look something like this:

```js
const subscribers = {
  onUserUpdate: [callbackFunction, anotherCallbackFunction],
  onUserLogin: [callbackFunction, anotherCallbackFunction]
};
```

To make this work, we need two methods — the subscribe method and the publish method. The subscribe method will simply take in two parameters — an event name and a callback. It will look like this:

```js
function subscribe(eventName, callback) {
  if (!Array.isArray(subscribers[eventName])) {
    subscribers[eventName] = [];
  }
  subscribers[eventName].push(callback);
}
```

This is how a callback is registered for that particular event name. It takes in two parameters — the event name and the callback. The callback is added to the array of callbacks for that event name.

The publish method will look like this:

```js
function publish(eventName, data) {
  if (!Array.isArray(subscribers[eventName])) {
    return;
  }
  subscribers[eventName].forEach(callback => {
    if (typeof callback === 'function') {
      callback(data);
    }
  })
}
```

This function takes in the event name and the data. First it checks if there is an array for that specific event name, meaning that at least one callback has been registered. If it exists, then it will iterate through that array of callbacks, and execute each one of them, providing the “data” argument for every function call.

This can now be used as a factory function:

```js
function publishSubscribe() {
  const subscribers = {};
  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = [];
    }
    subscribers[eventName].push(callback);
  }
  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) {
      return;
    }
    subscribers[eventName].forEach(callback => {
      if (typeof callback === 'function') {
        callback(data);
      }
    })
  }
  return {
    publish,
    subscribe
  };
}
```

The way we can use this pattern is by simply instantiating an object with these two methods. Then we can subscribe to an event and register a callback which will be executed whenever that event is published. It would look like this:

```js
const amplifier = publishSubscribe();
amplifier.subscribe(‘updateUserInfo’, updateUserInfo);
```

And later on, we can publish an event like this:

```js
amplifier.publish(‘updateUserInfo’, userData);
```

One last method that might be useful for avoiding memory leaks is an unsubscribe method. To remove registered callbacks that are no longer needed, you could either remove the event and all associated callbacks to it like this:

```js
function unsubscribe(eventName) {
  delete subscribers[eventName];
}
```

This will remove the event and all associated callbacks to it. Or, you can extend the subscribe method so that it will return an unsubscribe method which will delete that particular callback in the array of callbacks, like this:

```js
function subscribe(eventName, callback) {
  if (!Array.isArray(subscribers[eventName])) {
    subscribers[eventName] = []
  }
  subscribers[eventName].push(callback);
  const index = subscribers[eventName].length - 1;
  return () => {
    subscribers[eventName].splice(index, 1);
  }
}
```

Then, you can execute the subscribe and save the return value which will be the unsubscribe method, like this:

```js
const unsubscribe = amplifier.subscribe(‘anEvent’, callback);
unsubscribe(); // Remove the subscription
```

The big benefit of this pattern is that it enables direct communication between decoupled and isolated software modules. This is why the main JavaScript frontend frameworks all use this pattern excessively in their state management systems. It is an effective way of keeping track of state updates and notifying the subscribers of any change.

A downside to this pattern is that it may open up for unexpected behaviors if it is misused. When multiple subscribers listen to the same event and do different things at the same time, this may cause issues which are hard to debug.

Nevertheless, the pattern is very powerful and pretty much a necessity in any serious frontend application, because it allows loose decoupling, while still preserving the communication between the modules.