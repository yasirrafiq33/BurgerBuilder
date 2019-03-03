import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/Navigationitem';


describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavItem /> if not authenticated.',() => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render two <NavItem /> if authenticated.',() => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render exact logout <NavItem /> if authenticated.',() => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});