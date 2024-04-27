export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-screen-lg" style={{ marginTop: "-7rem" }}>
      <br className="md:invisible"/>
      <br className="md:invisible"/>
      <h1 className="font-semibold text-2xl md:text-5xl text-center mb-8 bg-green-500 p-2">Empower Your IT Hiring</h1>
      <h1 className="font-semibold text-xl md:text-4xl text-center mb-8 lg:text-5xl"> Transparent Reference Management for Better Talent Acquisition</h1>
      <div className="space-y-4">
        <button className="btn mr-3 w-24 md:btn-lg md:w-32 md:mr-6" >Log in</button>
        <button className="btn btn-neutral w-24 md:btn-lg md:w-32" >Sign up</button>
      </div>
    </div>
  )
}
