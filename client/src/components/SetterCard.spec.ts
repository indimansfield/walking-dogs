import { mount } from '@vue/test-utils';
import SetterCard from './SetterCard.vue';

describe('SetterCard', () => {
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
