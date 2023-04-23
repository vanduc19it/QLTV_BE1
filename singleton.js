class RoleData {
  constructor() {
    this.data = null;
  }

  setData(data) {
    this.data = data;
  }
}

module.exports = {
  roleData: new RoleData(),
};
