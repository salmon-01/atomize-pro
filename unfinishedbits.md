
# Half-Finished Features

There are a number of half-finished features laying dormant in the code. These are...


## A Drag & Drop Planner

This could also go under 'stickybits.' This feature would have allowed for the user to drag their goals (as blocks - perhaps of different sizes depending on average time required for the goal) and drop them into different time slots of the day, so they can create a day plan. 

Another nice-to-have: being able to choose the time slots available for creating this plan, as we all have different free hours.

### The Problem

This was abandoned as I was spending way too much time trying to create a smooth, undisturbed drag that didn't drop the element too soon. Before abandoning it, I made some edits that ended up smoothing out the drag issue, but now no longer allow the element to drop.

If you decide to tackle this, you'll need 'dnd kit' (https://dndkit.com/). However, please note the docs were not crafted well, so YT tutorials will be more helpful.


## Homepage Overview

The homepage should have an overview of all tabs and their lists + goals. The intention was to show a more 360 view of all their progress, but without overwhelming the user with too much data. It should provide them with a new way to look at their paths ahead instead of just repeating what's on the individual tabs. Didn't have enough time to get to it.


## Create a Goal (Direct)

This is a very basic feature which I should have prioritized but didn't. This would allow the user to create goals and then add them to existing lists, without having to create goals by creating a new list first.


## Edit Functionalities

The interface for deleting and editing tabs, goals, and lists exists (though could do with more styling), but the functionalities are still a WIP. While 'delete' works for most things (more on this in 'stickybits'), I did not get round to implementing edit functionalities.


## Formatting Issues with Levels

When adding more than two 'Levels' goals to a list, the formatting gets skewed. I discovered this issue only while filming and so didn't have enough time to fix it.


## Mixed Lists

Combine multiple types of goals in a list.

### The Problem

I made some errors in the way I constructed my schemas and tables, so it broke my brain trying to figure out how to store this and retrieve it without causing issues. 


## Brainstorming

This is a nothingburger right now. Ideally, users should be able to brainstorm and break down goals into more manageable steps, and eventually, directly extrapolate that data to create new lists, goals, etc.


## Color options not all implemented

Stored color preferences for goals don't all match up to color output. It was a low-priority task, and is still not the most important thing, but it's worth mentioning anyway so you are aware it's not a bug.