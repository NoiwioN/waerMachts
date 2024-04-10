import {useGlobalContext} from "../store";
import {useEffect, useState} from "react";
import InserateAPI from "../lib/api/inserate";
import styles from "./Bewertung.module.css"
import Rating from "@mui/material/Rating";

export default function Bewertung() {
    const {session} = useGlobalContext();
    const [inserate, setInserate] = useState()
    const [dataReady, setDataReady] = useState(false)
    const [checkNeeded, setCheckNeeded] = useState(true)


    const handleSubmit = () => {
        setDataReady(true)
    }
    const handleChange = (e) => {
        const {name,value}=e.target;
        setInserate(prevState => ({
            ...prevState,
            [name]:value
        }))
    }
    useEffect(() => {
        if(!dataReady) return;
        const updateInserat = async () => {
            await InserateAPI.update(inserate,inserate.id_inserate,session.accessToken)
        }
        updateInserat()
        setDataReady(false)
        setCheckNeeded(true)
    }, [dataReady]);

    useEffect(() => {
        if (!session||!checkNeeded){
            return;
        }
        const getInserate = async () => {
            return await InserateAPI.findByAuftraggeberId(session.userLoginData.id_user)
        }
        const evaluateUnratedInserate = (ins) => {
            for (let i of ins) {
                let inserateIsFinishedBidirectionally = !!i.fertig_auftraggeber && !!i.fertig_auftragnehmer;
                let inseratHasNotBeenReviewed = !i.bewertungstext
                if (inserateIsFinishedBidirectionally && inseratHasNotBeenReviewed) {
                    console.log("Inserat gefunden")
                    setInserate(i)
                    setCheckNeeded(false)
                }
            }
        }
        const setValidInserate = async () => {
            const localInserate = await getInserate()
            evaluateUnratedInserate(localInserate)
        }
        setValidInserate();
    }, [session]);
    return inserate ? (
        <div className={styles.card}>
            <h1>Schreibe eine Bewertung</h1>
            <h2>{inserate.titel}</h2>
            <form>
                <div>
                    <p>Bewertung:</p>
                    <textarea
                        name="bewertungstext"
                        placeholder={`Schreibe einige Worte über ${inserate.auftragnehmer_id.username}`}
                        onChange={handleChange}
                    />
                </div>
                <Rating
                    name="bewertung"
                    value={inserate.bewertung?inserate.bewertung:0}
                    onChange={handleChange}
                />
                <br/>
                <button onClick={handleSubmit}>Abschicken</button>
            </form>
        </div>
    ) : null;
}