import React, { useCallback, useEffect, useRef } from 'react';
import { useComments } from '../hooks/useComments';
import { Text, View } from '../../../components/Themed';
import { FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CategoryStackRoutesProps } from 'infrastructure/router/interfaces';
import { CategoryStackRoutes } from 'infrastructure/router/enums';
import Comment from './Comment/Comment';
import { getInifiteScrollCallback } from '../../../helpers/getInfiniteScrollCallback';
import { addNewComment, clearCommentsList } from '../domain/actions';
import { useDispatch } from 'react-redux';
import { socket } from '../../../services/sockets';
import { Comment as CommentModel } from '../../../infrastructure/models/Comment';

interface ComponentProps {
  footer: JSX.Element
}

const CommentsList = ({ footer }: ComponentProps): JSX.Element => {
  const { params } =
    useRoute<CategoryStackRoutesProps<CategoryStackRoutes.CategoryPost>>();
  const { isLoading, list, loadComments, updatePaging, paging } = useComments(
    params.categoryEntityId
  );
  const controller = useRef<AbortController>();
  const dispatch = useDispatch();

  useEffect(() => {
    controller.current = new AbortController();
    if (controller.current !== null) {
      loadComments(controller.current);
    }

    return () => {
      controller.current?.abort();
      dispatch(clearCommentsList());
    };
  }, []);

  useEffect(() => {
    socket.on(
      `${params.categoryEntityId}-comment-added`,
      (data: CommentModel) => dispatch(addNewComment(data))
    );

    return () => {
      socket.off(`${params.categoryEntityId}-comment-added`);
    };
  }, [params.categoryEntityId]);

  const onReachEndedCallback = useCallback(() => {
    getInifiteScrollCallback(
      () =>
        controller.current !== undefined && updatePaging(controller.current),
      paging
    );
  }, [paging]);

  return (
    <View style={styles.listStyle}>
      <FlatList
        style={styles.listStyle}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={(comment) => <Comment comment={comment.item} />}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>There are no comments yet</Text>
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          display: 'flex',
          padding: 20
        }}
        refreshing={isLoading}
        onEndReached={onReachEndedCallback}
        onEndReachedThreshold={0.1}
      />
      {footer}
    </View>
  );
};

export default CommentsList;

const styles = StyleSheet.create({
  listStyle: {
    shadowColor: '#000',
    elevation: 2,
    margin: 7,
    height: '60%'
  },
  emptyList: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10
  }
});
