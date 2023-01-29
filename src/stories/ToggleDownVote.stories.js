/* eslint-disable react/react-in-jsx-scope */
import ToggleDownVote from "../components/ToggleDownVote";

const stories = {
  title: "ToggleDownVote",
  component: ToggleDownVote,
};

export default stories;

const TemplateStory = (args) => <ToggleDownVote {...args} />;

const withoutUserVote = TemplateStory.bind({});

withoutUserVote.args = {
  downVoteHandler: () => {},
  isThreadDownVote: false,
  downVotesBy: ["users-1", "users-2", "users-3"],
};

const withUserVote = TemplateStory.bind({});

withUserVote.args = {
  downVoteHandler: () => {},
  isThreadDownVote: true,
  downVotesBy: ["users-1", "users-2", "users-3"],
};

export { withoutUserVote, withUserVote };
