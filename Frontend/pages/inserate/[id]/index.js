import InserateAPI from "../../../lib/api/inserate";

export default function inseratDetail () {

}

export async function getStaticProps(context) {
    const user = await InserateAPI.findById(context.params.id)
    return {
        props: {user}, revalidate: 10
    }
}

export async function getStaticPaths() {
    const users = await InserateAPI.findAll();
    //Klammern wegen implizitem return
    const paths = users.map((user) => (
        {
            params: {id: user.id.toString()}
        })
    )
    return {paths, fallback: true}
}