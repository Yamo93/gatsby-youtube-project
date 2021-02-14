---
title: Defensive Programming and the Fail-First Approach
author: Yamo Gebrewold
date: 2020-11-07
featuredImage: ../images/defensive-programming-and-the-fail-first-approach.jpeg
---

Anyone who has written software knows that code is error-prone by nature. There are so many things that can go wrong — users inputting invalid values, code which is executed based on wrong assumptions causing the software to fail, and the list goes on.

A really bad mindset in programming is to assume that things will always “work out”, that objects and data will be present and accessible, when in fact they might not. The object that you thought would be present is suddenly no longer being fetched correctly. If your code is depending on that data object, and crashes as soon as that data is null, then your code is fragile and not solid enough.

When I first started out coding, I would always make those assumptions in my code — expecting an object to be my input and then processing that object, without being certain for sure that the input will always be as I first expected. But after a while, it became pretty evident that my code was fragile and there was nothing guarding it.

Learning about the concept of defensive programming helped me a lot, and will help any new developer. In short terms, the concept is all about ensuring that the software will behave in a correct way even if the input is incorrect.
One of the most common errors that programmers get is the null exception, which usually occurs when trying to access properties of an object which is null. An example of that would be when we fetch an object from a resource, and then assume that the object will be returned correctly.

One of the most helpful approaches to avoid this type of errors is to use the “fail-first” or “fail-early” approach which simply means: break out of the function early if the input is incorrect and stop the execution. The way we do this is by using guard clauses or if-statements which make sure that the inputs are valid before we move on to the rest of the implementation. This prevents us from proceeding with the execution of an invalid state.

Another useful approach is to use assertions inside of methods. The concept of assertions is common in unit testing, but we can use the same approach in our actual code implementation too. When we perform some side effect, we assert that the effect has taken place. For example, when updating a value in the database, we usually get a success status back. Returning that status will provide certainty that the operation was executed successfully, instead of assuming that the update was successful when in fact it was not. We basically assert that the execution was successful.
This defensive approach to programming will make your software much safer, because it will only execute based upon certainty and not possibly false assumptions.

You can never trust that the user will input correct values. In fact, you can’t even trust your own self or the code that you write. You might write a method somewhere which returns a value, and then call that method elsewhere, assuming that your method will always behave correctly. If you then create some type of dependency to that method, then you’re technically setting your code up for disaster.

I prefer code with guard clauses and extra checks which provide safety over code which is apparently neat and clean, but error-prone and fragile. Sometimes, “stupid code” is the most stable since it only does things based upon certain values.