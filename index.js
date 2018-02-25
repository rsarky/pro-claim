const issueCommentHandler = require('./lib/issueCommentHandler')

module.exports = (robot) => {
  robot.on('issue_comment', issueCommentHandler)
}
