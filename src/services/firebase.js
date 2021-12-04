import { firebase, database, storage } from '../lib/firebase';

export function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

export async function getUserByUsername(username) {
  let result;
  await database.ref('Users').orderByChild("username").equalTo(username).once("value", snapshot => {
    if (snapshot.exists()) {
      result = snapshotToArray(snapshot)[0];
    }
  });

  return result;
}

export async function arrayOfGroup() {
  const snapshot = await database
    .ref('Group')
    .once('value');

  const result = snapshot.val();

  return result;
}

export async function getUserAvatarByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));
  return photos;
}


export async function getUserByUserId(userId) {
  let result;
  await database.ref('Users').orderByChild("user_id").equalTo(userId).once("value", snapshot => {
    if (snapshot.exists()) {
      result = snapshotToArray(snapshot)[0];
    }
  });

  return result;
}

export async function getPhotoByPhotoId(photoId) {
  const result = await firebase.firestore().collection('photos').where('photoId', '==', photoId).get();
  const photo = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return photo;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? database.arrayRemove(profileId)
        : database.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? database.arrayRemove(loggedInUserDocId)
        : database.arrayUnion(loggedInUserDocId)
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username, avatarImageSrc } = user[0];
      // alert(avatarImageSrc);
      return { username, avatarImageSrc, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getPosts(type, param2, user) {
  const snapshot = await database
    .ref('Posts')
    .once("value");

  var result = snapshotToArray(snapshot);
  switch (type) {
    case "post-details":
      result = await Promise.all (result.filter((item) => {
        return item.key == param2;
      }));
      break;
    case "post":
    case "save":
    default:
      result = await Promise.all (result.filter((item) => {
        return (user?.group == item.group)
      }));
      break;
  }

  // console.log(result);
  return result;
}

export async function updateUserProfile(
  docId,
  newFullName
) {
  firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      fullName: newFullName
    })
    .then(function () {
      window.location.reload();
      console.log('User update with ID', docId);
    })
    .catch(function (error) {
      console.error("Error updating user", error);
    });

}
export async function updatePost(
  docId,
  newCaption
) {
  firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      caption: newCaption
    })
    .then(function () {
      window.location.reload();
      console.log('Photo update with ID', docId);
    })
    .catch(function (error) {
      console.error("Error updating photo", error);
    });

}

export async function deletePost(
  docId
) {
  firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .delete()
    .then(function () {
      window.location.reload();
      console.log('Photo delete with ID', docId);
    })
    .catch(function (error) {
      console.error("Error deleting photo", error);
    });

}

export async function updateAvatar(
  avatar, docId
) {
  console.log('avatar func', avatar);
  // let urlName = Date.now() + avatar?.name;
  // let newUrlAvatar = '';

  const uploadTask = storage
    .ref(`/avatars/${avatar?.name}`).put(avatar);

  uploadTask.on(
    "state_changed",
    snapShot => { },
    error => {
      console.error("Error updating user", error);
    },
    () => {
      storage
        .ref()
        .child(`/avatars/${avatar?.name}`)
        .getDownloadURL()
        .then(url => {
          console.log('url', url);
          // newUrlAvatar = url;
          // console.log('newUrlAvatar', newUrlAvatar);

          firebase
            .firestore()
            .collection('users')
            .doc(docId)
            .update({
              avatarImageSrc: url
            })
            .then(function () {
              //window.location.reload()
              console.log('User update avatar with ID', docId);
            })
            .catch(function (error) {
              console.error("Error updating user", error);
            });

        });
    }
  );
};
