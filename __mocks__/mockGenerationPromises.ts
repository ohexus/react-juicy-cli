export const mockResolvedPromises = <T>(promises: unknown[], status: T): void => {
  promises.forEach((promise) => {
    (promise as jest.Mock).mockResolvedValueOnce(status);
  });
};

export const mockRejectedPromises = <T>(promises: unknown[], status: T): void => {
  promises.forEach((promise) => {
    (promise as jest.Mock).mockRejectedValueOnce(status);
  });
};
