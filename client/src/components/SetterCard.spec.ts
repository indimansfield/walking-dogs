import { mount, createLocalVue } from '@vue/test-utils';
import SetterCard from './SetterCard.vue';

import Vuex from 'vuex';
import store from '@/store/index';

const localVue = createLocalVue();

localVue.use(Vuex);



describe('SetterCard', () => {
  let actions;
  let store;
  it('should have correct props', () => {
    const wrapper = mount(SetterCard, {
      propsData: {
        title: 'Speed',
        units: 'm/s',
        value: 0,
        type: 'speed',
      }
    });
    expect(wrapper.text()).toContain('Speed');
  });
});
