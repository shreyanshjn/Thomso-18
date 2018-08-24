import React, { Component } from 'react';
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from "./components/common/Loader";

// Beta route not being used currently
// const BetaIndex = Loadable({
//   loader: () => import('./components/beta/Index'),
//   loading: () => <div>Loading BetaIndex</div>,
// });

const FakeNotification = Loadable({
  loader: () => import('./components/common/Notification'),
  loading: () => <Loader />,
});

const CAIndex = Loadable({
  loader: () => import('./components/ca/Index'),
  loading: () => <Loader />,
});
// const ParticipantIndex = Loadable({
//   loader: () => import('./components/participants/Index'),
//   loading: () => <Loader />,
// });
const FAQIndex = Loadable({
  loader: () => import("./components/beta/faq/Index"),
  loading: () => <Loader />
});

const SponsorsIndex = Loadable({
  loader: () => import("./components/beta/sponsors/Index"),
  loading: () => <Loader />
});

const AccociateIndex = Loadable({
  loader: () => import("./components/beta/associate/Index"),
  loading: () => <Loader />
});

const QuizardryIndex = Loadable({
  loader: () => import("./components/beta/quizardry/index"),
  loading: () => <Loader />
});

const TeamIndex = Loadable({
  loader: () => import("./components/beta/team/Index"),
  loading: () => <Loader />
});

const HomeIndex = Loadable({
  loader: () => import("./components/beta/home/Index"),
  loading: () => <Loader />
});

const VerifyCerti = Loadable({
  loader: () => import("./components/verifyCerti/Index"),
  loading: () => <Loader />
});

const Policy = Loadable({
  loader: () => import("./components/common/Policy"),
  loading: () => <Loader />
})

const Terms = Loadable({
  loader: () => import("./components/common/Terms"),
  loading: () => <Loader />
})
const Error404 = Loadable({
  loader: () => import("./components/common/Errorpage"),
  loading: () => <Loader />
})
const CampusIndex = Loadable({
  loader: () => import('./components/campusAmbassador/Index'),
  loading: () => <Loader />,
});
const ZonalsIndex = Loadable({
  loader: () => import("./components/zonal/Index"),
  loading: () => <Loader />
});
const MainIndex = Loadable({
  loader: () => import("./components/main/Index"),
  loading: () => <Loader />
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={FakeNotification} />
          <Switch>
            <React.Fragment>
              {/* <Route path="/beta" component={BetaIndex} /> */}
              <Route exact path="/" component={HomeIndex} />
              <Route exact path="/sponsors" component={SponsorsIndex} />
              <Route exact path="/associate" component={AccociateIndex} />
              <Route exact path="/quizardry" component={QuizardryIndex} />
              <Route exact path="/team" component={TeamIndex} />
              <Route exact path="/faq" component={FAQIndex} />
              <Route path="/ca/" component={CAIndex} />
              <Route path="/campusAmbassador/" component={CampusIndex} />
              {/* <Route path="/participants/" component={ParticipantIndex} /> */}
              <Route path="/zonals" component={ZonalsIndex} />

              <Route path="/verifyCerti/" component={VerifyCerti} />
              <Route path="/policy" component={Policy} />
              <Route path="/terms" component={Terms} />
              <Route path="/main/" component={MainIndex} />

              {/* <Route component={Error404} /> */}
            </React.Fragment>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
