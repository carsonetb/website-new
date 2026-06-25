---
title: 'There is no Alternative: Arguments for Rust'
date: 'on June 25, 2026'
description: 'A new perspective on Rust and bridging the gap between Functional programming and OOP.'
---

The Rust programming language has enjoyed a steady rise in popularity over recent years, and for good reason. Proponents of the language push its many virtues, the most popular talking point being its safety. Its opponents, or more importantly people who choose not to use the language, have many reasons to do what they do. This is a guide for developers who have used Object Oriented languages their whole life, and are rightfully skeptical but curious of the nature of the other side.

I myself made this shift. For the first three years of my programming journey, I had only used Object Oriented languages like Python, C++, and Java. One weekend I---somewhat unwisely---decided to learn Haskell, a purely functional programming language. After hours of confusedly staring at documentation and strange runtime errors, I realized that to learn the functional paradigm, it is not just necessary to learn syntax, or to learn a few new concepts. You have to fundamentally rethink how you approach a programming problem, and that is not an easy thing to do. Below, I try to help you discover this new perspective.

## 1. Object Oriented Programming

Before we may understand the benefits of a thing, we must examine its alternatives. For these, we are spoiled for choice, an entire paradigm of programming is available to compare. For the sake of a clean categorization, we will consider an OOP language to be one which supports classes with methods and members who inherit other classes with methods and members. Python, C++, Java, C#, and JavaScript. Let's examine the characteristics of these languages:

- Python: Garbage-collected, beginner friendly.
- JavaScript: Garbage-collected, beginner friendly, different than Java.
- Java: Garbage-collected, widely taught in education at a slightly higher level than Python.
- C#: Garbage-collected, compiled.
- C++: Can be unsafe if written improperly, one of the original Object Oriented languages.

Four of these are garbage collected, which adds a performance overhead. The other one is unsafe (although it can be written safely using smart pointers), and causes many of the major vulnerabilities in modern software. All of them are popular. Surely, this paradigm of programming and the mindset it brings with it are the first that many people learn.

Human society is largely based on hierarchy, or rather controller and controlled. The highest level of these hierarchies is conventionally the state, the relationship being between the government and citizens. Then, lower is the family, between parents and children. In the workplace, it is the board and the managers over which they reside, or the managers who oversee employees.

The mindset of Object Oriented Programming is very natural. A Class encapsulates some amount of scope, which it lords over. It has its child Classes, over which is it has much more limited control. There is a relationship between the Class and those hierarchies which are so often found in society, so much so that we use terms like "parent" and "child", and even "class", to describe their structure.

When you learn a paradigm of this nature, one which is drilled so deep into our heads even outside the world of programming, it can be very difficult to accept or even understand its flaws.

In an Object oriented language, the structure of data is more akin to a graph than a hierarchy. The most elemental unit of data can easily store a reference to the largest, most encapsulating system. This means that the most elemental unit of data has the ability to _mutate_ any other data or system. One or two levels of mutation can make debugging very difficult, because errors may happen very far from their source.

The graph-like structure of data has another consequence, one which is too often overlooked and overlookable. When you store a reference to an object which is higher in the hierarchy, this is in the form of a shared pointer. A pointer being memory which stores (points to) another memory address, and shared meaning multiple pointers to this memory address are stored. The target memory cannot be deleted until all its pointers go away. This is a hard problem to solve, and the reason the garbage collector was invented.

From this information, there are two reasons why OOP languages experience a less-than-optimal performance.

- Pointers: When an address in memory is loaded to the CPU, to improve efficiency adjacent memory is loaded into a so-called "cache" which is much, much faster to load from than standard memory. Pointers tend to not point to data which is next to anything useful, especially when the data structure of the program is disconnected and graph-like. This naturally degrades the efficiency of the program.
- Garbage Collection: Because of the complexity of these algorithms and their general inability to run in parallel with the actual program, the performance of systems which handle a large amount of data will degrade. Unfortunately, large amounts of data is a characteristic of many programming projects.

But, the argument goes, these cons are greatly outweighed by the pros! What about modularity, and reusability, and flexibility, and _scalability_? Many of these advantages are also preasent in Rust, made evident by the many large systems deployed today which are written in Rust.

But code can be optimized, and today's processors are certainly powerful enough to handle a little inefficiency. Yet, software's largest problems seem to be bugs and performance issues, the two of which are also the greatest weaknesses of Object Oriented Programming. To see a correlation is reasonable.

Something has to change. But what are we to do without our precious classes? What of scope? What of abstraction?

## 2. A Harsh Alternative

Clearly, the most important problem to fix is this graph-like structure. Before this can be done, we need to shift our understanding of the nature of an Object. Instead of a Class which has methods, there are only Functions which act on data. Instead of Classes, we are working with Data Types, which describe the set of all possible values which data of that Type could be. All of the fields of a Type are _owned_, and meaning no other data may hold a pointer to that field.

With this modification, we have removed the need for shared state entirely. With this modification there is no longer a need for the concept of "member functions". Associating a function with a specific Object is pointless because that function cannot modify the Object's data. This modification also is advantageous because errors will happen much closer to their source, and the stack is much easier to step up and down.

This method is a bit restrictive. Because we have gone so far opposite of the Object Oriented paradigm, we have disallowed all mutability. Some programming languages, most notably Haskell, embrace this purely functional paradigm. Additionally, we have introduced other performance limitations. Because we cannot mutate memory, in many cases we have to instead reallocate and copy memory from one place to another. Furthermore, most functional languages like Haskell and OCaml still have to use a garbage collector!

Certainly, this paradigm of strict pureness is not the answer. But how will we maintain the advantages of functionality while preserving an ample amount of flexibility?

## 3. Functional Ownership

Now that we have explored the two extremes, we may begin to develop the middle ground, and explore some of the features of Rust. We know that Objects maintain ownership of all their data, but what of functions? All data is owned, so naturally functions own their arguments. But if the argument is owned, then the data will be deleted at the end of the function. Because of this, there are no disadvantages to allowing the function to make that data mutable. The same goes for data which is created within the function.

There is one disadvantage. If we pass any data to a function, we cannot be allowed to further use that data, for fear that it may have been mutated. This in itself is not terrible, but we must consider that functions also return data. If a function returns data which references its argument, there could be a case of shared ownership.

We have gained some flexibility, but how can we pass the same data to multiple functions?

## 4. References

We will introduce a new type of parameter, one which is not owned. A reference can be passed to a function, which can then read the data, but not mutate it. We can have as many references to data as we want, provided that the data is not deleted before the reference.

Additionally, sometimes we want a function to mutate data which we use later. For this we will use the mutable reference. Importantly, if a mutable reference exists to some data, there may not be any other references to that data, mutable or immutable.

## 5. The Middle Ground

The features and ideas described in the previous three sections are at the core of Rust, and are the features which allow it to be at the same time memory safe and without a garbage collector. They are also the reason Rust's runtime errors (dubbed "panics") are so debuggable, as their proximity to the source of the error is generally low. Rust has many more features, namely lifetimes, which increase the flexibility of the language further than previously described. The Rust features like the build environment, formatting, compile errors, type system, syntax, macros, and error propagation are all incredibly well thought out and enjoyable to use.

Many a programmer has become frustrated with the _status quo_ of Object Oriented programming languages, and gone to build their own. Because Rust is the middle ground of two different opposing paradigms, it supports so many styles of programming that so many alternatives become unnecessary.

## Post

This is my first real blog post! I would appreciate any feedback and intend to revise the writing. If you have any feedback, please email me at me@carsonetb.com!
