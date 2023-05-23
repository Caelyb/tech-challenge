import "./App.css";
import Projects from "./components/projects";

const App = () => (
  <>
    <div className="app-header">
      Treeconomy Challenge
      <span className="app-header-name"> Caelyb Lockett </span>
      <body className="backdrop">
      <Projects/>
      </body>
    </div>
  </>
);

export default App;
