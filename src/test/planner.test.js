import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from '../components/home';
import Header from '../components/header';
import ProfileModal from '../components/profile';
import Planner from '../components/planner'

describe("ProfileModalComponent", ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Planner/>)
  })

  it("modal renders sucessfully", ()=>{
    expect(wrapper.exists()).toBe(true);
  })
})