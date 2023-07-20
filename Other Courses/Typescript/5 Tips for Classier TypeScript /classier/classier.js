var _Counter_value;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.findById = function (id) {
        return this.db.byId("user", id);
    };
    return UserModel;
}());
;
function handleReq(users) {
    users.findById(1);
}
;
// in source
handleReq(new UserModel());
// in tests
var testUsers = [{ id: 1, name: "test" }];
handleReq({
    findById: function (id) {
        return testUsers[id];
    }
});
// -----------
var Counter = /** @class */ (function () {
    function Counter() {
        _Counter_value.set(this, 0);
    }
    return Counter;
}());
_Counter_value = new WeakMap();
var c = new Counter();
