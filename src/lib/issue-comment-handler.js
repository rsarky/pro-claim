const { parseBody } = require('../util/helpers')

module.exports = issueCommentHandler

async function issueCommentHandler (context) {
  const { github, payload, log } = context
  const user = payload.comment.user.login
  const body = payload.comment.body
  const assignees = payload.issue.assignee
  const hasClaim = parseBody(body) // more appropriate variable name.

  if (hasClaim) {
    let isCollaborator = true
    try {
      await github.repos.checkCollaborator(context.repo({ username: user }))
    } catch (e) {
      if (e.code === 404) isCollaborator = false  // Will throw if status code is 404
    }

    if (assignees === null) {
      if (!isCollaborator) {
        await github.repos.addCollaborator(context.repo({ username: user, permission: 'pull' }))
        isCollaborator = true
        let commentBody = 'It looks this is your first contribution. We have sent you an invite to become a collaborator!' // TODO: Add a template with a better message.
        await github.issues.createComment(context.issue({body: commentBody}))
      }
      // assign user to issue.
      context.log(`Assigning ${user} to issue.`)
      await github.issues.addAssigneesToIssue(context.issue({ assignees: [user] }))
    } else {
      // Issue has already been assigned.
      let commentBody = `Issue has already been assigned to @${assignees.login} Search for a different issue. :)` // TODO: Add a template with a better message.
      await github.issues.createComment(context.issue({body: commentBody}))
    }
  }
}
