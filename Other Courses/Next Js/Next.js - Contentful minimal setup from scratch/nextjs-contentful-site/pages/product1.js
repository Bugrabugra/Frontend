import * as contentful from "contentful";


const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export default function ProductPage(props) {
  return (
    <div>
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
    </div>
  )
}

export async function getStaticProps() {
  // get data from headless CMS
  const product = await client.getEntry("6ZWkhTgnKTEnf5n1I3HDcX");

  return {
    props: {
      ...product.fields
    }
  }
}
