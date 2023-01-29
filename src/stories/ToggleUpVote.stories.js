/* eslint-disable react/react-in-jsx-scope */

import ToggleUpVote from "../components/ToggleUpVote";

const stories = {
  title: "ToggleUpVote",
  component: ToggleUpVote,
};

export default stories;

const TemplateStory = (args) => <ToggleUpVote {...args} />;

const withoutUserVote = TemplateStory.bind({});

withoutUserVote.args = {
  upVoteHandler: () => {},
  isThreadUpVote: false,
  upVotesBy: ["users-1", "users-2", "users-3"],
};

const withUserVote = TemplateStory.bind({});

withUserVote.args = {
  upVoteHandler: () => {},
  isThreadUpVote: true,
  upVotesBy: ["users-1", "users-2", "users-3"],
};

export { withoutUserVote, withUserVote };
