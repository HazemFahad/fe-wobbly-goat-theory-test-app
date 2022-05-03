import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/user";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <StackNavigator />
      </UserProvider>
    </NavigationContainer>
  );
}
