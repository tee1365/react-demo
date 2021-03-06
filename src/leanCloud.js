import AV from "leancloud-storage";

const APP_ID = "Re4sQVgxeVXjpncpjOKP5zOJ-MdYXbMMI";
const APP_KEY = "gh5YtiFwcngShs7u2xjxv0gT";
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export function signUp(username, password, email, success, fail) {
  let user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(email);
  user.signUp().then(
    loginedUser => {
      let user = getUserFromAVUser(loginedUser);
      success.call(null, user);
    },
    error => {
      fail.call(null, error);
    }
  );
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

export function logOut() {
  AV.User.logOut();
  return undefined;
}

export function logIn(username, password, success, fail) {
  AV.User.logIn(username, password).then(
    loginedUser => {
      let user = getUserFromAVUser(loginedUser);
      success.call(null, user);
    },
    error => {
      fail.call(null, error);
    }
  );
}

export function resetPassword(email, success, fail) {
  AV.User.requestPasswordReset(email).then(
    success => {
      success.call(null);
    },
    error => {
      fail.call(null, error);
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
    todo.set("date", options.date);
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

  delete(todoID, success, fail) {
    TodoModel.update({id: todoID, deleted: true}, success, fail);
  },

  undoDelete(todoID, success, fail) {
    TodoModel.update({id: todoID, deleted: false}, success, fail);
  }
};
