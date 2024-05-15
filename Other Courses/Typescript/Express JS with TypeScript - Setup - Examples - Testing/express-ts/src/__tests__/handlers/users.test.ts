import { getUsers } from "../../handlers/users";
import { mockRequests, mockResponse } from "../../__mocks__";


describe("getUsers", () => {
  it("should return an array of users", () => {
    getUsers(mockRequests, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
