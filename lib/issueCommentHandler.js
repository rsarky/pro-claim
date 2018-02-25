const parseBody = require('../util/parseBody')

module.exports = issueCommentHandler

async function issueCommentHandler (context) {
  const {github, payload, log} = context
  const user = payload.issue.user.login
  const body = payload.comment.body
  context.log(body)
  const isClaimed = parseBody(body)

  if (isClaimed) {
    // assign user to issue.
    await github.issues.addAssigneesToIssue(context.issue({assignees: [user]}))
  }
}
