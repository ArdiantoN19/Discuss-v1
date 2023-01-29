/* eslint-disable react/react-in-jsx-scope */
import CategoryButton from "../components/CategoryButton";

const stories = {
  title: "CategoryButton",
  component: CategoryButton,
};

export default stories;

const TemplateStory = (args) => <CategoryButton {...args} />;

const defaultCategory = TemplateStory.bind({});

defaultCategory.args = {
  threadCategory: "react",
  category: "",
  handleOnClickCategory: () => {},
};

const categoryActive = TemplateStory.bind({});

categoryActive.args = {
  threadCategory: "react",
  category: "react",
  handleOnClickCategory: () => {},
};

export { defaultCategory, categoryActive };
