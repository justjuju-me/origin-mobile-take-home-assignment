## Video Demonstration

Watch the video below for a demonstration: [Demo Video](https://drive.google.com/file/d/1sVljrfY6JHF0QNTD7eNR2lMfvEJF0NVq/view?usp=sharing)

## Before Running

Please refer to the documentation provided at [Expo's official tutorial](https://docs.expo.dev/tutorial/create-your-first-app/) to set up Expo.

## How to Run

You can start the application by running the following command:

```bash
yarn start
```

## On a Physical Device: Android or iOS

Ensure that you have the Expo Go app installed on your physical device. Make sure both your device and development environment are connected to the same network. Then, simply scan the QR code using your device's camera.

## On an Android Simulator:

To run the application on an Android simulator, you'll need to have Android Studio installed. Create a virtual device with the Play Store app installed. We recommend using a Pixel 4 virtual device. To start the application on an Android simulator, execute the following command in the terminal:

```bash
a
```

To test uploading images on the Android simulator, ensure that you have previously opened the camera app and taken a sample picture, as the picture albums start empty by default.

## On an iOS Simulator:

To run the application on an iOS simulator, ensure that you have Xcode installed. Create a virtual device, then execute the following command in the terminal:

```bash
i
```

## About the Project

### Folder structure

```bash
Project
├── components
├── config
├── contexts
├── routes
├── screens
│ ├── Auth
│ └── Transactions
└── shared
  ├── ApiHooks
  ├── Schemas
  ├── Services
  │ ├── API
  │ └── DTOs
  ├── Types
  └── Utils
```

- **Components:** Houses reusable modular pure components. It offers seamless integration with Storybook for component visualization and unit testing, ensuring ease of use and maintenance.
- **Config:** This directory contains configuration files tailored to facilitate testing within this project.
- **Contexts:** This section is for reusable contexts, featuring the AuthContext which defines the session control mechanism.
- **Routes:** Contains definitions for routes, navigation hooks, route parameters, and stack navigation.
- **Screens:** Implements all screens, categorized into two domains: `auth` (sign-in and sign-up) and `transactions` (list and details).
- **Shared:** Files within the shared folder can be utilized across different projects, potentially transformable into an npm tool. This approach facilitates seamless integration into both web and React Native projects.
  - **ApiHooks:** Defines the implementation of React Query and transaction API hooks. Currently, DTOs are used to transform data from external APIs into the system's format.
  - **Schemas:** Contains validation schema definitions, typically used for creating rules to validate forms.
  - **Services:** Handles connections with external services, functioning as an anti-corruption layer.
    - **API:** Integrates with Axios and defines query rules. Due to some limitations in tests, async storage (exclusive to React Native) is utilized to enhance user experience, such as updating receipt images after submission. While the folder slightly deviates from its responsibilities, the code can be simplified further in real-world scenarios.
    - **DTOs:** Defines transformations between data from the API and its usage within the application.
  - **Types:** Provides type definitions for the entire application.
  - **Utils:** Contains pure functions for various conversions.

### Authentication

I've opted for a straightforward authentication method using local storage. While effective as a provisional solution, the preferred approach would involve integration with an API for authentication and account creation. Alternatively, services like Firebase could be leveraged for a more easily implementable authentication system, offering scalability and additional features.

### Transactions API

An adaptation was implemented to enhance the user experience for the prototype. When a request is made to the uploadimage or updatecoordinates endpoint, if the request is successful, it creates a new record in the app's local storage and returns the new record. For the get transaction endpoint, it checks if there is anything stored in the local storage before making the request. If there is already a record, it does not make the request and returns the stored record. However, in a real solution, this approach does not make sense because the API response always takes precedence in updating the information.

### Sort and Filtering

Filtering has been implemented for vendors, categories, types, amounts, and dates. Sorting has been applied specifically to amounts and dates. When filtering, sorting will be applied to the filtered resources. However, loading new pages with infinite scroll will not function while filtering.

### Handle offline mode

Some solutions have been implemented to manage offline capabilities without disrupting the application's functionality. However, the most effective approach appears to be implementing an offline-first strategy using Redux, redux-persist, and react-native-offline. Another viable solution would involve leveraging WatermelonDB.

### Style

I've implemented a simple structure without relying on frameworks or additional tools. I've made a deliberate decision to deprioritize this module due to time constraints, opting instead to concentrate on other essential system components.

### Unit Tests

```bash
yarn test
```

Simple rendering tests were developed using React Testing Library for some core components. While I value the implementation of more tests, due to time constraints, this aspect could have received more attention to ensure the software functions properly.
