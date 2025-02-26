const EmployeeBaseController = require("@base/human-resource/employee-base-controller");

class EmployeeV2_0Controller extends EmployeeBaseController {
  constructor() {
    super();
  }

  async select(req, res) {
    const extraFilters = { archived: false };
    return super.select(req, res, extraFilters);
  }
}

module.exports = new EmployeeV2_0Controller();
