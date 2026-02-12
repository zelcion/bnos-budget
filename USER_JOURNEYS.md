# User Journeys

## Journey 1: First Time User - No goals, no planned expenses, no cards
**GOAL**: See the big number on screen actually represent the user's available money to spend, while understanding how to use the app.
**HOW**: No guides, just pure UI that doesn't feel threatening to make mistakes. Should avoid deeply nested features/menus, making it easy to understand how to use the app without needing to have any guides. Every action should be reversible, so the user can feel safe exploring.

1. User opens the app for the first time, sees a big number on the screen "$0" in large, bold typography
2. User notices the month/year displayed above the big number with left/right arrows
3. Below the big number, user sees empty grey pills (empty state with no text visible)
4. Six floating emoji buttons are visible at the bottom, along with a "+" button
5. User taps the "+" button out of curiosity
6. Emoji picker appears showing recent emojis (empty for first time), user can add new emoji
7. User selects a coffee emoji ☕
8. Amount input drawer appears immediately with numeric keyboard and currency symbol
9. Card selector shows "Cash 💵" as default
10. User enters "$5" and taps "Add"
11. Big number updates to "-$5" (now in dark purple - negative available funds)
12. User sees the expense appear in the Past Expenses List below with coffee emoji and $5
13. User swipes left on the expense accidentally, sees delete option
14. User doesn't delete, taps elsewhere to dismiss
15. User taps the big number to explore what happens
16. Income & goals pills expand to show details (currently empty, no income or goals set)
17. Big number shows same value (no savings buffer yet)
18. User taps big number again to collapse pills back to dots
19. User understands: Add expenses → Big number updates → Track spending easily

**Key UX Elements Used**:
- Big Number Display (color-coded feedback)
- Add Expense Buttons (emoji picker + amount input)
- Past Expenses List (swipe to delete)
- Month Switcher (visible but not yet interacted with)
- Income & Goals Pills (revealed by tapping big number)

---

## Journey 2: Regular User - Quick Expense Entry
**GOAL**: Add a common expense as quickly as possible (under 5 seconds)
**HOW**: Leverage recently used emojis and minimal input friction

1. User opens app, sees current month's big number (e.g., "$450" in green)
2. User just bought lunch and wants to log it immediately
3. User taps the lunch emoji 🍱 (one of the 6 floating recent emojis)
4. Amount input drawer appears instantly
5. User types "12" (no need to type $ symbol)
6. User taps "Add" (or Enter)
7. Big number updates to "$438" in real-time
8. Expense appears at top of Past Expenses List
9. Total time: ~3 seconds

**Key UX Elements Used**:
- Big Number Display (real-time update)
- Add Expense Buttons (quick emoji access)
- Auto-date assignment (no need to select date)
- Past Expenses List (immediate feedback)

---

## Journey 3: User Planning Monthly Expenses
**GOAL**: Set up recurring/planned expenses for the month to better understand available funds
**HOW**: Navigate to Planned Expenses section and add future expenses

1. User opens app at the beginning of the month
2. Big number shows "$1200" (after adding income)
3. User swipes left or taps Planned Expenses icon in bottom navigation (left of home icon)
4. Screen transitions to Planned Expenses view (big number still visible but smaller)
5. User taps "+" to add a planned expense
6. User selects rent emoji 🏠 from picker
7. Amount input drawer appears with additional date picker (defaults to current month)
8. User enters "$600" and selects "15th" as the date
9. User marks it as "Recurring" (monthly)
10. User taps "Add"
11. User navigates back to Home (swipes right or taps Home icon)
12. Planned expense appears in Incoming Expenses Indicator (above Past Expenses List) showing rent emoji, $600, and date "15th"
13. Big number adjusts to "$600" (accounting for planned expense)
14. User swipes left again to Planned Expenses and adds more: utilities 💡 $80, internet 📡 $50
15. Navigating back to Home, Incoming Expenses Indicator shows all 3 planned expenses
16. Big number updates to "$470" showing truly available spending money
17. On the 15th, rent expense automatically moves from Incoming Expenses to Past Expenses List
18. Big number updates accordingly

**Key UX Elements Used**:
- Bottom Navigation Bar (accessing Planned Expenses)
- Incoming Expenses Indicator (showing upcoming expenses)
- Big Number Display (accounting for planned expenses)
- Month Switcher (planning within current month)
- Recurring expense marker

---

## Journey 4: User Managing Credit Cards
**GOAL**: Track expenses paid with credit cards separately from cash
**HOW**: Set up cards and from Home or taps Cards icon in bottom navigation (left of Planned Expenses icon)
2. Cards section opens (big number still visible but smaller)
3. User sees empty cards list with "Add Card" button
4. User taps "Add Card"
5. Modal appears with card name input and color picker
6. User enters "Visa" and selects blue color
7. User taps "Save"
8. Card appears in cards list
9. User navigates back to Home (swipes right twice
8. Card appears in cards list
9. User navigates back to Home (swipes right or taps Home icon)
10. User buys groceries with credit card
11. User taps groceries emoji 🛒 from recent emojis
12. Amount drawer appears with card selector showing "Cash 💵" and "Visa" (blue)
13. User selects "Visa" card
14. User enters "$85" and taps "Add"
15. Expense appears in Past Expenses List with groceries emoji, $85, and "Visa" label
16. Big number updates to account for the expense
17. User can later review all Visa expenses by filtering in Cards section

**Key UX Elements Used**:
- Bottom Navigation Bar (accessing Cards section)
- Add Expense Buttons (with card selector)
- Past Expenses List (showing card label)
- Big Number Display (updates regardless of payment method)

---

## Journey 5: User Reviewing and Editing Past Expenses
**GOAL**: Fix a mistake in a logged expense
**HOW**: Use swipe and hold gestures on Past Expenses List

1. User opens app and scrolls through Past Expenses List
2. User notices they entered lunch as "$20" instead of "$12"
3. User holds the lunch expense item
4. Same modal as adding an expense appears, pre-filled with:
   - Lunch emoji 🍱
   - Amount: $20
   - Card: Cash 💵
   - Date: (original date)
5. User changes amount to "$12"
6. User taps "Save"
7. Big number updates from "$430" to "$438" (adding $8 back)
8. Updated expense shows in Past Expenses List with correct amount
9. User realizes they don't need an old coffee expense
10. User swipes left on coffee expense
11. Delete button appears
12. User taps delete
13. Expense is removed, big number updates immediately

**Key UX Elements Used**:
- Past Expenses List (hold to edit, swipe to delete)
- Big Number Display (real-time recalculation)
- Reversible actions (can add expense back if deleted by mistake)

---

## Journey 6: User Setting Savings Goals
**GOAL**: Set aside money for savings while still seeing available spending money
**HOW**: Tap big number or income/goals pills to reveal and manage savings goals

1. User opens app, sees big number "$1200" (in green)
2. Below big number, user sees empty colored pills (small dots)
3. User wants to save $200 this month for vacation
4. User taps the big number (or taps on the pills themselves)
5. Pills expand and enlarge, showing details
6. Green income pills appear (if income was added): "+$3000"
7. "Add Goal" button appears in the expanded section
8. User taps "Add Goal"
9. Modal appears with goal name and amount inputs
10. User enters "Vacation Fund" and "$200"
11. User selects blue color for the goal pill
12. User taps "Save"
13. Big number adjusts to "$1000" (showing available funds after goal)
14. Blue savings goal pill appears showing "→ $200" (or "- $200")
15. User taps big number again to collapse pills back to dots
16. Big number now shows "$1000" (accounting for savings goal)
17. If user spends down to $50, big number shows "$50" (yellow - warning zone)
18. If user continues spending, hits -$50, big number shows "-$50" (purple - under $0 but within savings buffer)
19Income & Goals Pills (tap to expand/collapse, show detailed breakdown)
- Color-coded indicators (green, yellow, red, purple, dark purple)
- Expandable pills showing income (+) and goals (→ or -ble funds (disregarding savings goals)

**Key UX Elements Used**:
- Big Number Display (with savings goal buffer calculation)
- Savings Goal Indicator (tap to reveal/hide)
- Color-coded indicators (green, yellow, red, purple, dark purple)

---

## Journey 7: User Navigating Between Months
**GOAL**: Review past months and plan future months
**HOW**: Use Month Switcher to navigate timeline

1. User opens app on February 15th
2. Current month (February) displayed above big number
3. Big number shows "$320" (current available funds)
4. User wants to review January spending
5. User taps left arrow on Month Switcher
6. Screen transitions to January view
7. Big number shows final January balance (e.g., "$45" - what was left)
8. Past Expenses List shows all January expenses
9. "Return to Current Month" button appears
10. User scrolls through January expenses
11. User taps right arrow to go to February (or taps "Return to Current Month")
12. Screen returns to February with current data
13. User taps right arrow to preview March
14. Big number shows "$0" (month hasn't started)
15. User can add planned expenses for March
16. User taps "Return to Current Month" to get back to February

**Key UX Elements Used**:
- Month Switcher (arrows and month name tap)
- Big Number Display (context-aware per month)
- Past Expenses List (filtered by selected month)
- "Return to Current Month" quick action button

---

## Journey 8: User Adding Planned Income
**GOAL**: Set up expected income for the month
**HOW**: Navigate to Planned Income section and add income sources

1. User opens app at the beginning of the month, sees big number "$0"
2. User swipes right or taps Planned Income icon in bottom navigation (right of home icon)
3. Screen transitions to Planned Income view (big number still visible but smaller)
4. User taps "+" to add planned income
5. User selects salary emoji 💰 from picker
6. Amount input drawer appears with date picker (defaults to current month)
7. User enters "$3000" and selects "5th" as the date
8. User marks it as "Recurring" (monthly)
9. User taps "Add"
10. User navigates back to Home (swipes left or taps Home icon)
11. Green income pill appears below the big number (collapsed state - just a dot)
12. Big number updates to "$3000" (accounting for planned income)
13. User taps the big number or the green pill to expand
14. Green pill expands showing "+$3000" with salary emoji
15. User adds another income source: freelance work 💻 $500 on the 20th
16. Second green pill appears when expanded view is shown
17. On the 5th, salary income is automatically applied
18. On the 20th, freelance income is automatically applied
19. Income pills remain visible showing what income has been received

**Key UX Elements Used**:
- Bottom Navigation Bar (accessing Planned Income section - right swipe from Home)
- Income & Goals Pills (green pills showing income amounts when expanded)
- Big Number Display (accounting for planned and received income)
- Recurring income marker
- Month Switcher (planning within current month)

---

## Journey 9: Power User - Full Monthly Cycle
**GOAL**: Complete monthly budget cycle from planning to review
**HOW**: Combine all features throughout the month

**Beginning of Month (March 1st)**:
1. User opens app, sees "$0" for new month
2. User swipes right to Planned Income section (or taps Planned Income icon)
3. User adds paycheck: "Salary 💰 $3000" scheduled for March 5th
4. User returns to Home, sees green income pill (collapsed as dot)
5. User swipes left to Planned Expenses (or taps Planned Expenses icon)
6. User adds recurring expenses: Rent, utilities, subscriptions
7. User returns to Home, sees Incoming Expenses Indicator showing planned expenses
8. Big number now shows projected available funds after all planned expenses
9. User taps big number to expand pills
10. User adds savings goal: "$500" for emergency fund (blue pill appears)
11. User taps big number again to collapse pills back to dots
12. User returns to Home view

**Mid-Month (March 15th)**:
13. Salary has auto-converted to income (March 5th), green pill still visible
14. Some planned expenses from Incoming Expenses Indicator have auto-converted to Past Expenses List
15. User has been adding daily expenses using quick emoji buttons
16. Big number shows "$890" (yellow - getting lower)
17. User reviews Past Expenses List to see where money went
18. User checks Incoming Expenses Indicator (above Past Expenses) to see what's still coming

**End of Month (March 31st)**:
19. All planned expenses have been realized and moved to Past Expenses List
20. Incoming Expenses Indicator is now empty or shows only next month's early expenses
21. Big number shows "$120" (green - ended month well)
22. User navigates to April to start planning next month
23. User reviews March one more time before leaving it
24. Cycle repeats

**Key UX Elements Used**: All core features in realistic workflow

---

## Design Principles Reflected in Journeys

1. **No Guides Needed**: UI is self-explanatory through clear visual hierarchy and immediate feedback
2. **Reversible Actions**: Every mistake can be undone (swipe to delete, hold to edit)
3. **Minimal Input**: Auto-date, quick emoji selection, minimal required fields
4. **Always-Visible Big Number**: Central focus never leaves screen
5. **Real-time Updates**: Every action immediately reflects in the big number
6. **Progressive Disclosure**: Advanced features (goals, cards) available but not overwhelming
7. **Context-Aware**: App understands current month vs. past/future months
8. **Speed-Optimized**: Common actions (quick expense) take 3-5 seconds 