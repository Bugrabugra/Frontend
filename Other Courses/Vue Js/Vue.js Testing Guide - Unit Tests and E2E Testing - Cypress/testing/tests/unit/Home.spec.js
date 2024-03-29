import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders h1 tag', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find("h1").text()).equal("Random Dog Images");
  });

  it('button has correct text rendered ', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find("#myCounter").text()).equal("Increment Dog Count");
  });
});
