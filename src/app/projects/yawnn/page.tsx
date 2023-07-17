import NavBar from '../../../components/navbar'
import Blog from '../../../components/blog'

export default function YawNN() {
  return (
    <>
      <NavBar showName={true} />
      <Blog 
        title="Yawning Detection"
        image={{
          src: "/assets/index/logo-yawnn.svg",
          alt: ""
        }}
        colour="lightgreen"
        text={
            <>
                <p>todo</p>
            </>
        }
        />
    </>
  )
}