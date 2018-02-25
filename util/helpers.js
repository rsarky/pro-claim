exports.parseBody = body => {
  const regEx = /^@pro-claim claim$/
  return regEx.test(body)
}
