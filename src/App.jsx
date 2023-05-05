import "./App.css";
// import { Start } from './Start'
import { MainPage } from "./components/MainPage";
import backgroundImage from "../src/images/Sunday.jpg";


function App() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <MainPage />
    </div>
  );
}

export default App;
