# UX Features - BNOS Budget

## Core Display
General Behavior:
- The big number is the central focus of the app, always visible and updated as the user adds expenses or changes their plan.
- Adding expenses is designed to be quick and intuitive, with minimal input required (emoji + amount).
- Date of the expense is automatically set to the current date.
- Date is irrelevant to the Big number only the month really matters for counting towards the monthly available funds.


### Big Number Display
**What**: The primary screen element showing available spending money
**Interaction**:
- Always visible at the top of the main screen
- Large, bold typography (prominent display)
- Updates in real-time as expenses are added
- Color-coded indicator:
  - Green: On track with savings goal
  - Yellow: Warning zone (getting low)
  - Red: REALLY LOW (approaching $0)
  - Purple: Available value under $0, but not negative due to savings goal buffer
  - Dark purple: Below $0, negative available funds (over budget)
- Tapping the big number expands the income/goal pills (see below) to show detailed breakdown

### Month Switcher
**What**: Navigate between months
**Interaction**:
- Month/Year displayed on top, above the big number
- Left/Right arrows to navigate months
- Tap on month name to open month picker modal - between the arrows.
- Current month highlighted by default
- while Being on other months, show another button to quickly jump back to current month.

### Income & Goals Pills
**What**: Visual indicators for planned income and savings goals
**Interaction**:
- Displayed below the big number
- Small colored pills (empty by default):
  - Blue pills: Planned savings goals
  - Green pills: Planned income
- Default state: Simple colored dots/pills with no text
- When tapping the big number or the pills themselves, they expand to show more details:
  - Pills expand and enlarge
  - Income pills show amount with "+" symbol (e.g., "+$3000")
  - Goal pills show amount with reserved/allocation symbol (e.g., "→ $500" or "- $500")
  - Big number will adjust to value disregarding the planned saving goals, showing the "true" available funds.

### Incoming Expenses Indicator
**What**: Sit above the past expenses list, showing upcoming expenses for the month
**Interaction**:
- Should be small, 2-8 items, showing all planned expenses, including card expenses that will count toward the months total expenditures.
- Show emoji, amount, and date for each planned expense.
- When actual date comes, it turns into a normal expense.

### Past Expenses List
**What**: Scrollable list of all expenses added for the current month
**Interaction**:
- Each item shows emoji and amount.
- Icon if recurring/planned expense.
- Card name if assigned to a card.
- Swipe left to delete, hold to edit. Editing brings up the same modal as adding an expense, but with pre-filled values.
- Sorted by date (newest first) - User can't change order

### Add Expense Buttons
**What**: Primary action to add new expenses - floating emojis (6 most recently used ones) and a "+" button
**Interaction**:
- User taps any emoji button to quickly add an expense with that emoji, new drawer with amount input appears immediately, along with optional card selector (default is Cash emoji).
- "+" button opens an emoji picker with all recent emojis, but user may add new ones. After selecting an emoji, user is taken to the same amount input drawer as above.
- Amount input is numeric with currency symbol.
- Clicking "Add" saves the expense and updates the big number immediately.

### Bottom Navigation Bar
**What**: Access to different sections of the app
**Interaction**:
- Home (big number and expenses list) -- The default page when opening the app
- Planned expenses -- Swipe left, or click the icon (that should be to the left of the home icon)
- Planned Income -- Swipe right, or click the icon (that should be to the right of the home icon)
- Cards -- Swipe left twice, or click the card icon (that should be to the left of the planned expenses icon)
- Navigation rules: Swiping or clicking on the icons should take the user to the respective sections. Big number + month selector is always visible, but smaller on other pages.

## Monthly Planning Phase -- not started

