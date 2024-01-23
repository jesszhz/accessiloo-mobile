import { NativeBaseProvider, Box } from "native-base";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <NativeBaseProvider>
      <Topbar></Topbar>
      <Box safeArea>Hello world</Box>
    </NativeBaseProvider>
  );
}
