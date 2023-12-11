# Automated Parcel System Test Robot

This React component, `Robot`, is designed to simulate interactions with an automated parcel system. The system is assumed to have the following features:

## Features

- **Users:** A list of users retrieved from the backend.
- **Random Users:** Two randomly selected users from the user list, designated as the sender and receiver.
- **Random Letters:** Two randomly selected letters from the alphabet (A, B, C, D, E).
- **Empty Cabinets:** Empty cabinets associated with the randomly selected letters.
- **Manual Parcel Sending:** Manually sending a parcel by specifying sender and receiver details and selecting empty cabinets.
- **Automated Testing:** Automated testing mode to continuously send parcels at regular intervals.

## Code Overview

### State Variables

- `users`: Array of users retrieved from the backend.
- `randomUsers`: Array containing two randomly selected users.
- `currentSender`: Details of the current sender user.
- `currentReceiver`: Details of the current receiver user.
- `randomLetters`: Two randomly selected letters.
- `emptyCabinets0`: Empty cabinets associated with the first random letter.
- `emptyCabinets1`: Empty cabinets associated with the second random letter.
- `isPageLoaded`: Boolean indicating whether the page has loaded.
- `isAutoTesting`: Boolean indicating whether automated testing is active.
- `isSendParcelDisabled`: Boolean indicating whether the manual send parcel button is disabled.

### Functions

- `generateRandomLetters`: Generates two random letters from the alphabet.
- `fetchData`: Fetches user data from the backend.
- `getRandomUsers`: Selects two random users from the user list.
- `findEmptyCabinets`: Finds empty cabinets associated with the random letters.
- `sendParcel`: Sends a parcel using the selected sender, receiver, and empty cabinets.
- `autoTest`: Function to be called in automated testing mode, sending parcels at intervals.
- `handleSendParcelClick`: Event handler for manually sending a parcel.
- `handleAutoTestClick`: Event handler for toggling automated testing mode.

### useEffect Hooks

- The first `useEffect` hook initializes the component by generating random letters, fetching user data, selecting random users, and finding empty cabinets.
- The second `useEffect` hook runs automated testing at regular intervals when `isAutoTesting` is true.

## How to Use

1. Start by rendering the `Robot` component within your React application.
2. Two randomly selected user accounts will be displayed.
3. Click the "Manually add package information" button to send a parcel manually.
4. Click the "Start automated testing" button to initiate automated testing mode.
5. Use the "Stop automated testing" button to halt automated testing.