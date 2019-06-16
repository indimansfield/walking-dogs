import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SetterCard from './SetterCard.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('SetterCard', () => {
  let actions;
  let store;
  beforeEach(() => {
    actions = {
      
    }
  });
  it('should have correct props', () => {
    const wrapper = mount(SetterCard, {
      propsData: {
        title: 'Speed',
        units: 'm/s',
        value: 0,
        type: 'speed'
      }
    });
    expect(wrapper.text()).toContain('Speed');
  });
});
