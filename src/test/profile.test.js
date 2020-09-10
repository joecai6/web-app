import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from '../components/home';
import Header from '../components/header';
import ProfileModal from '../components/profile';

describe("ProfileModalComponent", ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<ProfileModal/>)
  })

  it("modal renders sucessfully", ()=>{
    expect(wrapper.exists()).toBe(true);
  })
})
