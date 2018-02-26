const issueCommentHandler = require('./src/lib/issue-comment-handler')

module.exports = (robot) => {
  robot.on('issue_comment', issueCommentHandler)
}
