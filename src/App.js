import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from "./components/common/Loader";

// Beta route not being used currently
// const BetaIndex = Loadable({
//   loader: () => import('./components/beta/Index'),
//   loading: () => <div>Loading BetaIndex</div>,
// });

const FakeNotification = Loadable({
    loader: () => import("./components/common/Notification"),
    loading: () => <Loader />,
});

const CAIndex = Loadable({
    loader: () => import("./components/ca/Index"),
    loading: () => <Loader />,
});

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
    loader: () => import("./components/onlineEvents/quizardry/index"),
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

const MainHomeIndex = Loadable({
    loader: () => import("./components/home/Index"),
    loading: () => <Loader />
});

const VerifyCerti = Loadable({
    loader: () => import("./components/verifyCerti/Index"),
    loading: () => <Loader />
});

const Policy = Loadable({
    loader: () => import("./components/common/Policy"),
    loading: () => <Loader />
});

const Terms = Loadable({
    loader: () => import("./components/common/Terms"),
    loading: () => <Loader />
});
// const Error404 = Loadable({
//     loader: () => import("./components/common/Errorpage"),
//     loading: () => <Loader />
// });
const CampusIndex = Loadable({
    loader: () => import("./components/campusAmbassador/Index"),
    loading: () => <Loader />,
});
const ZonalsIndex = Loadable({
    loader: () => import("./components/zonal/Index"),
    loading: () => <Loader />
});
const MainIndex = Loadable({
    loader: () => import("./components/main/Index"),
    loading: () => <Loader />
});
const Events = Loadable({
    loader: () => import("./components/events/Index"),
    loading: () => <Loader />
});

const CampusClicks = Loadable({
    loader: () => import("./components/onlineEvents/campusClicks/Index"),
    loading: () => <Loader />
});
const Meme = Loadable({
    loader: () => import("./components/onlineEvents/meme/Index"),
    loading: () => <Loader />
});
const MrMissThomso = Loadable({
    loader: () => import("./components/onlineEvents/mrmissthomso/Index"),
    loading: () => <Loader />
});
const Silhoutte = Loadable({
    loader: () => import("./components/onlineEvents/silhoutte/Index"),
    loading: () => <Loader />
});
const Cupid = Loadable({
    loader: () => import("./components/onlineEvents/cupid/Index"),
    loading: () => <Loader />
});
// const Xpression = Loadable({
//     loader: () => import("./components/onlineEvents/xpression/Index"),
//     loading: () => <Loader />
// });
const WhyThomso = Loadable({
    loader: () => import("./components/whyThomso/Index"),
    loading: () => <Loader />
});
const blog = Loadable({
    loader: () => import("./components/beta/blog/index"),
    loading: () => <Loader />
});
// const WhyThomso = Loadable({
//     loader: () => import("./components/whyThomso/Index"),
//     loading: () => <Loader />
// });
const onlineevents = Loadable({
    loader: () => import("./components/onlineEvents/Index"),
    loading: () => <Loader />
})
// const ControlsIndex = Loadable({
//     loader: () => import("./components/controls/Index.jsx"),
//     loading: () => <Loader />
// })

const MUNIndex = Loadable({
    loader: () => import("./components/beta/mun/Index"),
    loading: () => <Loader />
})

// const Carousel = Loadable({
//     loader: () => import("./components/carousel/Index"),
//     loading: () => <Loader />
// })

// const CoordinatorsIndex = Loadable({
//     loader: () => import("./components/coordinators/Index.jsx"),
//     loading: () => <Loader />
// })

class App extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    componentWillMount() {
        console.log(window.screen)
        if (window.screen) {
            // window.screen.lockOrientation("portrait");
        }
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route path="/" component={FakeNotification} />
                    <Switch>
                        <React.Fragment>
                            {/* <Route path="/beta" component={BetaIndex} /> */}
                            <Route exact path="/" component={HomeIndex} />
                            <Route exact path="/final" component={MainHomeIndex} />
                            <Route exact path="/sponsors" component={SponsorsIndex} />
                            <Route exact path="/associate" component={AccociateIndex} />
                            <Route exact path="/quizardry" component={QuizardryIndex} />
                            <Route exact path="/comingSoon" component={TeamIndex} />
                            <Route exact path="/faq" component={FAQIndex} />
                            <Route path="/ca/" component={CAIndex} />
                            <Route path="/campusAmbassador/" component={CampusIndex} />
                            <Route path="/zonals" component={ZonalsIndex} />
                            <Route path="/blog" component={blog} />
                            <Route path="/whythomso" component={WhyThomso} />
                            <Route path="/onlineevents" component={onlineevents} />
                            <Route path="/verifyCerti/" component={VerifyCerti} />
                            <Route path="/policy" component={Policy} />
                            <Route path="/terms" component={Terms} />
                            <Route path="/main/" component={MainIndex} />
                            <Route path="/register" render={() => (<Redirect to="/main/" />)} />
                            <Route path="/events" component={Events} />
                            <Route path="/meme" component={Meme} />
                            <Route path="/MrMissThomso" component={MrMissThomso} />
                            {/* <Route path="/c" component={Carousel} /> */}
                            <Route path="/campusclicks" component={CampusClicks} />
                            <Route path="/silhoutte" component={Silhoutte} />
                            {/* <Route  path="/coordinators" component={CoordinatorsIndex} /> */}
                            {/* <Route  path="/controls" component={ControlsIndex} /> */}
                            <Route path="/cupid" component={Cupid} />
                            <Route path="/mun" component={MUNIndex} />
                            {/* <Route path="/xpression" component={Xpression} /> */}
                            {/* <Route component={Error404} /> */}
                        </React.Fragment>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App
