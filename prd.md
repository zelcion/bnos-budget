# Product Requirements: BNOS Budget

## What We're Building

BNOS Budget = Big Number On Screen. An idiotically simple budgeting app for people who suck at budgeting.

**The One Thing That Matters**: A big number that shows how much money you have AVAILABLE to spend right now. Not your bank balance, not your budget remaining, but actual available funds after accounting for savings goals and planned expenses.

**Target User**: You're probably not that organized. You have a hard time with complex budgeting apps with categories and advanced tracking. You just want to know: "Can I actually afford this or not?" without opening a calculator or doing mental math.

## The Validation Goal

**We need to validate the UI and interaction model FIRST.** The backend and data structures are simple - the UI and interactions are what will make or break this app. That means building the damn UI with basic in-memory data to make sure the prototype actually makes sense.

**Success = Users can answer "Can I afford this?" in under 3 seconds.**

## Core Features (MVP - What We're Actually Building)

### 1. The Big Number
- Massive number at the top of screen
- Shows available spending money (not bank balance)
- Updates in real-time as you add expenses
- Color-coded so you know if you're good or screwed:
  - Green: You're fine
  - Yellow: Careful now
  - Red: Really low
  - Purple: Under $0 but still within your savings buffer
  - Dark Purple: You're actually broke and in debt this month

### 2. Quick Expense Entry (This Must Be FAST)
- 6 floating emoji buttons (your recent expenses)
- Tap emoji → Amount drawer → Add → Done
- That's it. 3 seconds max.
- "+" button if you need a different emoji
- Auto-assigns today's date (because you won't remember to set it)
- Defaults to "Cash" (because you probably paid with cash or debit)

### 3. Past Expenses List
- See what you spent money on
- Swipe left to delete (you logged it wrong, we know)
- Hold to edit (because you fat-fingered the amount)
- Shows emoji + amount + which card (if you specified)
- Sorted by date, newest first

### 4. Month Navigation
- Month/year above the big number
- Left/right arrows to switch months
- Tap month name for calendar picker
- "Back to Current Month" button when you're looking at old data
- **Why**: So you can catch up on expenses you forgot to log

### 5. Batch Add Mode
- Add multiple expenses with past dates
- Because you WILL forget to log things for days
- No shame, just catch up when you remember

## Extended Features (Build These If MVP Works)

### Cards Tracking
Users forget which card they used. Let them track it:
- Add cards with names and colors
- Pick a card when adding an expense
- See which card you used in the expenses list
- **Important**: Card expenses count toward the month they're DUE, not when you spent them
- Don't abuse this though, you idiot.

### Income & Savings Goals (For the 30% Who Plan Ahead)
- Set monthly income
- Set savings goals
- Big number accounts for these automatically
- Most users won't touch this, and that's fine

### Planned Expenses
- Add future expenses (rent, bills, etc.)
- Big number accounts for them
- Auto-converts to real expense on the date
- Only for users who actually plan ahead (rare)

## What We're NOT Building (Yet)

- ❌ Categories - too much work, emojis are enough
- ❌ Budgets by category - too complex
- ❌ Spending reports - you don't want to see how bad you are
- ❌ Charts and graphs - same reason
- ❌ Bank sync - manual entry only for MVP
- ❌ Cloud sync - local storage only for MVP
- ❌ "Tips" or "advice" - you don't want to be lectured
- ❌ Notifications (maybe gentle "forgot to log?" later)
- ❌ Shared budgets - this is personal
- ❌ Onboarding tutorial - UI should be obvious enough

## Technical Approach

- **Mobile first, mobile only** - No desktop, no responsive design for validation
- **React Native** - Quick iteration, test on primarily Android, then iOS
- **NativeWind** - Tailwind for React Native
- **Zustand** - Lightweight (2KB) state management, no boilerplate bullshit
- **In-memory data for MVP** - No database until we validate the interactions

## Design Principles

1. **Speed above all** - Logging an expense takes 3 seconds or users give up
2. **Zero judgment** - Never make users feel bad about their spending
3. **Works when ignored** - App doesn't break if you forget about it for a week
4. **No required fields** - Emoji + amount, that's it
5. **Mistakes are okay** - Everything can be edited or deleted
6. **No guides needed** - If you need a tutorial, the UI failed
7. **Honest defaults** - Assume cash, assume today, assume user is lazy

## How We Know It's Working

### Must Have
- [ ] Users can check "am I broke?" in < 1 second
- [ ] Users can log an expense in < 5 seconds
- [ ] Users understand the color coding without explanation
- [ ] Users can edit/delete expenses without asking how
- [ ] App works even if user doesn't log for 3 days

### Nice to Have
- [ ] Users come back after abandoning the app for a week
- [ ] Users never ask "how do I...?"
- [ ] 30%+ of users actually use planning features
- [ ] Users say "this actually makes sense"

## Out of Scope Questions

Don't overthink these for MVP:

- Multiple currencies? No, USD only.
- Export data? Not yet.
- Show cents or round? Round to dollars for easier reading.
- Timezone handling? Use device time, don't overthink it.
- Push notifications? Maybe later, must be gentle, never judgmental.

## Build Order

### Phase 1: The Essentials (2-3 weeks)
Build ONLY what proves the concept works:
1. Big number display with color coding
2. Quick expense entry (emoji + amount)
3. Past expenses list (view, edit, delete)
4. Month navigation
5. Batch add for past expenses

If this doesn't work, nothing else matters.

### Phase 2: Cards & Persistence (2 weeks)
Only if Phase 1 validates:
1. Card tracking
2. Local storage (so data persists)
3. "Forgot to log?" gentle reminders

### Phase 3: Planning Features (2 weeks)
For the minority who actually plan:
1. Income & savings goals
2. Planned expenses
3. Bottom navigation for these sections

## The Real Success Metric

**If users check the app BEFORE buying something to see if they can afford it, we won.** Everything else is secondary.

---

**Bottom line**: You're lazy, you have no self-control, and you're bad with money. This app knows that and doesn't care. It just shows you a number. Don't overthink it.
