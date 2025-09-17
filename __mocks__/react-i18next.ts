module.exports = {
  useTranslation: () => {
    return {
      t: (key: string) => key,
    };
  },
};
