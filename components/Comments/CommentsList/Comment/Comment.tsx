import { Comment } from '../../../../infrastructure/models/Comment';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../../components/Themed';

interface ComponentProps {
  comment: Comment
}

const CommentComponent = ({ comment }: ComponentProps) => {
  return (
    <View style={styles.box}>
      <View style={styles.metaBox}>
        <Text style={styles.user}>{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
        <Text style={styles.date}>{new Date(comment.createdAt).toLocaleString()}</Text>
      </View>
      <Text>
        {comment.content}
      </Text>
    </View>
  );
};
export default memo(CommentComponent);

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    marginBottom: 15,
    flexDirection: 'column'
  },
  metaBox: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center'
  },
  user: {
    fontWeight: 'bold',
    marginRight: 10
  },
  date: {
    color: '#606060',
    fontSize: 10
  }
});
