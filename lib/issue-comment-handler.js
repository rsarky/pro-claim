const { parseBody } = require('../util/helpers')

module.exports = issueCommentHandler

async function issueCommentHandler (context) {
  const { github, payload, log } = context
  const user = payload.comment.user.login
  const body = payload.comment.body
  context.log(body)
  const hasClaim = parseBody(body) // more appropriate variable name.

  if (hasClaim) {
    let isCollaborator = true
    try {
      await github.repos.checkCollaborator(context.repo({ username: user }))
    } catch (e) {
      if (e.code === 404) isCollaborator = false  // Will throw if status code is 404
    }

    if (!isCollaborator) {
      await github.repos.addCollaborator(context.repo({ username: user, permission: 'pull' }))
      isCollaborator = true
    }

    // assign user to issue.
    context.log(`Assigning ${user} to issue.`)
    await github.issues.addAssigneesToIssue(context.issue({ assignees: [user] }))
  }
}
