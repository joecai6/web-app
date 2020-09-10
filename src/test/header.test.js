import React from 'react';
import {shallow, mount} from 'enzyme';
import Header from '../components/header';
import {Navbar, Nav} from 'react-bootstrap';
import logoImg from '../css/imgs/logoplacer.jpeg';

describe('HeaderComponent', () => {
  it('component renders successfully without crash', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toExist();
  });

  it('logo wrapper renders successfully', () => {
    const wrapper = shallow(<Header/>);
    const child = wrapper.find("Navbar");
    expect(child).toExist();
  });

  it('component renders with proper links', () => {
    const header1 = <Nav.Link href="/">Home</Nav.Link>;
    const header2 = <Nav.Link href="/planner">Planner</Nav.Link>;
    const component = shallow(<Header />);
    expect(component).toContainReact(header1, header2);
  });

  it('logo img renders', () => {
    const wrapper = shallow(<Header/>);
    const child = wrapper.find("img");
    expect(child).toExist();
  })

  it('logo img renders as src', () => {
    const wrapper = shallow(<Header/>);
    const child = wrapper.find("img");
    expect(child.prop("src")).toEqual(logoImg);
  })
})