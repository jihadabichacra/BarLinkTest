# BarLinkApp

BarLinkApp is a React Native app built with Expo that displays bars on a map using OpenStreetMap + Overpass API. Users can zoom to load pins, tap once to see the bar name, tap again to view details (hours, beer price, photo), and refresh the data.

---

## 📥 Prerequisites & Installation Links

1. **Node.js** (v14.x or higher)  
   - Download & install: https://nodejs.org/

2. **Yarn** (optional, or use npm)  
   ```bash
   npm install -g yarn
   ```

3. **Expo CLI**  
   ```bash
   npm install -g expo-cli
   ```  
   Docs: https://docs.expo.dev/get-started/installation/

4. **React Native Maps**  
   ```bash
   expo install react-native-maps
   ```  
   GitHub: https://github.com/react-native-maps/react-native-maps

5. **React Navigation**  
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack
   expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
   ```  
   Docs: https://reactnavigation.org/docs/getting-started

6. **Lodash (for debounce)**  
   ```bash
   npm install lodash
   npm install --save-dev @types/lodash
   ```  
   Lodash: https://lodash.com/

7. **TypeScript & types** (if using TypeScript)  
   ```bash
   npm install --save-dev typescript @types/react @types/react-native
   ```  
   Docs: https://www.typescriptlang.org/

---

## 🔧 Installation Steps

```bash
# 1. Clone the repo
git clone https://github.com/your-org/BarLinkApp.git
cd BarLinkApp

# 2. Install dependencies
npm install        # or yarn install

# 3. Install native peer deps for maps & navigation
expo install react-native-maps react-native-screens react-native-safe-area-context react-native-gesture-handler

# 4. (Optional) Install lodash debounce
npm install lodash
npm install --save-dev @types/lodash

# 5. Start Metro bundler
npm start          # or expo start
```

Scan the QR code with Expo Go or press `i`/`a` to run in simulator.

---

## 📂 Project Structure

```
BarLinkApp/
├── api/
│   └── bars.ts          # Overpass API fetching logic
├── components/
│   └── BarCard.tsx      # Optional bar card component
├── navigation/
│   └── AppNavigator.tsx # React Navigation setup
├── screens/
│   ├── HomeScreen.tsx
│   ├── BarMapScreen.tsx
│   └── BarDetailScreen.tsx
├── utils/
│   └── debounce.ts      # Custom debounce (if not using lodash)
├── App.tsx
├── package.json
└── tsconfig.json
```

---

## 🛠️ Roadmap Improvements

### UX & Features

| Feature                   | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| Marker Clustering         | Group nearby pins into clusters that expand on tap                |
| Search & Filter           | Filter bars by name, category, price range, rating                |
| Favorites / Wishlist      | Let users star bars and view a favorites list                     |
| List View Toggle          | Switch between map and scrollable list view                       |
| Photos Carousel           | Swipeable gallery in detail screen (integrate Foursquare/Yelp)    |
| Reviews & Ratings         | Display user reviews and ratings                                  |
| Check-in & Rewards        | Users check-in to earn points or coupons                          |
| Offline Caching           | Cache last-viewed region for offline use                          |

### Technical & Performance

| Improvement               | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| Debounce Region Change    | Use lodash or custom debounce to limit API calls on zoom/pan      |
| Data Caching              | Cache API results in AsyncStorage or SQLite per map tile/region   |
| Infinite Scroll           | Paginate in list view                                             |
| Type-safe API Layer       | Centralize fetch logic with typed responses & error handling      |
| Unit & Integration Tests  | Add Jest & React Native Testing Library tests                     |
| CI/CD Pipeline            | GitHub Actions for lint, type-check, tests, builds                |
| Performance Monitoring    | Integrate Sentry or Firebase Performance                           |

### Business & Growth

| Initiative                | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| Bar Dashboard             | Web dashboard for bar-owners to manage promotions & view check-ins |
| Push Notifications        | Notify users of nearby promotions                                 |
| Referral Program          | Incentivize users to invite friends                               |
| Partnerships              | Integrate ride-hail, ticketing, payments                          |
| Analytics Dashboard       | Track user metrics (DAU/MAU, popular bars)                        |
| Monetization              | Featured listings, coupon commissions, in-app ads                 |

---

## 🎯 Next Steps Example: Debounce

1. Install lodash debounce:  
   ```bash
   npm install lodash @types/lodash
   ```
2. In `screens/BarMapScreen.tsx`, import and wrap your `loadBars` with `useMemo`:
   ```ts
   import debounce from 'lodash/debounce';
   import { useMemo } from 'react';

   const debouncedLoad = useMemo(
     () => debounce((r: Region) => loadBars(r), 300),
     [loadBars]
   );
   <MapView onRegionChangeComplete={debouncedLoad} … />
   ```
3. Test on device: verify fewer API calls & smooth UX.

---

Happy coding! 🍻
