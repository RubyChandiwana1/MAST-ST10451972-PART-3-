https://github.com/RubyChandiwana1/MAST-ST10451972-PART-3-.git
# Amagwinya Scones - Menu Management App
1. *Menu Item Management*
   - Add menu items with dish name, description, course, and price
   - Predefined course list (starter, main, dessert)
   - Form validation for all fields

2. *Home Screen*
   - Displays total number of menu items
   - Navigation buttons for each course (STARTER, MAIN, DESSERT)
   - Add menu item button
   - Filter by course button

3. *Multiple Screens*
   - *Home Screen*: Main navigation hub
   - *Category Screen*: Shows dishes for selected course
   - *Add Menu Item Screen*: Form to add new dishes
   - *Filter by Course Screen*: Filter and view items by course

4. *User Interface*
   - Clean, modern design matching the provided wireframes
   - Consistent color scheme and typography
   - Responsive layout
   - Intuitive navigation


 How to Run

1. *Install dependencies* (if not already done):
   bash
   npm install
   

2. *Start the development server*:
   bash
   npm start
   

3. *Run on different platforms*:
   - Web: npm run web
   - Android: npm run android (requires Android Studio/emulator)
   - iOS: npm run ios (requires macOS)

 App Flow

1. *Home Screen*: Shows total menu items and course navigation
2. *Course Selection*: Tap STARTER/MAIN/DESSERT to view dishes
3. *Add Items*: Use "Add Menu Item" button to create new dishes
4. *Filter*: Use "Filter by Course" to view items by category
5. *Navigation*: Back buttons and header navigation throughout

 Technical Implementation

- *React Navigation*: Stack navigation for multiple screens
- *Context API*: State management for menu items
- *TypeScript*: Type safety throughout the app
- *Expo*: Cross-platform development framework
- *React Native*: Native mobile app development

 Sample Data

The app comes with sample menu items:
- Pea Soup (Starter) - R8.99
- Steak (Main) - R24.99  
- Chocolate Mousse (Dessert) - R6.99

Requirements Met

✅ Chef can enter menu items with dish name, description, course, and price  
✅ Predefined list of courses (starter, main, dessert)  
✅ Home screen displays the menu  
✅ Home screen shows total number of menu items  
✅ Multiple screens implementation  
✅ Working application ready for demonstration  


## Changelog

### 2025-11-13
- Filter: Replaced inline empty-state view with reusable `EmptyState` component.
- Home: Confirmed non-overlapping buttons using ScrollView + spacing.
- Docs: Updated changelog to reflect refactors and polish for final PoE.

### 2025-11-07
- Refactor: Extracted `utils/format.ts` with `formatPrice` and `getCourseName` helpers, and replaced inline formatting in `CategoryScreen` and `FilterByCourseScreen` for consistency and reuse.
- Refactor: Added `components/EmptyState.tsx` and used it in the Filter screen for cleaner, reusable empty-state UI.
- Home: Average price by course (Starter/Main/Dessert) displayed with R currency.
- Home: Added complete “All Items” list for the full menu.
- Manage: Added ability to remove items from the Add Menu Item screen.
- Enriched filter results: show name, course badge, description, and price (R with two decimals); added empty state when no matches.
- Standardized currency styling to “R” across Category, Filter, and Home latest list.
- Added “Latest Items” section on Home (last 3 items) with a “See all” link.
- Reduced Home “Add Menu Item” and “Filter by Course” button sizes for better balance.
- Prevented button overlap on small screens: wrapped Home in a scroll container and added spacing.
- Unified price typography (size and weight) across screens for consistency.

### Initial
- Initial app structure with Home, Category, Add Menu Item, and Filter screens.
