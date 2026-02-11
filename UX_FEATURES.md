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
- Tapping the big number reveals goals, and changes the number to be shown without the savings goal buffer.

### Month Switcher
**What**: Navigate between months
**Interaction**:
- Month/Year displayed on top, above the big number
- Left/Right arrows to navigate months
- Tap on month name to open month picker modal
- Current month highlighted by default

### Savings Goal Indicator
**What**: List of savings goals and their values
**Interaction**:
- Usually hidden by default, can be shown by tapping the big number.

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

## Monthly Planning Phase -- review from here

### Set Savings Goal
**What**: Define how much to save this month
**Interaction**:
- Modal/Section: "Monthly Savings Goal"
- Single numeric input field with currency symbol
- Save button
- Display: "You want to save: $X this month"

### Add Planned Income
**What**: Set expected income for the month
**Interaction**:
- Modal/Section: "Planned Income"
- Income entries list showing:
  - Emoji picker (💰, 💼, 🎁, etc.)
  - Amount input field
  - Delete button (X or trash icon)
- "Add Income" button to add more entries
- Total planned income displayed at bottom

### Add Planned Expenses
**What**: Pre-plan recurring or known expenses
**Interaction**:
- Modal/Section: "Planned Expenses"
- Optional section (can skip)
- Expense entries list showing:
  - Emoji picker for category (🏠, 🚗, 📱, 🍔, etc.)
  - Amount input field
  - Optional: Card selector dropdown (if expense goes on card)
  - Delete button
- "Add Planned Expense" button
- Total planned expenses displayed at bottom

### Planning Summary
**What**: Overview before starting to track
**Display**:
- Planned Income: $X
- Planned Savings: $Y
- Planned Expenses: $Z
- Expected Available: $A
- "Start Tracking" button to move to tracking phase

## Monthly Tracking Phase

### Add Expense (Quick Entry)
**What**: Primary interaction for adding expenses
**Interaction**:
- Prominent "+" button (floating action button or bottom bar)
- Modal appears with:
  - Emoji picker grid (pre-defined categories)
  - Amount input field (numeric keyboard)
  - Card selector dropdown (optional)
    - "No Card" (default)
    - List of user's cards
  - Date picker (defaults to today)
  - "Add" button
- No name/description field required
- Quick dismiss and immediate big number update

### Expense History
**What**: List of expenses for current month
**Interaction**:
- Scrollable list showing:
  - Emoji + Amount + Date
  - Card name (if assigned to card)
  - Swipe left to delete
  - Tap to edit
- Sorted by date (newest first)
- Optional filters:
  - By emoji category
  - By card
  - By date range

### Edit Expense
**What**: Modify existing expense
**Interaction**:
- Tap on expense in history
- Same modal as "Add Expense" with pre-filled values
- "Save" and "Cancel" buttons
- "Delete" button at bottom

## Card Management

### Card List
**What**: View and manage credit/debit cards
**Interaction**:
- Accessible from settings or dedicated tab
- List showing:
  - Card name
  - Closing date
  - Due date
  - Current month's expenses on this card
- "Add Card" button
- Tap card to edit

### Add/Edit Card
**What**: Configure card details
**Interaction**:
- Modal with fields:
  - Card name (text input)
  - Closing date (day of month, 1-31)
  - Due date (day of month, 1-31)
  - Color picker (for visual differentiation)
- "Save" button
- "Delete Card" button (edit mode only)
- Validation: Due date should be after closing date

### Card Expense Allocation Logic
**What**: System automatically calculates which month an expense counts toward
**Display**:
- When selecting a card in expense entry, show indicator:
  - "Will count toward [Current Month]" or
  - "Will count toward [Next Month]"
- Based on closing date logic

## Monthly Comparison

### Month History View
**What**: Compare performance across months
**Interaction**:
- Accessible from main screen (swipe up or dedicated button)
- List/Cards showing each past month:
  - Month name
  - Big number (available funds) at month end
  - Savings goal: $X (✓ or ✗)
  - Total income: $Y
  - Total expenses: $Z
  - Visual indicator (success/failure on goal)
- Tap month to view detailed breakdown

### Month Detail View
**What**: Deep dive into specific month
**Interaction**:
- Full expense history for that month
- Income entries
- Planned vs actual comparison
- Read-only (past months can't be edited)

## Settings & Configuration

### General Settings
**What**: App configuration
**Interaction**:
- Accessible from menu (hamburger or settings icon)
- Options:
  - Currency selection (dropdown)
  - First day of month (for monthly reset)
  - Notifications toggle
  - Theme toggle (light/dark mode)
  - Export data button
  - Import data button

### Month Reset Confirmation
**What**: Warning when starting new month
**Interaction**:
- Modal appears when accessing new month for first time:
  - "Starting a new month will reset tracking"
  - "Previous month leftover: $X"
  - "Remember: Save leftover funds instead of carrying them over"
  - "Continue" button
  - "View Last Month" button

## Notifications (Optional Enhancement)

### Spending Alerts
**What**: Notifications about spending status
**Interaction**:
- Settings toggle for each:
  - Daily balance notification (e.g., "You have $X available")
  - Low funds warning (when approaching $0)
  - Card closing date reminder (day before)
  - Card due date reminder (3 days before)
  - End of month summary

## Onboarding

### First Launch
**What**: Guide new users
**Interaction**:
- Welcome screen explaining BNOS philosophy
- 3-4 slides:
  1. "See what you can actually spend"
  2. "Plan your month in 2 steps"
  3. "Track with just emoji + amount"
  4. "Monthly reset keeps you disciplined"
- "Get Started" button

### First Month Setup
**What**: Guided setup for first month
**Interaction**:
- Step-by-step wizard:
  1. "How much do you want to save?" (savings goal)
  2. "What income do you expect?" (income planning)
  3. "Any planned expenses?" (optional)
  4. "Add your cards?" (optional, can skip)
- Progress indicator (1 of 4, 2 of 4, etc.)
- "Skip" option for optional steps
- "Finish Setup" on last step

## Data Management

### Export Data
**What**: Backup/export all data
**Interaction**:
- Button in settings: "Export Data"
- Generates JSON file
- Share sheet (save to files, email, etc.)

### Import Data
**What**: Restore from backup
**Interaction**:
- Button in settings: "Import Data"
- File picker
- Confirmation modal: "This will replace all current data"
- "Import" and "Cancel" buttons

## Error States & Empty States

### No Income Set
**Display**: "Add your expected income to see your available funds"
**Action**: "Add Income" button

### No Expenses Yet
**Display**: "No expenses this month. You're doing great! 🎉"
**Action**: "Add Expense" button

### Over Budget
**Display**: Big number in red, negative value
**Message**: "You're over budget by $X. Review your expenses or adjust your savings goal."

### No Internet (if cloud sync enabled)
**Display**: Small indicator "Offline mode - data will sync when connected"
