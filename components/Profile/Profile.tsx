import { View } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../components/Auth/domain/selectors";
import { readImage } from "../../utils/readImage";
import Loader from "../../components/Loader";

const Profile = () => {
  const [userAvatar, setUserAvatar] = useState<ArrayBuffer>();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (user?.avatar) {
      readImage(user?.avatar, setUserAvatar);
    }
  }, [user?.avatar]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {userAvatar ? (
        <View style={styles.container}>
          <View style={styles.imageBox}>
            <Image
              source={{ uri: userAvatar as unknown as string }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
              resizeMode="cover"
            />
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  imageBox: {
    borderRadius: 50,
  },
});
