
# What Needs Help

As you've probably seen, a lot needs improving. The following are features that have observable bugs or other issues.


## Delete Functionalities

Currently, lists and tabs can be deleted from the interface, but if I'm not mistaken, only SOME goals can be deleted. Others still lurk in the database even though they don't appear on the page. This means that the 'xp bar' at the top can never be filled to the end unless they are manually removed via terminal.


## Data Leaks from One Tab to Another

Tabs (specifically those containing links and goals, i.e. the Tab component) will usually work fine individually, but if you click on one tab and then another, you'll often find that data from the previous tab remains on the page. You have to click on a non-Tab component route and click back in order to get the right data.


## Page Refreshes Needed

After creating a tab, you automatically get navigated to the new page - but a refresh is needed in order to load content, i.e. the 'Page is empty, etc' message. A page refresh is also needed in order to see the XP bar in the top-right corner to fill up after a goal is completed.


## Handling Lists

Fetching list information is clunky because you have to identify unique lists by either mapping through tabs or goals. I think that database schemas could be more effectively formulated to include this info without repeating other info.