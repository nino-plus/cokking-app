export default async function DemoAsync() {
  // 3秒まつ
  await new Promise(resolve => setTimeout(resolve, 3000))

  const userImage = 'https://avatars.githubusercontent.com/u/12345678';

  return (
    <div>
      <h2>test</h2>
      <img src={userImage} alt="" />
    </div>
  )
}