import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom'; 

// PAGES
import { Home } from './pages/Home'; 
import { Dashboard } from './pages/Dashboard'; 
import { CreateAssignment } from './pages/CreateAssignment'; 
import { CreateGrade } from './pages/CreateGrade'; 
import { StudentInfo } from './pages/StudentInfo'; 

// CONTEXT
import { GradeContextProvider } from './context/GradeContext'; 

// Implement Dynamic Routes for Student Info Page *

function App() {
  return (
    <GradeContextProvider>
      <Router>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/assignment" component={CreateAssignment} />
                <Route exact path="/grade" component={CreateGrade} />
                {/* <Route exact path="/student/:studentID" component={StudentInfo} /> */}
                <Route exact path="/student" component={StudentInfo} />
            </Switch>
        </div>
      </Router>
    </GradeContextProvider>
  );
}

export default App;
