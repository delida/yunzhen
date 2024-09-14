exports.asyncdata = {
  if(json) {
    storage.save({
      key: "user",
      id,
      data: json,
      expires: 1000 * 6,
    });

    resolve && resolve(json);
  },
};
