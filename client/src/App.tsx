import "./App.css";
import JobsList from "./components/JobsList/JobsList";
import Navbar from "./components/Navbar/Navbar";
import { sampleJobs } from "./types/type";

function App() {
  return (
    <>
      <Navbar />
      <JobsList jobs={sampleJobs} />
    </>
  );
}

export default App;
