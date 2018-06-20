import AV from "leancloud-storage";

const APP_ID = "Re4sQVgxeVXjpncpjOKP5zOJ-MdYXbMMI";
const APP_KEY = "gh5YtiFwcngShs7u2xjxv0gT";
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export function signUp(username, password, successFn, errorFn) {
  let user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.signUp().then(
    function(loginedUser) {
      let user = getUserFromAVUser(loginedUser);
      successFn.call(null, user);
    },
    function(error) {
      errorFn.call(null, error);
    }
  );
  return undefined;
}

let getUserFromAVUser = AVUser => {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  };
};

export function getCurrentUser() {
  let user = AV.User.current();
  if (user) {
    return getUserFromAVUser(user);
  } else {
    return null;
  }
}

export function signOut() {
  AV.User.logOut();
  return undefined;
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(
    function(loginedUser) {
      let user = getUserFromAVUser(loginedUser);
      successFn.call(null, user);
    },
    function(error) {
      errorFn.call(null, error);
    }
  );
}
