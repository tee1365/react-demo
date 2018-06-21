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

export const TodoModel = {
  create(options, success, fail) {
    let Todo = AV.Object.extend("Todo");
    let todo = new Todo();
    todo.set("status", options.status);
    todo.set("deleted", options.deleted);
    todo.set("title", options.title);
    let acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);
    todo.setACL(acl);

    todo.save().then(
      response => {
        success && success.call(null, response.id);
      },
      error => {
        fail && fail.call(null, error);
      }
    );
  },

  getByUser(user, success, fail) {
    let query = new AV.Query("Todo");
    query.equalTo("deleted", false);
    query.find().then(
      response => {
        let array = response.map(t => {
          return {id: t.id, ...t.attributes};
        });
        success && success.call(null, array);
      },
      error => {
        fail && fail.call(null, error);
      }
    );
  },

  update(options, success, fail) {
    let todo = AV.Object.createWithoutData("Todo", options.id);
    options.title !== undefined && todo.set("title", options.title);
    options.status !== undefined && todo.set("status", options.status);
    options.deleted !== undefined && todo.set("deleted", options.deleted);

    todo.save().then(
      response => {
        success && success.call(null);
      },
      error => {
        fail && fail.call(null, error);
      }
    );
  },

  destroy(todoID, success, fail) {
    TodoModel.update({id: todoID, deleted: true}, success, fail);
  }
};
