# ne-rpg-tools
Nyteshade Enterprises - RPG Tools

## Introduction

A combination of tools for working with pen and paper role-playing games. The
process for this repo started a long time ago and has culminated in some new
refined tools for rolling virtual dice and choosing elements from life path
style lists in a controlled and programmatic environment.

## Features

### Weighted Randoms

At the core of `ne-rpg-tools` is the weighted random. Most of the other tools
have been developed around this feature set. Weighted Randoms allow you to
setup a set of potential options and choose from them randomly. As the name
implies, however, certain values can be setup to have a higher priority than
others.

The library itself has been tailored to be efficient. Some folks might indicate
that an array with two 1s and four 2s would allow for twice the opportunity
of a two being chosen over a one. Technically this is true but the
implementation is both sloppy and wasteful. It is also difficult to setup and
cumbersome to manage.

Weighted Randoms solve this problem by assigning each element in the list a
weight. The items appear only once. The weight of each entry is tallied up
and a random number is chosen from 0 to the total weight of all items. Then the
list of items is walked and their weights added until the randomly chosen value
is within the range of the weight of the currently chosen item.

So if the list consists of values one through five and each item has a weight
of one hundred. A random number from 0 to 500, not including 500, is chosen. If
233.5 is selected, then the value in the list would be the number 3.

### functionOrValue

Many times, especially with a list of undetermined objects, we might want to
substitute a value with a function that returns that value. This method will
take a given JavaScript value and if the object is a function, then return the
results of its execution. Otherwise, the object is passed back the same as it
was received.

### createMutableEnum, createEnum

Enums are a feature provided by other programming languages but mostly eschewed
by JavaScript. Their usage, however, provides a powerful way of handling
constant values. These functions provide a way to define some of these enums
easily and effectively. There are two functions exported; one creates read only
enum objects and the other creates readable and writable enums. Each enum has
a constant variable name that maps to a number. The resulting number maps back
to the variable name as a String. Additionally, each element in the enum can
have a separately stored description and an additional set of data. The
description and data are stored using `Symbol`s
