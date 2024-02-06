import { NativeBaseProvider, Box } from "native-base";
import { Root } from "./src/components/RootComponent";

export default function App() {
  return (
    <NativeBaseProvider>
      <Root></Root>
    </NativeBaseProvider>
  );
}
