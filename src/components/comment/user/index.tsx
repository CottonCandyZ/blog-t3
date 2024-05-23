import { cookies } from 'next/headers'
import NewCommentForm from '~/components/comment/new-comment-form'
import AuthRegForm from '~/components/comment/user/auth/auth-reg-form'
import UserInfo from '~/components/comment/user/user-info'
import { fetchAaguid, fetchLoggedUserInfo, fetchUserDevice } from '~/server/fetch/user'

const User: React.FC<{ slug: string }> = async ({ slug }) => {
  const sessionId = cookies().get('session-id')?.value
  let user = null
  let deviceInfoPromise = null
  if (sessionId) {
    user = (await fetchLoggedUserInfo(sessionId)).data
    if (user)
      deviceInfoPromise = fetchUserDevice(user.id)
  }
  const aaguidPromise = fetchAaguid()

  return (
    <>
      <div>
        {user && deviceInfoPromise
          ? <UserInfo user={user} deviceInfoPromise={deviceInfoPromise} aaguidPromise={aaguidPromise} />
          : <AuthRegForm />}
      </div>
      <div className="mt-5">
        {user ? <NewCommentForm slug={slug} /> : null}
      </div>
    </>
  )
}

export default User
