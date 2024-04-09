export default function InseratDetail ({inserat, auftraggeber}){
    return (
        <>
        <p>{JSON.stringify(inserat)}</p>
        <p>{JSON.stringify(auftraggeber)}</p>
        </>
    )
}