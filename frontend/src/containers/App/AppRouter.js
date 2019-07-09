import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
    {
        path: '',
        component: asyncComponent(() => import('../Widgets/index.js')),
    },
    {
        path: 'calendar',
        component: asyncComponent(() => import('../Calendar/Calendar')),
    },
    {
        path: 'notes',
        component: asyncComponent(() => import('../Notes')),
    },
    {
        path: 'notifications',
        component: asyncComponent(() => import('../Todo')),
    },

    {
        path: 'contacts',
        component: asyncComponent(() => import('../Contacts')),
    },
    {
        path: 'car/list',
        component: asyncComponent(() => import("../Car/index"))
    },
    {
        path: 'car/add',
        component: asyncComponent(() => import("../Car/add"))
    },
    {
        path: 'settings',
        component: asyncComponent(() => import('../Settings/index'))
    },
    {
        path: 'images',
        component: asyncComponent(() => import('../Images/indexnew'))
    },
    {
        path:'features/desc',
        component:asyncComponent(()=>import("../Feature/description"))
    },
    {
        path:'prereg',
        component:asyncComponent(()=>import("../PreReg/index"))
    }
    ,
    {
        path:'profile',
        component:asyncComponent(()=>import("../Page/profile"))
    },
    {
        path:'payment/:id',
        component:asyncComponent(()=>import("../Payment/index"))
    }
];

class AppRouter extends Component {
    render() {
        const {url, style} = this.props;
        return (
            <div style={style}>
                {routes.map(singleRoute => {
                    const {path, exact, ...otherProps} = singleRoute;
                    return (
                        <Route
                            exact={exact !== false}
                            key={singleRoute.path}
                            path={`${url}/${singleRoute.path}`}
                            {...otherProps}
                        />
                    );
                })}
            </div>
        );
    }
}

export default AppRouter;
