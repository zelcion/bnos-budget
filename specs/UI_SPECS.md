# UI Specs

## Navigation Bar
- Sits at the bottom of the screen
- Big Number On Screen (home) icon in the center, preselected when opening the app

## Summary/Progress Bar
Goal is to show how much of the budget is left for the month, and how much has been spent. This will be a horizontal bar that fills up as you spend money, with the big number above it showing the exact amount available.

It should sit inside the navigation bar container, above the buttons, with a small margin.

It should be multi segmented to have:
- empty (available budget)
- red (Spent money)
- light orange (planned expenses)
- light green (savings goals)

It should have a border that's color coded to match the big number (green, yellow, red, purple, dark purple) to give a quick visual cue of how you're doing.

## Home Screen
Big number and icons for quick expense entry must be the main focus.

- Expense list should be just slightly off screen, nudging the user to scroll down and see it, but still retaining the focus on the big number and quick entry buttons.
- Scrolling down to the expense list should cause the big number and quick entry buttons to shrink and stick to the top of the screen, so that they are still visible while browsing past expenses, but not taking up too much space.
- Big number should be almost in the center of the screen vertically as well, just slightly above center to make room for the quick entry buttons below it, meaning the expense list will be completely off screen when you first open the app, encouraging users to focus on the big number and quick entry buttons first.

## Quick Expense Entry
- 5 (not 6) Floating emoji buttons should be arranged in a grid formation, with 2 rows and 3 columns (the last column will have the "+" button). This allows for a more compact layout that fits better on smaller screens, while still providing quick access to recent expenses.
- The amount drawer should slide up from the bottom of the screen

## Quick Expense Entry Input Drawer
- Should have a numeric keypad for entering the amount, with a "Add" button at the bottom of the drawer for confirming the entry.
- Should have a small clock icon next to the amount input field that, when tapped, allows the user to set a different date for the expense (defaulting to today's date). 

## Month Picker/arrows
- Month picker should be on the top of the screen, not right above the big number, to avoid cluttering the main focus area. It should be centered horizontally, with the left and right arrows on either side of it for easy navigation between months.

## Expense List
- While not scrolled, should have a hint at the bottom of the screen (text + arrow) to encourage users to scroll down and see their past expenses.
- Must be completely off screen when the app is first opened, to keep the focus on the big number and quick entry buttons.