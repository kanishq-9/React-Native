import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ScrollView} from 'react-native';
import {Focus} from "./src/components/Focus";
export default function App() {
  return (
    <SafeAreaProvider>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Focus />
      </ScrollView>
    </SafeAreaProvider>
  );
}


