import OrteAPI from "../lib/api/orte"

export default function testPage() {

}
export async function getStaticProps() {
    const orte = await OrteAPI.findAll()
    return {
        props: { orte }, revalidate: 10
    }
}