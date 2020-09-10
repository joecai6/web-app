import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from '../components/home';
import Header from '../components/header';
import ProfileModal from '../components/profile';


describe('HomeComponent', ()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home.WrappedComponent/>);
  });

  it('renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render header', () => {
    const child = wrapper.find(Header);
    expect(child.exists()).toBe(true);
  })

  it('ensure that the welcome message is correct data', () => {
    wrapper.setState({data: {firstname: "Bob"}});
    const text = wrapper.find('#welcome-text').childAt(0);
    expect(text.text()).toEqual("Hi, Bob!");
  })

  it('ensure that the school is correct data', () => {
    wrapper.setState({data: {school: "DMHS"}});
    const text = wrapper.find('#school-text').childAt(0);
    expect(text.text()).toEqual("School: DMHS");
  })

  it('should render profile modal', () => {
    const child = wrapper.find(ProfileModal);
    expect(child).toHaveLength(1);
  })

  it('update button should display modal', ()=> {
    const button = wrapper.find('#update-button');
    button.simulate('click');
    expect(wrapper.find(ProfileModal).prop('show')).toEqual(true);
  })

})