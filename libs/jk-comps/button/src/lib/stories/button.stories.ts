import { Meta, Story } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'Button',
  component: ButtonComponent,
} as Meta<ButtonComponent>;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  template: `<jk-button [isActive]="isActive">{{text}}</jk-button>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary',
  isActive: true,
};
