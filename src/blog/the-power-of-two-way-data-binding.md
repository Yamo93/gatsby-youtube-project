---
title: The power of two-way data binding
author: Yamo Gebrewold
date: 2020-10-04
featuredImage: ../images/the-power-of-two-way-data-binding.jpeg
---

The modern frontend JavaScript frameworks and libraries such as Vue, Angular and React — and even older ones such as KnockoutJS — all provide what is called two-way data binding.

For those who aren’t familiar with the term, two-way data binding basically means two things:
When a data property in the model is changed, the UI is updated. In practical terms, when you for instance fetch data from a server and set the property to the newly received data, the UI will automatically update and display it.
When the UI is updated, the changes are made to the data property. In practical terms, this means that when the user types in an input, then the connected data property to that input will also be automatically updated and ready to be processed, validated, and sent to the server for example.

So, whenever you bind a property to a certain element in the DOM and establish the two-way data binding, the framework will do all the heavy-lifting for you in the background, and you won’t have to think about syncing the UI with the data.
This gives tremendous benefits, the biggest being:

* The application data and the UI will always stay in sync. This is especially important when your frontend fetches data from the server and the UI has to be updated with the most recent changes.

* The developer doesn’t have to think about manually syncing the UI with the application data. Just think of how cumbersome it would be to have to manually sync the UI with the data. So, when the data is fetched, not only do you have to update the data properties, but you also have to update the DOM on your own. It opens up for errors where the UI will no longer reflect the actual data, and so on.
These frameworks make frontend development much more convenient, because they allow the developer to focus on the business logic and not think about the nitty-gritty details like syncing the UI with the data.
When people think of frontend frameworks, they immediately think about the benefits of the component-driven development and reusability, which are all great benefits, but that is far from being the biggest benefit. In my opinion, two-way data binding is what makes things so much easier and is probably the greatest benefit of using a JavaScript framework.