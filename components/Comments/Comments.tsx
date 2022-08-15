import React from 'react';
import CommentsList from './CommentsList/CommentsList';
import Form from './Form/Form';

const Comments = (): JSX.Element => {
  return <CommentsList footer={<Form />} />;
};

export default Comments;
