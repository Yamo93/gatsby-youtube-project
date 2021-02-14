---
title: Why Unit Tests Are Crucial
author: Yamo Gebrewold
date: 2020-09-29
featuredImage: ../images/third-post.jpg
---

I had trouble realizing why unit testing was important. When you first start out, the idea of having to write code to test the code you have already written might not make much sense. A big question I had was - what if the system changes, then I have to rewrite the code and the test. Maintaining the tests is a problem in itself.
But the more I dove deeper into my project at work, and the amount of reported bugs exponentially increased, I realized that we cannot possibly deploy this to production in this state. We need to cover our code with unit tests, making sure that the code does what it's supposed to do, and that nothing breaks in the future.
If you work alone on a project, you know every single line of code in it. So if you break a part of it, you usually know what it is.
But imagine working on a codebase which dozens of developers have contributed to. If you have to change a part of the system, and it turns out that you accidentally changed some other critical part, without being aware of it, and your company finds it out later down the road, that would be a great disaster.
A software system should follow one of the SOLID principles presented by Uncle Bob - the Open/Closed principle which suggests that software should be open for extension, closed for modifications.
Unit testing helps a lot with this.
I love the idea of thinking about a software system as a plugin ecosystem, where the plugin doesn't modify the system, but only extends it.